require('chai').should();
var path = require('path');
var fs = require('fs');

var turnstileStream = require(path.resolve('./lib/streams/turnstile'));

describe('Turnstile Stream', function() {
  // wait for 10 seconds. datasets be big.

  describe('parseLine', function() {
    var parseLine = turnstileStream.prototype.parseLine;
    it('should process the old format, without a header', function(done) {
      var file = fs.readFileSync(path.resolve('./test/data/turnstile_140208.txt'), { encoding : 'utf8' });
      var line = file.split('\n')[0];

      var contents = [];
      parseLine(line, function(response) {
        contents.push(response);

        if ( contents.length === 8 ) {
          contents[0].remote.should.equal('R051');
          contents[0].date.should.equal('02-01-14');
          contents[0].time.should.equal('03:00:00');
          done();
        }
      });

    });

    it.only('should process the new format, with a header', function(done) {

      var file = fs.readFileSync(path.resolve('./test/data/turnstile_150124.txt'), { encoding : 'utf8' });
      var lines = file.split('\n').slice(1,7); // get rid of header

      var contents = [];
      lines.map(function(line) {
        parseLine(line, function(response) {
          contents.push(response);
          if ( contents.length === 6 ) {
            end();
          }
        });
      });

      function end() {
        contents[0].remote.should.equal('R051');
        contents[0].date.should.equal('01/17/2015');
        contents[0].time.should.equal('03:00:00');
        contents[0].linename.should.equal('NQR456');
        done();
      };

    });
  });


});
