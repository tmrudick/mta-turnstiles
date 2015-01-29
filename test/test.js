require('chai').should();
var parser = require('../lib/parser');
var path = require('path');
var fs = require('fs');

describe('Parser', function() {
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
});
