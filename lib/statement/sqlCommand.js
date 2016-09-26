const Promise = require('bluebird'),
      poolFactory = require('../connection/poolFactory.js'),
      connectionFactory = require('../connection/connectionFactory.js');

module.exports = {
    sql,
    fetchProcedure,
    executeProcedure,
    execute
}

function sql(command){
    this.command = command;
    return this;
}

function fetchProcedure(poolConfiguration){
    let self = this;

    return new Promise(function(resolve, reject){
        self.command = `
            BEGIN 
                ${self.command}(
                    ${Object.getOwnPropertyNames(self.parameters).map(x => `:${x} `).toString()}
                ); 
            END;
        `;

        execute.call(self, poolConfiguration)
            .then(function(result){
                return result.outBinds
                                .filter(x => x.metaData.length)
                                .map(x => readRows(x))
            })
            .spread(function(...cursors){
                resolve(cursors);
            })
            .catch(function(e){
                reject(e);
            });
    });


    function readRows(cursor){
        const fetchLength = 10;
        
        return new Promise(function(resolve, reject){
            cursor.getRows(fetchLength, (err, rows) => {
                if(rows.length == fetchLength){
                    readRows(cursor)
                        .then((data) => {
                            resolve(rows.concat(data));
                        })
                        .catch((e) => {
                            reject(e);
                        });
                }
                else{
                    cursor.close()
                        .then(() => {
                            if(err){
                                reject(err);
                            }
                            else{
                                resolve(rows || []);
                            }
                        })
                        .catch((e) => {
                            reject(e);
                        });
                }
            });
        })
    }
}

function executeProcedure(poolConfiguration){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    return execute.call(this, poolConfiguration);
}

function execute(poolConfiguration){
    let self = this;

    if(self.connection)
        return self.connection.execute(self.command, self.parameters);

    if(typeof(poolConfiguration) == 'object'){
        if(!poolConfiguration.user || !poolConfiguration.password || !poolConfiguration.connectString)
            throw `you need to pass 'user', 'password' and 'connectString'`;

        if(!poolConfiguration.poolAlias) 
            poolConfiguration.poolAlias = 'default';
    }
    else
        if(!poolConfiguration)
            poolConfiguration = 'default';

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