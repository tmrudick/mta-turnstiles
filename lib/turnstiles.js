var fs = require('fs'),
    path = require('path'),
    request = require('request');

function turnstiles(url, options, callback) {
    if (arguments.length < 2) {
        throw new Error('Must specify both url and callback');
    }

    if (typeof(options) === 'function') {
        callback = options;
        options = {};
    }

    // Set default options
    options = options || {};
    options.stations = options.stations || 'http://mta.info/developers/data/nyct/subway/StationEntrances.csv';
    options.cummulative = options.cummulative || true;

    var stations, turnstiles;

    // Download stations data
    request(options.stations, function(error, response, body) {
        if (error) { throw new Error(error); }
        parseTurnstileData(turnstiles, stations, options, callback);
    });

    // Download the actual turnstile data
    request(url, function(error, response, body) {
        if (error) { throw new Error(error); }
        parseTurnstileData(turnstiles, stations, options, callback);
    })
}

function parseTurnstileData(turnstiles, stations, options, callback) {
    // Make sure that we have both pieces of data
    if (!turnstiles || !stations) { return; }

    // Convert both to objects
    turnstiles = parseTurnstiles(turnstiles);
    stations = parseCsv(stations);

    // Merge
}

function parseTurnstiles(turnstiles, cummulative) {
    turnstiles = turnstiles.split('\n');
    var result = [];

    turnstiles.forEach(function(line) {
        line = line.split(',');
        var ca = line.shift(),
            unit = line.shift(),
            scp = line.shift(),
            offset = 0,
            reading;

        while (line.length > 0) {
            reading = {
                date: line.shift(),
                time: line.shift(),
                description: line.shift(),
                entries: line.shift(),
                exits: line.shift();
            };

            result.push(reading);
        }
    });

    return result;
}

function parseCsv(csv) {
    if (typeof(csv) === 'string') {
        csv = csv.split('\n');
    }

    var result = [];

    // Get the header row
    var headers = csv.shift().split(',');

    csv.forEach(function(line) {
        line = line.split(',');

        row = {};
        headers.forEach(function(header, idx) {
            row[header] = line[idx];
        });

        result.push(row);
    });

    return result;
}

module.exports = {
    turnstiles: turnstiles
};