module.exports = {
    initialize: {
        setOracleDefaults: require('./configuration/oracledb.js'),
        addConnectionPool: require('./configuration/pool.js')
    },
    statement: require('./statement/statement.js')
};
