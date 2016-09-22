const Promise = require('bluebird');

module.exports = {
    get
}

function get(pool){
    return pool.getConnection();
}
