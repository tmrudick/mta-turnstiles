var TurnstileStream = require('./streams/turnstile'),
    StationStream = require('./streams/station'),
    CsvStream = require('./streams/csv'),
    request = require('request'),
    fs = require('fs');

module.exports = function(path, callback) {
    console.info('begin parsing');
    var stream;
    if ( fs.existsSync(path) ) {
        stream = fs.createReadStream(path)
                    .pipe(TurnstileStream())
                    .pipe(StationStream())
                    .pipe(CsvStream());
    } else {
        stream = request.get(path)
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
        stream.on('error', function(err) {
            console.error('error', err);
        });
    }

    return stream;
};
