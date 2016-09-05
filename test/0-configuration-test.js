let assert = require('assert'),
    oracledb = require('oracledb'),
    databaseConfiguration = require('../lib/database/databaseConfiguration.js'),
    poolConfiguration = require('../lib/database/poolConfiguration.js');


describe('database configuration', function() {
    it('should set oracledb configuration', function(done) {
        let oldValue = oracledb.maxRows;
        databaseConfiguration.set({ maxRows: 7 });
        
        assert.notEqual(oldValue, oracledb.maxRows);
        done();
    });

    it('should set oracledb configuration', function(done) {
        let configuration = {
            poolAlias: 'default',
            poolMax: 10,
            poolMin: 4,
            poolIncrement: 2, 
            poolTimeout: 60,
            queueRequests: true,
            queueTimeout: 5,
            stmtCacheSize: 30,
            user: null, 
            password: null, 
            connectString: null
        };

        poolConfiguration.add(configuration);
        
        let pools = poolConfiguration.get('default');
        assert(pools, configuration);
        done();
    });
});