const assert = require('assert'),
      oracledb = require('oracledb'),
      databaseConfiguration = require('../../lib/database/databaseConfiguration.js');

describe('setting database configuration', function() {

    it('should set oracledb defaults', function(done) {
        try{
            databaseConfiguration.set({
                autoCommit: true, 
                maxRows: 10
            });

            assert.equal(oracledb.autoCommit, true);
            assert.equal(oracledb.maxRows, 10);
            done();
        }
        catch(e){
            done(e);
        }
    });
});
