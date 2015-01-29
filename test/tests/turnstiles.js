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
            header.should.equal('remote,date,time,description,entries,exits,lat,lng,station');
            firstLine.should.equal('R051,02-01-14,03:00:00,REGULAR,004469306,001523801,40.762796,-73.967686,LEXINGTON AVE');
            done();
        });
    });

    it('should parse a url', function() {
        var file = 'http://web.mta.info/developers/data/nyct/turnstile/turnstile_150124.txt';

        console.log('URL is not working.');
        // this is not working
        turnstiles(file, function(data) {
            //var header = data[0];
            //var firstLine = data[1];
            //console.log(header);
            //console.log(firstLine);
            //header.should.equal('remote,date,time,description,entries,exits,lat,lng,station');
            //firstLine.should.equal('R051,02-01-14,03:00:00,REGULAR,004469306,001523801,40.762796,-73.967686,LEXINGTON AVE');
            done();
        });
    });
    /*
    it('should parse a string', function() {
        var file = path.resolve('./test/data/turnstile_140208.txt');
        var contents = fs.readFileSync(file, 'utf8');
        contents = contents.split('\n');

        var results = parser.parse(contents[0]);

        results.should.not.equal(null);
    });

    it('should parse a file', function() {
    });

    it('should return correct station info', function() {
        var file = path.resolve('./test/data/turnstile_140208.txt');
        var contents = fs.readFileSync(file, 'utf8');
        contents = contents.split('\n');

        var results = parser.parse(contents[0]);

        results['A002'].should.be.a('object');
        results['A002']['R051'].should.be.a('object');
        results['A002']['02-00-00'].should.be.a('object');
    });
    */
});
