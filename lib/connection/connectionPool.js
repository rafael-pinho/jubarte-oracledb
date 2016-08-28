const oracledb = require('oracledb'),
      error = require('../error.js');

module.exports = {
    create,
    get
}

let poolCache = [];

function create(configuration, callback){
    oracledb.createPool(configuration, (err, pool) => {
        if(err)
            return callback(error.POOL_NOT_CREATED, err)

        callback(null, pool);
    });
}

function get(poolName){
    try {
        return oracledb.getPool(poolName);
    }
    catch(e) {
        return error.POOL_NOT_EXISTS;
    }
}
