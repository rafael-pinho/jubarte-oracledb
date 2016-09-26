const assert = require('assert'),
      statement = require('../../lib/statement/statement.js');

describe('statement buider', function() {
    
    it('should have a statement object', function(done) {
        try{
            let command = 'SELECT SYSDATE FROM DUAL',
                fake = statement.create(command);

            assert(fake);
            assert(fake.sql);
            assert(fake.command);
            assert(fake.parameters);
            assert(fake.addParameters);
            assert(fake.execute);
            assert(fake.executeProcedure);
            assert(fake.fetchProcedure);
            assert(fake.commit);
            assert(fake.roolback);
            assert.deepEqual(fake.parameters, []);
            assert.equal(fake.command, command);
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should have a sql command', function(done) {
        try{
            let command = 'SELECT SYSDATE FROM DUAL',
                fake = statement.create(command);
            assert.equal(fake.command, command);
            done();
        }
        catch(e){
            done(e);
        }
    });

    it('should execute a sql command', function(done) {
        try{
            let command = 'SELECT SYSDATE FROM DUAL',
                fake = statement.create(command);
            
            fake.execute({
                    user: process.env.ORACLE_USER, 
                    password: process.env.ORACLE_PASSWORD, 
                    connectString: process.env.ORACLE_CONNECTION_STRING
                })
                .then((result) => {
                    assert(result.rows[0]);
                    assert(typeof(result.rows[0]) == 'object');
                    done();
                })
                .finally(() => {
                    fake.done();
                })
                .catch((e) => {
                    done(e);
                })
        }
        catch(e){
            done(e);
        }
    });

    it('should execute a sql command and return parameter value', function(done) {
        try{
            let command = 'SELECT :MYNUMBER FROM DUAL',
                fake = statement.create(command);
            
            fake.addParameters(1)
                .execute({
                    user: process.env.ORACLE_USER, 
                    password: process.env.ORACLE_PASSWORD, 
                    connectString: process.env.ORACLE_CONNECTION_STRING
                })
                .then((result) => {
                    assert(result.rows[0]);
                    assert.equal(result.rows[0], 1);
                    done();
                })
                .finally(() => {
                    fake.done();
                })
                .catch((e) => {
                    done(e);
                })
        }
        catch(e){
            done(e);
        }
    });
});
