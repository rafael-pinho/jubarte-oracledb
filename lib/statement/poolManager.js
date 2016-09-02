poolConfiguration = require('../database/poolConfiguration');

exports.createConfiguration = (configuration) => {
    if(configuration && typeof(configuration) == 'string') 
        configuration = { poolAlias: configuration };

    let poolConfig = poolConfiguration.get(configuration.poolAlias || configuration);

    if(poolConfig)
        return poolConfig;

    poolConfiguration.create(configuration);
    return poolConfiguration.get(configuration.poolAlias || configuration);
}
