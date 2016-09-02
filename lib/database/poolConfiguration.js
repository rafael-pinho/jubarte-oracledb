let pools = {};

exports.get = () => {
    return pools;
}

exports.add = (configuration) => {
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