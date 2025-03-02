// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
    const date = req.params.date;
    const regex = /^[0-9]+$/;
    var isUnix = regex.test(date);
    var isNan = isNaN(Date.parse(date));
    if (date == null) {
        var unix = new Date().getTime();
        var utc = new Date(unix).toUTCString();
    } else if (isNan && !isUnix) {
        res.json({ error: "Invalid Date" });
    } else {
        if (!isUnix) {
            var unix = Date.parse(date);
            var utc = new Date(unix).toUTCString()
        } else {
            var unix = parseInt(date);
            var utc = new Date(unix).toUTCString();
        }
    }
    res.json({ 'unix': unix, 'utc': utc });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});