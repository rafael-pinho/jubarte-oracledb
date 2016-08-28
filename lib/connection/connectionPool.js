const databaseConfig = require('../oracle/configuration.js'),
      error = require('../error.js');

module.exports = {
    create,
    get
}

function create(configuration, callback){
    databaseConfig.oracledb().createPool(configuration, (err, pool) => {
        if(err)
            return callback(error.POOL_NOT_CREATED, err)

        callback(null, pool);
    });
}

function get(poolName){
    try {
        return { 
            err: null,
            pool: databaseConfig.oracledb().getPool(poolName) 
        };
    }
    catch(e) {
        return { 
            err: error.POOL_NOT_EXISTS,
            pool: null
        };
    }
}
