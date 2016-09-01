const databaseConfig = require('../oracle/configuration.js'),
      connectionPool = require('./connectionPool.js'),
      Promise = require('bluebird'),
      error = require('../error.js');

module.exports = {
    get
}

function get(poolConfiguration){
    return new Promise(function(resolve, reject){
        poolConfiguration = Object.assign(databaseConfig.pool(), typeof(poolConfiguration) == 'string'
            ? { poolAlias: poolConfiguration }
            : poolConfiguration);
        
        connectionPool.getPool(poolConfiguration)
            .then(function(pool){
                return connectionPool.getConnection(pool);
            })
            .then(function(connection){
                resolve(connection);
            })
            .catch(function(err){
                reject(err);
            });
    });
}
