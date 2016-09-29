const assert = require('assert'),
      poolFactory = require('../lib/connection/poolFactory.js'),
      statement = require('../lib/statement/statement.js');

describe('statement buider', function() {
    
    it('should have a statement object', function(done) {
        try{
            let fake = statement.create();

            assert(fake);
            assert(fake.sql);
            assert(fake.addParameters);
            assert(fake.parameters);
            assert(fake.execute);
            assert(fake.executeProcedure);
            assert(fake.fetchProcedure);
            assert(fake.commit);
            assert(fake.roolback);
            assert(fake.done);
            assert.deepEqual(fake.parameters, []);
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
        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'poolTest3.0'
            })
            .then(() => {
                let command = 'SELECT SYSDATE FROM DUAL',
                fake = statement.create(command);

                fake.execute('poolTest3.0')
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
            });
    });

    it('should execute a sql command and return parameter value', function(done) {
        poolFactory
            .create({
                user: process.env.ORACLE_USER, 
                password: process.env.ORACLE_PASSWORD, 
                connectString: process.env.ORACLE_CONNECTION_STRING,
                poolAlias: 'poolTest3.1'
            })
            .then(() => {
                let command = 'SELECT :param FROM DUAL',
                fake = statement.create();

                fake.sql(command)
                    .addParameters(1)
                    .execute('poolTest3.1')
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
            });
    });
});
