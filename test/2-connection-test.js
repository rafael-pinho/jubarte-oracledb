let assert = require('assert'),
    bluebird = require('bluebird'),
    oracledb = require('oracledb'),
    connectionFactory = require('../lib/connection/connectionFactory.js'),
    poolFactory = require('../lib/connection/poolFactory.js');

oracledb.Promise = bluebird;

describe('connection management', function() {

    it('should fail in try to get a connection', function(done) {
        try{
            connectionFactory.get();
            done("You are not welcome here: a pool with alias default not exists");
        }
        catch(e){
            done();
        }
    });

    it('should get a connection', function(done) {
        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'poolTest2.0'
            })
            .then(function(){
                return connectionFactory.get('poolTest2.0')
            })
            .then(function(connection){
                assert(connection);
                assert(connection.execute);
                done();
            })
            .catch(function(e){
                done(e);
            });
    });

    it('should get three more connections', function(done) {
        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'poolTest2.1'
            })
            .then(function(pool){
                let promises = [];

                for(let i =0; i < 3; i ++)
                    promises.push(connectionFactory.get('poolTest2.1'));
                
                return promises;
            })
            .spread(function(...connections){
                assert(connections);
                assert(connections.length == 3);

                for(let i = 0; i < connections.length; i ++)
                    assert(connections[i].execute);

                done();
            })
            .catch(function(e){
                done(e);
            });
    });
});
