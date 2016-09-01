const databaseConfig = require('../oracle/configuration.js'),
    Promise = require('bluebird'),
    error = require('../error.js');

module.exports = {
    getPool,
    getConnection
}

function getPool(configuration) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(databaseConfig.oracledb().getPool(configuration.poolAlias));
        }
        catch (e) {
            if(e.message.includes('NJS-047'))
                databaseConfig.oracledb().createPool(configuration, (err, pool) => {
                    err ? reject(err) : resolve(pool);
                });
            else
                reject(e);
        }
    });
}

function getConnection(pool) {
    return new Promise(function (resolve, reject) {
        pool.getConnection((err, pool) => {
            if (err)
                reject(err);

            resolve(pool);
        });
    });
}