let assert = require('assert'),
    oracledb = require('oracledb'),
    bluebird = require('bluebird'),
    poolFactory = require('../lib/connection/poolFactory.js');

describe('pool management', function() {
    
    it('should create a connection pool', function(done) {
        oracledb.Promise = bluebird;

        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'poolTest1'
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

    it('should not return a pool because it was not created', function(done) {
        oracledb.Promise = bluebird;
        try{
            let pool = poolFactory.get('anypool');
            assert(pool);
            assert(pool.getConnection);
            done('a pool named "anypool" should not be returned');
        }
        catch(e){
            done();
        }
    });

    it('should return the created pool "poolTest1"', function(done) {
        oracledb.Promise = bluebird;
        try{
            let pool = poolFactory.get('poolTest1');
            assert(pool);
            assert(pool.getConnection);
            done();
        }
        catch(e){
            done(e);
        }
    });
});
