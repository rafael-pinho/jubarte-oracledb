let assert = require('assert'),
    oracledb = require('oracledb'),
    initializer = require('../lib/database/initializer.js'),
    statement = require('../lib/statement/statement.js');

describe('initialize database and execute a command', function() {
    it('should use credentials and return result as an object', function(done) {
        this.timeout(10000);
        
        initializer.addConnectionPool({
            poolAlias: 'pool1',
            user: process.env.ORACLE_USER, 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING 
        }).setOracleDefaults({
            outFormat: oracledb.OBJECT
        });
        
        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement
                        .create(command)
                        .execute('pool1')
                        .then((data) => {
                            assert(data.rows[0].SYSDATE);
                            done(null);
                        })
                        .catch(function(e){
                            assert(!e)
                            done(e);
                        });
    });

    it('should use credentials and return result as an array', function(done) {
        this.timeout(10000);
        
        initializer.addConnectionPool({
            poolAlias: 'pool2',
            user: process.env.ORACLE_USER, 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING 
        }).setOracleDefaults({
            outFormat: oracledb.ARRAY
        });

        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement
                        .create(command)
                        .execute('pool2')
                        .then((data) => {
                            assert(data.rows[0][0]);
                            done(null);
                        })
                        .catch(function(e){
                            assert(!e)
                            done(e);
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
            .execute('notdefault')
            .then((data) => {
                assert(!data);
                done(null);
            })
            .catch(function(e){
                assert(e)
                done();
            });
    });
});