var util = require('util');
var Transform = require('stream').Transform;
util.inherits(CsvStream, Transform);

function CsvStream() {
  if (!(this instanceof CsvStream)) {
    return new CsvStream();
  }

  Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
}

module.exports = CsvStream;

CsvStream.prototype._transform = function(reading, encoding, done) {
  if (!this._headers) {
    this._headers = Object.keys(reading);
    this.push(this._headers.join(',') + '\n');
  }

  var row = '';

  this._headers.forEach(function(header) {
    row += ',' + reading[header];
  });

  this.push(row.substring(1) + '\n');

  done();
};