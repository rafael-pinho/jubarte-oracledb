const databaseConfig = require('../oracle/configuration.js'),
    Promise = require('bluebird'),
    error = require('../error.js');

module.exports = {
    get
}

function get(oracledb, configuration) {
    return new Promise(function (resolve, reject) {
        try {
            let pool = oracledb.getPool(configuration.poolAlias);
            resolve(pool);
        }
        catch (e) {
            console.log(e);

            if(!e.message.includes('NJS-047'))
                return reject(e);

            oracledb.createPool(configuration)
                .then(function(pool){
                    resolve(pool);
                })
                .catch(function(e){
                    reject(e);
                });
        }
    });
}
