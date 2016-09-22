let assert = require('assert'),
    oracledb = require('oracledb'),
    statement = require('../lib/statement/statement.js'),
    Promise = require('bluebird');

describe('statement parameters', function() {
    it('should execute a sql command and passing a parameter array', function(done) {
        oracledb.outFormat = oracledb.ARRAY;

        let p1 = 'Noe',
            p2 = 45,
            command = 'SELECT :name, :age FROM DUAL',
            fake = statement.create(command);

            fake
                .addParameters(p1, p2)
                .execute({
                    user: process.env.ORACLE_USER, 
                    password: process.env.ORACLE_PASSWORD, 
                    connectString: process.env.ORACLE_CONNECTION_STRING 
                })                            
                .then(function(data){
                    assert.ok(data.rows[0]);
                    assert.equal(data.rows[0][0], p1);
                    assert.equal(data.rows[0][1], p2);
                    done(null);
                })
                .finally(function(){
                    fake.done();
                })
                .catch(function(e){
                    assert(!e);
                    done(e);
                });
    });

    it('should execute a sql command and passing parameters as an object', function(done) {
        oracledb.outFormat = oracledb.ARRAY;
        
        let p1 = 'Johan',
            p2 = 45,
            command = 'SELECT :name, :age FROM DUAL',
            fake = statement.create(command);
            
            fake
                .addParameters()
                    .name('name').value(p1)
                    .name('age').value(p2)
                .execute({
                    user: process.env.ORACLE_USER, 
                    password: process.env.ORACLE_PASSWORD, 
                    connectString: process.env.ORACLE_CONNECTION_STRING 
                })
                .then(function(data){
                    assert.ok(data.rows[0]);
                    assert.equal(data.rows[0][0], p1);
                    assert.equal(data.rows[0][1], p2);
                    done(null);
                })
                .finally(function(){
                    fake.done();
                })
                .catch(function(e){
                    assert(!e);
                    done(e);
                });
    });
});
