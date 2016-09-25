const parameterBuilder = require('./parameterBuilder.js'),
      sqlCommand = require('./sqlCommand.js'),
      connectionCommand = require('./connectionCommand.js');

exports.create = (command) => {
    return {
        sql: sqlCommand.sql,
        command,
        addParameters: parameterBuilder,
        parameters: [], 
        execute: sqlCommand.execute,
        executeProcedure: sqlCommand.executeProcedure,
        fetchProcedure: sqlCommand.fetchProcedure,
        commit: connectionCommand.commit,
        roolback: connectionCommand.roolback,
        done: connectionCommand.done
    };
};
