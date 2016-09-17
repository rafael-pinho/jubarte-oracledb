const oracledb = require('oracledb')
    Promise = require('bluebird');

module.exports = {
    get
}

module.exports = {
    get,
    create
}

function get(configuration) {
    return new Promise(function (resolve, reject) {
        try {
            let pool = oracledb.getPool(configuration.poolAlias);
            resolve(pool);
        }
        catch(e) {
            if(!e.message.includes('NJS-047'))
                return reject(e);
            
            create(configuration)
                .then(function(pool){
                    resolve(pool)
                })
                .catch(function(e){
                    reject(e);
                });
        }
    });
}

function create(configuration){
    return oracledb.createPool(configuration)
}
