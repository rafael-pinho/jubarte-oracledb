const oracledb = require('oracledb');

let configuration = {
        database: {
            autoCommit: false,
            maxRows: 100,
            outFormat: oracledb.OBJECT,
            prefetchRows: 100
        },
        pool: {
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
    };

applyConfigurations();

module.exports= {
    setDatabaseDefaults,
    setPoolDefaults,
    setCredentials,
    oracledb: () => {
        return oracledb;
    },
    pool: ()=> {
        return configuration.pool;
    }
}

function setDatabaseDefaults(options){
    applyConfigurations(Object.assign(configuration.database, options));
}

function setPoolDefaults(options){
    applyConfigurations(Object.assign(configuration.pool, options));
}

function setCredentials(credentials){
    Object.assign(configuration.pool, credentials);
}

function applyConfigurations(configuration){
    for(var i in configuration)
        oracledb[i] = configuration[i];
}