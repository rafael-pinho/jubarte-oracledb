const oracledb = require('oracledb'),
      errors = require('../errors.js');

module.exports = {
    create,
    exists
}

let poolCache = [];

function create(configuration, callback){
    oracledb.createPool(configuration, (err, pool) => {
        if(err)
            return callback(errors.POOL_NOT_CREATED, err)
        
        poolCache.push(configuration.poolAlias);
        callback(null, pool);
    });
}

function exists(poolName, callback){
    callback(poolCache.indexOf(poolName) > -1 ? null : errors.POOL_NOT_EXISTS);
}
