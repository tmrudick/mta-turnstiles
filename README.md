MTA Turnstile Data Parser
=========================

The [MTA](http://new.mta.info/) had a weekly snapshot of the entrances and exits for every transit turnstile in the city of New York.

It is in a bit of strange format and doesn't really lend itself well to visualizationg or further processing.

This project converts the data into an easily digestable format with location data added.

Installation
------------

    npm install -g mta-turnstiles

Install without the `-g` flag to use in custom scripts.

Output Format
-------------

The output format is still a csv but contains a line for each individual reading with the station latitude and longitude added.

    remote,date,time,description,entries,exits,lat,lng,station
    R051,12-07-13,03:00:00,REGULAR,004393839,001499552,40.762796,-73.967686,LEXINGTON AVE
    R051,12-07-13,07:00:00,REGULAR,004393850,001499567,40.762796,-73.967686,LEXINGTON AVE
    R051,12-07-13,11:00:00,REGULAR,004393929,001499660,40.762796,-73.967686,LEXINGTON AVE

Usage
-----

### Command Line

    mta-turnstiles <url of weekly snapshot>

A list of snapshots can be found [here](http://www.mta.info/developers/turnstile.html).

You can also specify the `-f` flag with a filename to output directly to a file.

### Node

    var turnstiles = require('mta-turnstiles');

    turnstiles('http://www.mta.info/developers/data/nyct/turnstile/turnstile_131214.txt').pipe(process.stdout);

You can also use this module with a callback if you aren't into streams.

    turnstiles('http://www.mta.info/developers/data/nyct/turnstile/turnstile_131214.txt', function(data) {
        console.log(data);
    });

You can also specify a local file.

    turnstiles('/path/to/file/turnstile_131214.txt', function(data) {
        console.log(data);
    });

You can specify an optional list of options like so:

    turnstiles('/path/to/file/turnstile_131214.txt', function(data) {
        console.log(data);
    }, { header: false });

The only option at this point is 'header', which if set to false will output data without header.
Issues
------

Report any issues via the issue tracker for this project.
