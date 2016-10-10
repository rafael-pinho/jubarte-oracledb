const parameterBuilder = require('./parameterBuilder.js'),
      sqlCommand = require('./sqlCommand.js'),
      connectionCommand = require('./connectionCommand.js');

exports.create = (command) => {
    return {
        sql: sqlCommand.sql,
        command,
        addParameters: parameterBuilder,
        parameters: [], 
        connect: connectionCommand.connect,
        execute: sqlCommand.execute,
        executeProcedure: sqlCommand.executeProcedure,
        fetchProcedure: sqlCommand.fetchProcedure,
        commit: connectionCommand.commit,
        roolback: connectionCommand.roolback,
        done: connectionCommand.done
    };
};
