var util = require('util');
var Transform = require('stream').Transform;
util.inherits(StationStream, Transform);

function StationStream() {
  if (!(this instanceof StationStream)) {
    return new StationStream();
  }

  Transform.call(this, { objectMode: true });
}

module.exports = StationStream;

StationStream.prototype._transform = function(reading, encoding, done) {
  // TODO: Add station information to reading

  this.push(reading);

  done();
};