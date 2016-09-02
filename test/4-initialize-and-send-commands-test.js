let assert = require('assert'),
    oracledb = require('oracledb'),
    initializer = require('../lib/oracle/initializer.js'),
    configuration = require('../lib/oracle/configuration.js'),
    statement = require('../lib/statement/statement.js');


describe('initialize database and execute a command', function() {
    it('should use credentials and return result as an object', function(done) {
        this.timeout(10000);
        
        initializer.addConnectionPool({
            user: process.env.ORACLE_USER, 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING 
        }).setOracleDefaults({
            outFormat: oracledb.OBJECT
        });
        
        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement
                        .create(command)
                        .execute()
                        .then((data) => {
                            assert(data.rows[0].SYSDATE);
                            done(null);
                        })
                        .catch(function(err){
                            assert(!err)
                            done(err);
                        });
    });

    it('should use credentials and return result as an array', function(done) {
        this.timeout(10000);
        
        initializer.addConnectionPool({
            user: process.env.ORACLE_USER, 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING 
        }).setOracleDefaults({
            outFormat: oracledb.ARRAY
        });

        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement
                        .create(command)
                        .execute()
                        .then((data) => {
                            assert(data.rows[0][0]);
                            done(null);
                        })
                        .catch(function(err){
                            assert(!err)
                            done(err);
                        });
    });

    it('should not connect', function(done) {
        this.timeout(10000);
        
        initializer.addConnectionPool({
            user: 'nobody', 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING,
            poolAlias: 'notdefault'
        }).setOracleDefaults({
            outFormat: oracledb.ARRAY
        });
        
        let command = 'SELECT SYSDATE FROM DUAL';
        statement
            .create(command)
            .execute()
            .then((data) => {
                assert(!data);
                done(null);
            })
            .catch(function(err){
                assert(err)
                done();
            });
    });
});