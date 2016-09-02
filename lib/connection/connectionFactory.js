const Promise = require('bluebird');

module.exports = {
    get
}

function get(pool){
    return new Promise(function(resolve, reject){
        pool.getConnection()
            .then(function(connection){
                resolve(connection);
            })
            .catch(function(e){
                reject(e);
            });
    });
}
