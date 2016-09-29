const oracledb = require('oracledb'),
      Treaty = require('bluebird');

module.exports = {
    get,
    create
};

function get(poolAlias) {
    return oracledb.getPool(poolAlias);
}

function create(configuration){
    return oracledb.createPool(configuration);
}
