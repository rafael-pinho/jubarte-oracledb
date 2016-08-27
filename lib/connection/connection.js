const oracledb = require('oracledb'),
      configuration = require('./configuration.js')
      connectionPool = require('./connectionPool.js')
      errors = require('../errors.js');

module.exports = {
    get
}

function get(options, callback){
    let poolConfiguration = typeof(options) == 'string'
        ? configuration.get({poolAlias: options})
        : configuration.get(options);

    connectionPool.exists(poolConfiguration.poolAlias, (err) => {
        if(err == null)
            return oracledb.getConnection(poolConfiguration.poolAlias, callback);

        connectionPool.create(poolConfiguration, (err, data) => {
            if(err == errors.POOL_NOT_CREATED)
                callback(data);
            else
                data.getConnection(poolConfiguration.poolAlias, callback);
        });
    });
}
