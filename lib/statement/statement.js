const connectionFactory = require('../connection/connectionFactory.js'),
      parameterBuilder = require('./parameterBuilder.js');

exports.create = (command) => {
    return {
        command,
        parameters: [], 
        addParameters: parameterBuilder,
        execute
    }
}

function execute(...params){
    let connectionConfiguration, 
        callback;

    switch(params.length){
        case 1:
            callback = params[0];
        break;
        case 2:
            callback = params[1];
            connectionConfiguration = params[0];
        break;
        default:
            console.error('execute expects only two parameters')
            throw 'jubarte-oracledb expect only two parameters on statement execute method';
    }

    connectionFactory.get(connectionConfiguration, (err, connection) => {
        if(err)
            return callback(err);
        
        connection.execute(this.command, this.parameters, callback);
    });
}