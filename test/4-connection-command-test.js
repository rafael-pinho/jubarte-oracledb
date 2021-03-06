let connectionCommand = require('../lib/statement/connectionCommand.js'),
    fake = {connection: {}};

describe('connection command', function() {
    
    it('should call commit', function(done) {
        try{
            fake.connection.commit = () => {
                done();
            }
            fake.commit = connectionCommand.commit;
            fake.commit();
        }
        catch(e){
            done(e);
        }
    });

    it('should call roolback', function(done) {
        try{
            fake.connection.roolback = () => {
                done();
            }
            fake.roolback = connectionCommand.roolback;
            fake.roolback();
        }
        catch(e){
            done(e);
        }
    });

    it('should call done', function(done) {
        try{
            fake.connection.close = () => {
                done();
            }
            fake.done = connectionCommand.done;
            fake.done();
        }
        catch(e){
            done(e);
        }
    });
});
