const databaseConfiguration = require('./databaseConfiguration.js'),
      poolFactory = require('../connection/poolFactory.js');

module.exports = {
    setOracleDefaults,
    addConnectionPool
};

function setOracleDefaults(configuration){
    databaseConfiguration.set(configuration);
    return this;
}

function addConnectionPool(configuration){
    if(!configuration.user || !configuration.password || !configuration.connectString)
        throw `To add a new connection pool you need to send a object. The default object is:  
                {
                    poolAlias: 'default', 
                    poolMax: 10,
                    poolMin: 4,
                    poolIncrement: 2, 
                    poolTimeout: 60,
                    queueRequests: true,
                    queueTimeout: 5,
                    stmtCacheSize: 30,
                    user: null, 
                    password: null, 
                    connectString: null
                }
            The properties "user", "password" and "connectString" are required. Other properties will have the default value`;

    poolFactory
        .create(configuration)
        .then((pool) => {
            console.log(`pool ${pool} created`);   
        })
        .catch((e) => {
            throw e;
        });

    return this;
}