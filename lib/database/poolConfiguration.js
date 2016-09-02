let pools = {};

exports.get = (alias) => {
    return pools[alias];
}

exports.add = (configuration) => {
    if(!configuration.poolAlias) 
        configuration.poolAlias = 'default';

    if(pools[configuration.poolAlias])
        throw `pool ${configuration.poolAlias} already defined`;

    pools[configuration.poolAlias] = Object.assign(getDefaults(), configuration);
}

function getDefaults(){
    return {
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
}