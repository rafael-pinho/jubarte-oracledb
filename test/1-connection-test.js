let assert = require('assert'),
    oracledb = require('oracledb'),
    poolFactory = require('../lib/connection/poolFactory.js'),
    Promise = require('bluebird');


describe('database connection', function() {
    it('should return a pool', function(done) {
        oracledb.Promise = Promise;
        poolFactory
            .get(oracledb, {
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
});