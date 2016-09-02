const databaseConfiguration = require('./databaseConfiguration.js'),
      poolConfiguration = require('./poolConfiguration.js');

module.exports = {
    setOracleDefaults,
    addConnectionPool
}

function setOracleDefaults(configuration){
    databaseConfiguration.set(configuration);
    return this;
}

function addConnectionPool(configuration){
    poolConfiguration.add(configuration);
    return this;
}
