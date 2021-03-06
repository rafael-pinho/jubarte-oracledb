const oracledb = require('oracledb');

module.exports = {
    oracledb,
    initialize: {
        setOracleDefaults: require('./configuration/oracledb.js').setOracledbConfiguration,
        addConnectionPool: require('./configuration/pool.js').createPool
    },
    statement: require('./statement/statement.js')
};
