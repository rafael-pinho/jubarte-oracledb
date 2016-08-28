const oracledb = require('oracledb'),
      configuration = require('./configuration.js')
      connectionPool = require('./connectionPool.js')
      status = require('../error.js');

module.exports = {
    get
}

function get(options, callback){
    let poolConfiguration = typeof(options) == 'string'
            ? configuration.get({poolAlias: options})
            : configuration.get(options),
        poolIsCreated = connectionPool.exists(poolConfiguration.poolAlias);

    if(poolIsCreated)
        return oracledb.getConnection(poolConfiguration.poolAlias, callback);

    connectionPool.create(poolConfiguration, (err, data) => {
        if(err == error.POOL_NOT_CREATED)
            callback(data);
        else
            data.getConnection(poolConfiguration.poolAlias, callback);
    });
}
