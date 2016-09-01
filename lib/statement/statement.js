const Promise = require('bluebird'),
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

function fetchProcedure(connectionConfiguration){
    return new Promise((resolve, reject) => {
        this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
        execute.call(this, connectionConfiguration)
            .then(function(result){
                return readCursors(result);
            })
            .spread(function(...cursors){
                resolve(cursors);
            })
            .catch(function(e){
                reject(e);
            });
    });

    function readCursors(result){
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
        
        return promises;

        function readRows(err, cursor, callback){
            const fetchLength = 10;
            if(err)
                return callback(err);

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
}

function executeProcedure(...params){
    this.command = `BEGIN ${this.command}(${Object.getOwnPropertyNames(this.parameters).map(x => `:${x} `).toString()}); END;`
    return execute.call(this, ...params);
}

function execute(connectionConfiguration){
    return new Promise((resolve, reject) => {
        connectionFactory.get(connectionConfiguration || {})
            .then((connection) => {
                this.connection = connection;
                connection.execute(this.command, this.parameters, (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            })
            .catch((e) => {
                reject(e)
            });
    });
}
