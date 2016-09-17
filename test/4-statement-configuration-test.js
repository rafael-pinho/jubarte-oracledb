let assert = require('assert'),
    oracledb = require('oracledb'),
    initializer = require('../lib/database/initializer.js'),
    statement = require('../lib/statement/statement.js');

describe('initialize database and execute a command', function() {
    it('should use credentials and return result as an object', function(done) {
        initializer.setOracleDefaults({
            outFormat: oracledb.OBJECT
        });
        
        let fake = statement.create('SELECT SYSDATE FROM DUAL');
        
        fake
            .execute({
                poolAlias: 'pool1',
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING 
            })
            .then((data) => {
                assert(data.rows[0].SYSDATE);
                done(null);
            })
            .finally(function(){
                fake.done();
            })
            .catch(function(e){
                console.log(e)
                assert(!e)
                done(e);
            });
    });

    it('should use credentials and return result as an array', function(done) {
        initializer.setOracleDefaults({
            outFormat: oracledb.ARRAY
        });

        let fake = statement.create('SELECT SYSDATE FROM DUAL');
        
        fake
            .execute('pool1')
            .then((data) => {
                assert(data.rows[0][0]);
                done(null);
            })
            .finally(function(){
                fake.done();
            })
            .catch(function(e){
                console.log(e)
                assert(!e)
                done(e);
            });
    });

    it('should not connect', function(done) {
        initializer.addConnectionPool({
            user: 'nobody', 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING,
            poolAlias: 'notdefault'
        }).setOracleDefaults({
            outFormat: oracledb.ARRAY
        });
        
        let fake = statement.create('SELECT SYSDATE FROM DUAL');

        fake
            .execute('notdefault')
            .then((data) => {
                assert(!data);
                done(null);
            })
            .finally(function(){
                fake.done();
            })
            .catch(function(e){
                assert(e)
                done();
            });
    });
});