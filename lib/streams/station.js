var util = require('util');
var Transform = require('stream').Transform;
util.inherits(StationStream, Transform);

function StationStream() {
  if (!(this instanceof StationStream)) {
    return new StationStream();
  }

  this.stations = require('../../data/stations.json');

  Transform.call(this, { objectMode: true });
}

module.exports = StationStream;

StationStream.prototype._transform = function(reading, encoding, done) {
  // TODO: Add station information to reading

  if (this.stations[reading.remote]) {
    reading.Lat = this.stations[reading.remote].latitude;
    reading.Lng = this.stations[reading.remote].longitude;
  }

  this.push(reading);

  done();
};
