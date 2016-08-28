const databaseConfig = require('../oracle/configuration.js'),
      connectionPool = require('./connectionPool.js')
      error = require('../error.js');

module.exports = {
    get
}

function get(poolConfiguration, callback){
    poolConfiguration = Object.assign(databaseConfig.pool(), typeof(poolConfiguration) == 'string'
        ? { poolAlias: poolConfiguration }
        : poolConfiguration);
     
    let { err, pool } = connectionPool.get(poolConfiguration.poolAlias);

    if(err == error.POOL_NOT_EXISTS){
        connectionPool.create(poolConfiguration, (err, data) => {
            if(err == error.POOL_NOT_CREATED)
                callback(data);
            else
                data.getConnection(callback);
        });
    }
    else{
        pool.getConnection(callback);
    }
}
