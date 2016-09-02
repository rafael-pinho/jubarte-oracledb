poolConfiguration = require('../database/poolConfiguration');

exports.createConfiguration = (configuration) => {
    if(typeof(configuration) == 'string') 
        configuration = { poolAlias: configuration };
    else
        if(!configuration.poolAlias)
            configuration.poolAlias = 'default';

    let poolConfig = poolConfiguration.get(configuration.poolAlias);

    if(poolConfig)
        return poolConfig;

    poolConfiguration.add(configuration);
    return poolConfiguration.get(configuration.poolAlias || configuration);
}
