var TurnstileStream = require('./streams/turnstile'),
    StationStream = require('./streams/station'),
    CsvStream = require('./streams/csv'),
    request = require('request');

var fs = require('fs');
module.exports = function(url, callback) {
    var stream = request(url)
                    .pipe(TurnstileStream())
                    .pipe(StationStream())
                    .pipe(CsvStream());

    if (callback) {
        var content = '';
        stream.on('data', function(data) { content += data; console.log('content'); });
        stream.on('end', function() { console.log('end'); callback(content); });
    }

    return stream;
};
