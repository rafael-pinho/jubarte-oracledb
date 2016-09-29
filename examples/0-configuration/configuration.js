const jubarte = require('../../lib/index.js'),
      oracledb = require('oracledb');

module.exports = (callback) => {
    jubarte.initialize.setOracleDefaults({
        outBinds: oracledb.OBJECT
    })
    .addConnectionPool({
        user: process.env.ORACLE_USER, 
        password: process.env.ORACLE_PASSWORD, 
        connectString: process.env.ORACLE_CONNECTION_STRING 
    }).then(() => {
        callback();
    })
    .catch((e) => {
        callback(e);
    });
}