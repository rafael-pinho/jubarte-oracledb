const Promise = require('promise'),
      connectionFactory = require('../connection/connectionFactory.js'),
      parameterBuilder = require('./parameterBuilder.js');

exports.create = (command) => {
    return {
        command,
        parameters: [], 
        addParameters: parameterBuilder,
        execute,
        executeStoredProcedure
    }
}

function fetchProcedure([connectionConfiguration, callback = {}]){
    if(callback == null){
        [connectionConfiguration, callback] = [callback, connectionConfiguration];
    }

    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    execute.call(this, connectionConfiguration, readCursors);
    
    function readCursors(err, result){
        let promises = [];

        for(var i in result.outBinds){
            promises.push(new Promise(function(reject, resolve){
                readRows(null, result.outBinds[i], (err, rows) => {
                    (err && reject(err)) || resolve(rows);
                });
            }));
        }

        Promise.all(promises).them(
            (results) => {
                callback(null, results);
            },
            (errors) => {
                callback(errors);
            });
    }

    function readRows(err, cursor, callback){
        if(err)
            return callback(err);

        cursor.getRows(10, (err, rows) => {
            if (err) 
                return callback(err);
            
            if (rows.length == 0)
                return callback(null, []);

            if(rows.length < 10)
                return callback(null, rows);
            
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

function execute([connectionConfiguration, callback = {}]){
    if(callback == null){
        [connectionConfiguration, callback] = [callback, connectionConfiguration];
    }

    connectionFactory.get(connectionConfiguration, (err, connection) => {
        if(err)
            return callback(err);
        
        connection.execute(this.command, this.parameters, callback);
    });
}
