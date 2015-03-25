var util = require('util');
var Transform = require('stream').Transform;
util.inherits(TurnstileStream, Transform);

var HEADER = 'C/A,UNIT,SCP,STATION,LINENAME,DIVISION,DATE,TIME,DESC,ENTRIES,EXITS';
function parseLine(line, callback) {
  var line = line.split(',');

  var format = getFormat(line);

  var ca = line.shift(),
  remote = line.shift(),
  scp = line.shift();

  if ( format === 'v1' ) {
    while (line.length > 0) {
      callback({
        remote: remote,
        station: '',
        linename: '',
        division: '',
        date: line.shift(),
        time: line.shift(),
        description: line.shift(),
        entries: line.shift(),
        exits: line.shift().trim()
      });
    }
  } else if ( format === 'v2' ) {
    // check that this is not a header
    if ( line.join(',').indexOf('STATION,LINENAME,DIVISION') === -1 ) {
      while (line.length > 0) {

        callback({
          remote: remote,
          station: line.shift(),
          linename: line.shift(),
          division: line.shift(),
          date: line.shift(),
          time: line.shift(),
          description: line.shift(),
          entries: line.shift(),
          exits: line.shift().trim()
        });
      }
    }

  }
}

function getFormat(row) {
  if ( row.length === 43 ) {
    return 'v1';
  } else if ( row.length === 11 ) {
    return 'v2';
  }
};

function TurnstileStream() {
  if (!(this instanceof TurnstileStream)) {
    return new TurnstileStream();
  }

  Transform.call(this, { objectMode: true});
}

module.exports = TurnstileStream;

TurnstileStream.prototype._transform = function(chunk, encoding, done) {
  var self = this,
  data = chunk.toString();

  // Add any half completed bytes
  if (this._buffer) {
    data = this._buffer + data;
  }

  var turnstiles = data.split('\n');

  // Remove the last line since it may not be completed
  this._buffer = turnstiles.pop();

  turnstiles.forEach(function(turnstile) {
    parseLine(turnstile, self.push.bind(self));
  });


  done();
};

TurnstileStream.prototype._flush = function(done) {
  if (this._buffer) {
    parseLine(this._buffer, this.push.bind(this));
  }

  this._buffer = null;
  done();
};

// for testing
TurnstileStream.prototype.parseLine = parseLine;
TurnstileStream.prototype.getFormat = getFormat;
