const oracledb = require('oracledb'),
      databaseDefaults = {
          autoCommit: false,
          maxRows: 100,
          outFormat: oracledb.OBJECT,
          prefetchRows: 100
      };

exports.set = (configuration) => {
    configuration = Object.assign(databaseDefaults, configuration);

    for(let i in configuration)
        oracledb[i] = configuration[i];
};
