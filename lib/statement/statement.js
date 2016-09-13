const Promise = require('bluebird'),
      poolFactory = require('../connection/poolFactory.js'),
      connectionFactory = require('../connection/connectionFactory.js'),
      poolManager = require('./poolManager.js'),
      parameterBuilder = require('./parameterBuilder.js');

exports.create = (command) => {
    return {
        command,
        sql,
        parameters: [], 
        addParameters: parameterBuilder,
        execute,
        executeProcedure,
        fetchProcedure,
        commit,
        roolback,
        done
    }
}

function sql(command){
    this.command = command;
    return this;
}

function fetchProcedure(poolConfiguration){
    let self = this;

    return new Promise(function(resolve, reject){
        self.command = `BEGIN ${self.command}(${Object.getOwnPropertyNames(self.parameters).map(x => `:${x} `).toString()}); END;`
        let promises = [];

        execute.call(self, poolConfiguration)
            .then(function(result){
                for(var i in result.outBinds)
                    if(result.outBinds[i].metaData.length)
                        promises.push(new Promise(function(resolve, reject){
                            readRows(null, result.outBinds[i], (err, rows) => {
                                (err && reject(err)) || resolve(rows);
                            });
                        }));
                        
                return promises;
            })
            .spread(function(...cursors){
                resolve(cursors);
            })
            .catch(function(e){
                reject(e);
            });
    });

    function readRows(err, cursor, callback){
        const fetchLength = 10;
        
        (err) && callback(err);

        cursor.getRows(fetchLength, (err, rows) => {
            if (err){
                cursor.close();
                return callback(err);
            }
            
            if (rows.length < fetchLength){
                cursor.close();
                return callback(null, rows || []);
            }

            if(rows.length == fetchLength){
                readRows(null, cursor, (err, data) => {
                    callback(null, rows.concat(data));
                });
            }
        });
    }
}

function executeProcedure(poolConfiguration){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    return execute.call(this, poolConfiguration);
}

function execute(poolConfiguration){
    let self = this;
    poolConfiguration = poolManager.createConfiguration(poolConfiguration || {});

    if(self.connection){
        return new Promise(function(resolve, reject){
            self.connection.execute(self.command, self.parameters)
                .then(function(results){
                    resolve(results);
                })
                .catch(function(e){
                    reject(e);
                });
        });
    }

    return new Promise(function(resolve, reject){
        poolFactory.get(poolConfiguration)
            .then(function(pool){
                return connectionFactory.get(pool);
            })
            .then(function(connection){
                self.connection = connection;
                return connection.execute(self.command, self.parameters);
            })
            .then(function(results){
                resolve(results);
            })
            .catch(function(e){
                reject(e);
            });
    });
}

function commit(){
    if(this.connection)
        return this.connection.commit();
}

function roolback(){
    if(this.connection)
        return this.connection.roolback();
}

function done(callback){
    if(this.connection)
        return this.connection.close();
}
