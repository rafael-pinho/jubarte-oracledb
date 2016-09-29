module.exports = {
    initialize: {
        setOracleDefaults: require('./configuration/oracledb.js').setOracledbConfiguration,
        addConnectionPool: require('./configuration/pool.js').createPool
    },
    statement: require('./statement/statement.js')
};
