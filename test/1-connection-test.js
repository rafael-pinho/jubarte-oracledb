let assert = require('assert'),
    oracledb = require('oracledb'),
    poolFactory = require('../lib/connection/poolFactory.js'),
    connectionFactory = require('../lib/connection/connectionFactory.js'),
    Promise = require('bluebird');


describe('database connection', function() {
    it('should return a pool', function(done) {
        oracledb.Promise = Promise;

        poolFactory
            .get({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING 
            })
            .then(function(pool){
                assert(pool);
                assert(pool.getConnection)
                done();
            })
            .catch(function(e){
                done(e);
            });
    });

    it('should return a connection', function(done) {
        oracledb.Promise = Promise;
        
        poolFactory
            .get({
                poolAlias: 'default',
                poolMax: 10,
                poolMin: 4,
                poolIncrement: 2, 
                poolTimeout: 60,
                queueRequests: true,
                queueTimeout: 5,
                stmtCacheSize: 30,
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
});
