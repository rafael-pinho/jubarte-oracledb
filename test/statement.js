let assert = require('assert'),
    statement = require('../lib/statement/statement.js');


describe('statement buider', function() {
    it('should have a sql command', function(done) {
        let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement.create(command);
        assert(fake);
        assert.equal(fake.command, command);
        done(null);
    });
});
