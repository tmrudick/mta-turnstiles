require('chai').should();
var path = require('path');

var turnstiles = require(path.resolve('./lib/turnstiles'));

describe('turnstiles', function() {
    // wait for 10 seconds. datasets be big.
    this.timeout(10000);

    it('should parse a file', function(done) {
        var file = path.resolve('./test/data/turnstile_140208.txt');
        turnstiles(file, function(data) {
            data = data.split('\n');
            var header = data[0];
            var firstLine = data[1];
            header.should.equal('remote,date,time,description,entries,exits,lat,lng,station');
            firstLine.should.equal('R051,02-01-14,03:00:00,REGULAR,004469306,001523801,40.762796,-73.967686,LEXINGTON AVE');
            done();
        });
    });

    it('should parse a file with a header', function(done) {
        var file = path.resolve('./test/data/turnstile_150124.txt');
        turnstiles(file, function(data) {
            data = data.split('\n');
            var header = data[0];
            var firstLine = data[1];
            header.should.equal('remote,station,linename,division,date,time,description,entries,exits,lat,lng');
            firstLine.should.equal('R051,LEXINGTON AVE,NQR456,BMT,01/17/2015,03:00:00,REGULAR,0004964844,0001682142,40.762796,-73.967686');
            done();
        });
    });

    it('should parse a url', function(done) {
        // wait for 30 seconds. online datasets be REALLY big.
        this.timeout(30000);
        var file = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_150124.txt';

        turnstiles(file, function(data) {
            data = data.split('\n');
            var header = data[0];
            var firstLine = data[1];
            header.should.equal('remote,station,linename,division,date,time,description,entries,exits,lat,lng');
            firstLine.should.equal('R051,LEXINGTON AVE,NQR456,BMT,01/17/2015,03:00:00,REGULAR,0004964844,0001682142,40.762796,-73.967686');
            done();
        });
    });
});
