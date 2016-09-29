let assert = require('assert'),
    parameterBuilder = require('../lib/statement/parameterBuilder.js');


describe('parameter buider', function() {
    
    it('should have an array of values', function(done) {
        function buildParams(...values){
            let fake = {
                addParameters: parameterBuilder
            };
            fake.addParameters(...values);
            assert(fake.parameters);
            assert.equal(fake.parameters.length, values.length);
            assert.deepStrictEqual(fake.parameters, values)
        }
        
        try{
            buildParams(1, -10, 258);
            buildParams('', '1', 'parameter2');
            buildParams(true, 3);
            buildParams(1, false, 'parameter3', 100, -2376, true, 0, '45');
            done(null);
        }
        catch(e){
            done(e)
        }
    });

    it('should have an empty object', function(done) {
        try{
            let fake = {
                addParameters: parameterBuilder
            };

            fake.addParameters();
            
            assert(fake.parameters);
            assert.deepStrictEqual(fake.parameters, {});
            done(null);
        }
        catch(e){
            done(e);
        }
    });

    it('should have an object with parameters', function(done) {        
        try{
            let fake = {
                addParameters: parameterBuilder
            };
            fake.addParameters()
                    .name('p1').value(1)
                    .name('p2').value(1).type('number')
                    .name('p3').value(1).direction('IN')
                    .name('p4').value(1).type('number').direction('IN');

            assert(fake.parameters);
            assert.deepStrictEqual(Object.keys(fake.parameters), ['p1', 'p2', 'p3', 'p4']);
            assert.deepStrictEqual(fake.parameters.p1, {val: 1});
            assert.deepStrictEqual(fake.parameters.p2, {val: 1, type: 'number'});
            assert.deepStrictEqual(fake.parameters.p3, {val: 1, dir: 'IN'});
            assert.deepStrictEqual(fake.parameters.p4, {val: 1, type: 'number', dir: 'IN'});
            done(null);
        }
        catch(e){
            done(e);
        }
    });
});
