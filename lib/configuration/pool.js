const poolFactory = require('../connection/poolFactory.js');

exports.createPool = (poolConfiguration) => {
    if(!poolConfiguration.user || !poolConfiguration.password || !poolConfiguration.connectString)
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

    return poolFactory.create(poolConfiguration);
}
