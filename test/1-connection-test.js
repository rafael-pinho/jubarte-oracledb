let assert = require('assert'),
    connectionFactory = require('../lib/connection/connectionFactory.js'),
    Promise = require('bluebird');


describe('connection management', function() {
    it('should get a connection', function(done) {
        oracledb.Promise = Promise;
        
        poolFactory
            .get({
                poolAlias: 'poolTest002',
                poolMax: 10,
                poolMin: 4,
                poolIncrement: 2, 
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING 
            })
            .then(function(pool){
                return connectionFactory.get(pool);
            })
            .then(function(connection){
                assert(connection);
                assert(connection.execute)
                done();
            })
            .catch(function(e){
                done(e);
            });
    });

    it('should get nine more connections', function(done) {
        oracledb.Promise = Promise;
        
        poolFactory
            .get({
                poolAlias: 'poolTest002',
            })
            .then(function(pool){
                return '123456789'.map(x => connectionFactory.get(pool));
            })
            .spread(function(...connections){
                assert.equal(connections.length, 9);
                connections.forEach((conn) => {assert(conn.execute)});
                done();
            })
            .catch(function(e){
                done(e);
            });
    });

    it('should fail in try to get a connection', function(done) {
        oracledb.Promise = Promise;
        
        poolFactory
            .get({
                poolAlias: 'poolTest003',
                user: 'Gandalf', 
                password: 'YouShallNotPass', 
                connectString: process.env.ORACLE_CONNECTION_STRING 
            })
            .then(function(pool){
                return connectionFactory.get(pool);
            })
            .then(function(connection){
                throw "You are not welcome here: " + connection;
            })
            .catch(function(e){
                assert(e);
                done();
            });
    });
});
