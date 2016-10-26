const jubarte = require('jubarte-oracledb');

module.exports = (callback) => {
    jubarte.initialize.setOracleDefaults({
        outBinds: jubarte.oracledb.OBJECT
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