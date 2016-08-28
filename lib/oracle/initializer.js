const oracleConfiguration = require('./configuration.js');

module.exports = {
    setOracleDefaults,
    setConectionPoolDefaults,
    setCredentials,
}

function setOracleDefaults(options){
    oracleConfiguration.setDatabaseDefaults(options);
    return this;
}

function setConectionPoolDefaults(options){
    oracleConfiguration.setPoolDefaults(options);
    return this;
}

function setCredentials(credentials){
    oracleConfiguration.setCredentials(credentials);
    return this;
}
