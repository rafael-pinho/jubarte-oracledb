const Treaty = require('bluebird'),
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

function fetchProcedure(poolAlias){
    let self = this;

    return new Treaty(function(resolve, reject){
        self.command = `
            BEGIN 
                ${self.command}(
                    ${Object.getOwnPropertyNames(self.parameters).map(parameter => `:${parameter} `).toString()}
                ); 
            END;
        `;

        execute.call(self, poolAlias)
            .then(function(result){
                let promises = [];

                for(var i in result.outBinds)
                    if(result.outBinds[i].getRows)
                        promises.push(readRows(result.outBinds[i]));
                
                return promises;
            })
            .spread(function(...cursors){
                resolve(...cursors);
            })
            .catch(function(e){
                reject(e);
            });
    });


    function readRows(cursor){
        const fetchLength = 10;
        
        return new Treaty(function(resolve, reject){
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
                            if(err)
                                reject(err);
                            else
                                resolve(rows || []);
                        })
                        .catch((e) => {
                            reject(e);
                        });
                }
            });
        })
    }
}

function executeProcedure(poolAlias){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    return execute.call(this, poolAlias);
}

function execute(poolAlias){
    let self = this;

    if(self.connection)
        return self.connection.execute(self.command, self.parameters);
    
    return new Treaty(function(resolve, reject){
        connectionFactory.get(poolAlias)
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
