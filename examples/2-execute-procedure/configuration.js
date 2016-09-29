const jubarte = require('../../lib/index.js'),
      oracledb = require('oracledb');

module.exports = (callback) => {
    jubarte.configuration.oracledb.set({
        outBinds: oracledb.OBJECT
    });

    jubarte.configuration.pool.add({
        user: process.env.ORACLE_USER, 
        password: process.env.ORACLE_PASSWORD, 
        connectString: process.env.ORACLE_CONNECTION_STRING 
    }).then(() => {
        callback();
    })
    .catch((e) => {
        callback(e);
    })
}