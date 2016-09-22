let poolFactory = require('../lib/connection/poolFactory.js'),
    assert = require('assert'),
    bluebird = require('bluebird');

describe('pool management', function() {
    it('should create a connection pool', function(done) {
        oracledb.Promise = bluebird;

        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'testPool001'
            })
            .then(function(pool){
                assert(pool);
                assert(pool.getConnection);
                done();
            })
            .catch(function(e){
                done(e);
            });
    });

    it('should return the created pool "testPool001"', function(done) {
        oracledb.Promise = bluebird;

        poolFactory
            .get({
                poolAlias: 'testPool001'
            })
            .then(function(pool){
                assert(pool);
                assert(pool.getConnection);
                done();
            })
            .catch(function(e){
                done(e);
            });
    });
});
