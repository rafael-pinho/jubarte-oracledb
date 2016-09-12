let assert = require('assert'),
    oracledb = require('oracledb'),
    statement = require('../lib/statement/statement.js'),
    Promise = require('bluebird');

describe('statement buider', function() {
    it('should have a sql command', function(done) {
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

        assert.equal(fake.command, command);
        assert.deepEqual(fake.parameters, []);
        
        done(null);
    });
});
