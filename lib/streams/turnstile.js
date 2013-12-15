var util = require('util');
var Transform = require('stream').Transform;
util.inherits(TurnstileStream, Transform);

function parseLine(line, callback) {
  var line = line.split(',');

  var ca = line.shift(),
      unit = line.shift(),
      scp = line.shift();

  while (line.length > 0) {
    callback({
      unit: unit,
      date: line.shift(),
      time: line.shift(),
      description: line.shift(),
      entries: line.shift(),
      exits: line.shift().trim()
    });
  }
}

function TurnstileStream() {
  if (!(this instanceof TurnstileStream)) {
    return new TurnstileStream();
  }

  Transform.call(this, { objectMode: true});
}

module.exports = TurnstileStream;

TurnstileStream.prototype._transform = function(chunk, encoding, done) {
  var self = this;

  var data = chunk.toString();

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
};