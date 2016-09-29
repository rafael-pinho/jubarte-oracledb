const oracledb = require('oracledb'),
      databaseDefaults = {
          autoCommit: false,
          maxRows: 100,
          outFormat: oracledb.OBJECT,
          prefetchRows: 100,
          Promise: require('bluebird')
      };

exports.setOracledbConfiguration = function(configuration){
    configuration = Object.assign(databaseDefaults, configuration);

    for(let i in configuration)
        oracledb[i] = configuration[i];

    return this;
};
