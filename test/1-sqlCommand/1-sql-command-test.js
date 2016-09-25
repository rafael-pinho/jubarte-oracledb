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
            done(null);
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
            done(null);
        }
        catch(e){
            done(e);
        }
    });

});
