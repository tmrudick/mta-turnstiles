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
    reading.lat = this.stations[reading.remote].latitude;
    reading.lng = this.stations[reading.remote].longitude;
    reading.station = this.stations[reading.remote].station;
  }

  this.push(reading);

  done();
};
