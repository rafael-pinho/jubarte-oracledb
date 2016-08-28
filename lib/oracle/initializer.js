const oracleConfiguration = require('./configuration.js');

module.exports = {
    setOracleDefaults,
    setConnectionPoolDefaults,
    setCredentials,
}

function setOracleDefaults(options){
    oracleConfiguration.setDatabaseDefaults(options);
    return this;
}

function setConnectionPoolDefaults(options){
    oracleConfiguration.setPoolDefaults(options);
    return this;
}

function setCredentials(credentials){
    oracleConfiguration.setCredentials(credentials);
    return this;
}
