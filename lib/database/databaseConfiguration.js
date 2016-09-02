const oracledb = require('oracledb');

exports.set = (configuration) => {
    configuration = Object.assign(getDefaults(), configuration);

    for(var i in configuration)
        oracledb[i] = configuration[i];
}

function getDefaults(){
    return {
        autoCommit: false,
        maxRows: 100,
        outFormat: oracledb.OBJECT,
        prefetchRows: 100
    }
};