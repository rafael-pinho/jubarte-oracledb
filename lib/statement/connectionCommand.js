const connectionFactory = require('../connection/connectionFactory.js'),
      Treaty = require('bluebird');

module.exports = {
    connect,
    commit,
    roolback,
    done
}

function connect(poolAlias){
    let self = this;

    return new Treaty(function(resolve, reject){
        connectionFactory.get(poolAlias)
            .then(function(connection){
                self.connection = connection;
                resolve(connection);
            })
            .catch(function(e){
                reject(e);
            });
    });
}

function commit(){
    if(this.connection)
        return this.connection.commit();
}

function roolback(){
    if(this.connection)
        return this.connection.roolback();
}

function done(){
    if(this.connection)
        return this.connection.close();
}
