let assert = require('assert'),
    statement = require('../lib/statement/statement.js'),
    Promise = require('bluebird');

describe('statement buider', function() {
    it('should have a sql command', function(done) {
        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement.create(command);
        assert(fake);
        assert.equal(fake.command, command);
        done(null);
    });

    it('should get sysdate from oracle', function(done) {
        this.timeout(10000);

        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement.create(command).execute({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING 
            })
            .then((data) => {
                assert.ok(data.rows[0][0]);
                done(null);
            })
            .catch((e) => {
                done(e);
            });
    });

    it('should execute a sql command and send a parameter array', function(done) {
        this.timeout(10000);

        let p1 = 'Noe',
            p2 = 45
            command = 'SELECT :name, :age FROM DUAL',

            fake = statement
                        .create(command)
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
                        .catch(function(err){
                            assert(!err)
                            done(err);
                        });
    });

    it('should execute a sql command and send parameters as an object', function(done) {
        this.timeout(10000);
        
        let p1 = 'Johan',
            p2 = 45
            command = 'SELECT :name, :age FROM DUAL',

            fake = statement
                        .create(command)
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
                        .catch(function(err){
                            assert(!err)
                            done(err);
                        });
    });
});
