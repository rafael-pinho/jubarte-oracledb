const connectionFactory = require('../connection/connectionFactory.js');
      parameterBuilder = require('./parameterBuilder.js');

exports.create = (command) => {
    return {
        command,
        parameters: parameterBuilder,
        execute
    }
}

function execute(...params){
    let connectionConfiguration, 
        callback;

    switch(params.length){
        case 1:
            callback = params[0];
        break
        case 2:
            callback = params[1];
            connectionConfiguration = params[0];
        break
    }

    connectionFactory.get(connectionConfiguration, (err, connection) => {
        if(err)
            return callback(err);
            
        connection.execute(this.command, this.parameters, callback);
    });
}