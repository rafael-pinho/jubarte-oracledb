const Promise = require('bluebird'),
      poolFactory = require('../connection/poolFactory.js'),
      connectionFactory = require('../connection/connectionFactory.js'),
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
        roolback
    }
}

function sql(command){
    this.command = command;
}

function fetchProcedure(connectionConfiguration){
    return new Promise((resolve, reject) => {
        this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
        execute.call(this, connectionConfiguration)
            .then(function(result){
                return result.outBinds
                    .filter(cursor => cursor.metaData.length)
                    .map(cursor => new Promise(function(resolve, reject){
                        readRows(null, cursor, (err, rows) => {
                            (err && reject(err)) || resolve(rows);
                        });
                    }));
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
                    calllback(rows.concat(data));
                });
            }
        });
    }
}

function executeProcedure(...params){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    return execute.call(this, ...params);
}

function execute(connectionConfiguration){
    let self = this;

    return new Promise((resolve, reject) => {
        poolFactory.get()
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

function commit(callback){
    if(!this.connection)
        return;

    this.connection.commit((err) => {
        callback(err);
    });
}

function roolback(callback){
    if(!this.connection)
        return;

    this.connection.roolback((err) => {
        callback(err);
    });
}
