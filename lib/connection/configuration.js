exports.get = (options) => {
    return Object.assign({
        poolAlias: 'default',
        poolMax: 10,
        poolMin: 4,
        poolIncrement: 2, 
        poolTimeout: 60,
        queueRequests: true,
        queueTimeout: 5,
        stmtCacheSize: 30
    }, options);
}