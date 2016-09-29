const poolFactory = require('./poolFactory.js')

exports.get = (poolAlias) => {
    return poolFactory
            .get(poolAlias)
            .getConnection();
};
