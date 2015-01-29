var TurnstileStream = require('./streams/turnstile'),
    StationStream = require('./streams/station'),
    CsvStream = require('./streams/csv'),
    request = require('request');

var fs = require('fs');
module.exports = function(path, callback) {
    var stream;
    if ( fs.existsSync(path) ) {
        stream = fs.createReadStream(path)
                    .pipe(TurnstileStream())
                    .pipe(StationStream())
                    .pipe(CsvStream());
    } else {
        stream = request(path)
                    .pipe(TurnstileStream())
                    .pipe(StationStream())
                    .pipe(CsvStream());
    }

    if (callback) {
        var content = '';
        stream.on('data', function(data) {
            content += data;
        });
        stream.on('end', function() {
            callback(content);
        });
    }

    return stream;
};
