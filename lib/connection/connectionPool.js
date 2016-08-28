const oracledb = require('oracledb'),
      error = require('../error.js');

module.exports = {
    create,
    exists
}

let poolCache = [];

function create(configuration, callback){
    oracledb.createPool(configuration, (err, pool) => {
        if(err)
            return callback(error.POOL_NOT_CREATED, err)
        
        poolCache.push(configuration.poolAlias);
        callback(null, pool);
    });
}

function exists(poolName){
    return poolCache.indexOf(poolName) > -1;
}
