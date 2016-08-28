let assert = require('assert'),
    initializer = require('../lib/oracle/initializer.js'),
    configuration = require('../lib/oracle/configuration.js');


describe('database configuration', function() {
    it('should use default setting and change credentials', function(done) {
        initializer.setCredentials({
            user: process.env.ORACLE_USER, 
            password: process.env.ORACLE_PASSWORD, 
            connectString: process.env.ORACLE_CONNECTION_STRING 
        });
        
        assert.equal(configuration.pool().user, process.env.ORACLE_USER);
        assert.equal(configuration.pool().password, process.env.ORACLE_PASSWORD);
        assert.equal(configuration.pool().connectString, process.env.ORACLE_CONNECTION_STRING);
        done();
    });
});