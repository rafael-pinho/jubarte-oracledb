const assert = require('assert'),
      oracledb = require('oracledb'),
      oracleConfiguration = require('../lib/configuration/oracledb.js');

describe('oracledb configuration', function() {

    it('should set oracledb defaults', function(done) {
        try{
            oracleConfiguration.set({
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
