const Promise = require('promise'),
      connectionFactory = require('../connection/connectionFactory.js'),
      parameterBuilder = require('./parameterBuilder.js');

exports.create = (command) => {
    return {
        command,
        parameters: [], 
        addParameters: parameterBuilder,
        execute,
        executeProcedure,
        fetchProcedure
    }
}

function fetchProcedure(connectionConfiguration, callback){
    if(callback == null){
        [connectionConfiguration, callback] = [callback || {}, connectionConfiguration];
    }

    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    execute.call(this, connectionConfiguration, readCursors);
    
    function readCursors(err, result){
        let promises = [];

        for(var i in result.outBinds){
            let cursor = result.outBinds[i];
            if(cursor.metaData.length)
                promises.push(new Promise(function(reject, resolve){
                    readRows(null, cursor, (err, rows) => {
                        (err && reject(err)) || resolve(rows);
                    });
                }));
        }

        Promise.all(promises).then(
            (errors) => {
                callback(errors);
            },
            (result) => {
                callback(null, result);
            });
    }

    function readRows(err, cursor, callback){
        if(err)
            return callback(err);

        cursor.getRows(10, (err, rows) => {
            if (err){
                cursor.close();
                return callback(err);
            }
            
            if (rows.length == 0){
                cursor.close();
                return callback(null, []);
            }

            if(rows.length < 10){
                cursor.close();
                return callback(null, rows);
            }
            
            if(rows.length == 10){
                readRows(null, cursor, (err, data) => {
                    calllback(rows.concat(data));
                })
            }
        });
    }
}

function executeProcedure(...params){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    execute.call(this, ...params);
}

function execute(connectionConfiguration, callback){
    if(callback == null){
        [connectionConfiguration, callback] = [callback || {}, connectionConfiguration];
    }

    connectionFactory.get(connectionConfiguration, (err, connection) => {
        if(err)
            return callback(err);
        
        connection.execute(this.command, this.parameters, callback);
    });
}
