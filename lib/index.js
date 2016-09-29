module.exports = {
    configuration: {
        oracledb: require('./configuration/oracledb.js'),
        pool: require('./configuration/pool.js')
    },
    statement: require('./statement/statement.js')
};