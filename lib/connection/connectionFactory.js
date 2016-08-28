const oracledb = require('oracledb'),
      configuration = require('./configuration.js')
      connectionPool = require('./connectionPool.js')
      error = require('../error.js');

module.exports = {
    get
}

function get(options, callback){
    let poolConfiguration = typeof(options) == 'string'
            ? configuration.get({poolAlias: options})
            : configuration.get(options),
        data = connectionPool.get(poolConfiguration.poolAlias);

    if(data == error.POOL_NOT_EXISTS){
        connectionPool.create(poolConfiguration, (err, data) => {
            if(err == error.POOL_NOT_CREATED)
                callback(data);
            else
                data.getConnection(callback);
        });
    }
    else{
        data.getConnection(callback);
    }
}
