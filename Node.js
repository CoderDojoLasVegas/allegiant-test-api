// Allegiant Air APIs
// ----------------
// These APIs provide the data necessary to complete your UX challenge.

// The following operations are supported on this resource:
// * `GET`



// The following resources are part of this group:
// * /airlines
// * /airports
// * /allegiantRoutes
// * /scheduleFromDate
// * /scheduleToDate
// * /weather
// * /newsFromKeyword
// * /flickrFromKeyword
// * /flickrStaticImgUrl
// * /hotels






var express = require('express');

var http = require("http");
var url = require("url");
var fs = require('fs');
var querystring = require("querystring");
var parseString = require('xml2js').parseString;
var options = {};
var urlString = {};
var postData = {};



// Base URI:
// ----------------
// http://localhost:8080
var app = express();
var server = http.createServer(app).listen(8080);




app.use(function(req, res, next) {
    res.header("Content-Type", "text/plain");

    urlString = {
        pathname: req.path,
        queryparam: req.query
    };

    next();
});




// Airlines API: `/airlines`
// ----------------
// The Airlines API provides basic reference data about one or more airlines.

app.get('/airlines', function(req, res, next) {
    http = require("https");
    options = {
        /*remove protocol from url*/
        host:"api.flightstats.com",
        path:"/flex/airlines/rest/v1/json/active?appId=0980daa7&appKey=7c87bd8cc1bd7d46d633f4d944cd7d8d",
        dataType:"json",
        method:"GET"
    };

    next();
});



// Airports API: `/airports`
// ----------------
// The Airports API provides basic reference data about one or more airports.

app.get('/airports', function(req, res, next) {
    http = require("https");
    options = {
        /*remove protocol from url*/
        host:"api.flightstats.com",
        path:"/flex/airports/rest/v1/json/countryCode/US?appId=0980daa7&appKey=7c87bd8cc1bd7d46d633f4d944cd7d8d",
        dataType:"json",
        method:"GET"
    };

    next();
});



// Allegiant Seasonal Flights API: `/allegiantRoutes`
// ----------------
// The Allegiant Seasonal Flights API provides Allegiant route information. Origins and destinations are returned by the airport code.

app.get('/allegiantRoutes', function(req, res, next) {

    fs.readFile('./allegiant_flights.json', 'utf8', function (err,data) {
        if (err) { console.error(err); }

        var store = data;
        console.log(store);

        // JSONP support
        // ----------------
        // Wraps json object in callback.
        if (urlString.queryparam.callback && urlString.queryparam.callback != '?') {
            store = store.replace(/'/g, "\\'");
            jsonp_store = urlString.queryparam.callback + "('" + store + "');";
            store = jsonp_store;
        }

        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.write(store);
        res.end();
    });
});



// Departing Flight Schedules API: `/scheduleFromDate`
// ----------------
// The Schedules API offers information on future scheduled flights, departing on the given date.

// PARAMETERS
// * `departureAirportCode`	The code of the departing airport.
// * `arrivalAirportCode`	The code of the arrival airport.
// * `year`					Four-digit year of departure date.
// * `month`				Month (1 to 12) of the departure date.
// * `day`					Day of month of the departure date.

app.get('/scheduleFromDate', function(req, res, next) {
    http = require("https");
    departureAirportCode = encodeURIComponent(urlString.queryparam.departureAirportCode);
    arrivalAirportCode = encodeURIComponent(urlString.queryparam.arrivalAirportCode);
    year = encodeURIComponent(urlString.queryparam.year);
    month = encodeURIComponent(urlString.queryparam.month);
    day = encodeURIComponent(urlString.queryparam.day);

    options = {
        /*remove protocol from url*/
        host:"api.flightstats.com",
        path:"/flex/schedules/rest/v1/json/from/"+departureAirportCode+"/to/"+arrivalAirportCode+"/departing/"+year+"/"+month+"/"+day+"?appId=0980daa7&appKey=7c87bd8cc1bd7d46d633f4d944cd7d8d",
        dataType:"json",
        method:"GET"
    };

    next();
});



// Arriving Flight Schedules API: `/scheduleToDate`
// ----------------
// The Schedules API offers information on future scheduled flights, arriving on the given date.

// PARAMETERS
// * `departureAirportCode`	The code of the departing airport.
// * `arrivalAirportCode`	The code of the arrival airport.
// * `year`					Four-digit year of departure date.
// * `month`				Month (1 to 12) of the departure date.
// * `day`					Day of month of the departure date.

app.get('/scheduleToDate', function(req, res, next) {
    http = require("https");
    departureAirportCode = encodeURIComponent(urlString.queryparam.departureAirportCode);
    arrivalAirportCode = encodeURIComponent(urlString.queryparam.arrivalAirportCode);
    year = encodeURIComponent(urlString.queryparam.year);
    month = encodeURIComponent(urlString.queryparam.month);
    day = encodeURIComponent(urlString.queryparam.day);

    options = {
        /*remove protocol from url*/
        host:"api.flightstats.com",
        path:"/flex/schedules/rest/v1/json/from/"+departureAirportCode+"/to/"+arrivalAirportCode+"/arriving/"+year+"/"+month+"/"+day+"?appId=0980daa7&appKey=7c87bd8cc1bd7d46d633f4d944cd7d8d",
        dataType:"json",
        method:"GET"
    };

    next();
});



// Weather API: `/weather`
// ----------------
// The Weather API returns weather information for the given airport.

// PARAMETERS
// * `airport`	The code of the airport.

app.get('/weather', function(req, res, next) {
    http = require("https");
    airport = encodeURIComponent(urlString.queryparam.airport);

    options = {
        /*remove protocol from url*/
        host:"api.flightstats.com",
        path:"/flex/weather/rest/v1/json/all/"+airport+"?appId=0980daa7&appKey=7c87bd8cc1bd7d46d633f4d944cd7d8d",
        dataType:"json",
        method:"GET"
    };

    next();
});



// News API: `/newsFromKeyword`
// ----------------
// The News API returns headlines pertaining to the given keyword.

// PARAMETERS
// * `p`	The keyword you want to search for.

app.get('/newsFromKeyword', function(req, res, next) {
    http = require("https");
    p = encodeURIComponent(urlString.queryparam.p);

    options = {
        /*remove protocol from url*/
        host:"news.search.yahoo.com",
        path:"/news/rss?p="+p+"&c=&eo=UTF-8",
        dataType:"XML",
        method:"GET"
    };

    next();
});



// Flickr API: `/flickrFromKeyword`
// ----------------
// The Flickr API returns images and relative information tagged with the given keyword.

// PARAMETERS
// * `tags`	The tag you want to search for.

app.get('/flickrFromKeyword', function(req, res, next) {
    http = require("http");
    tags = encodeURIComponent(urlString.queryparam.tags);

    options = {
        /*remove protocol from url*/
        host:"api.flickr.com",
        path:"/services/feeds/photos_public.gne?tags="+tags,
        dataType:"XML",
        method:"GET"
    };

    next();
});



// Flickr Static Image API: `/flickrStaticImgUrl`
// ----------------
// The Flickr Static Image API removes the standard Flickr protection code and returns a URL of just the static image.

// PARAMETERS
// * `url`	The url of the image of which you are wanting the static version.

app.get('/flickrStaticImgUrl', function(req, res, next) {

    flickrUrl = urlString.queryparam.url;
    var photoID = flickrUrl.match(/\/photos\/(.*)/)[1].split('/')[1];
    postData = querystring.stringify({'photo_id':photoID});

    var flickrReq = http.request({
        host: 'www.flickr.com',
        port: 80,
        path: '/services/rest/?method=flickr.photos.getInfo&format=json&api_key=a66ae3b787a9d02a3da0f2b63ac621be',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, function(response) {
        var flickrStore = '';

        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            flickrStore += chunk;
        });

        response.on('end', function() {
            flickrStore = flickrStore.replace('jsonFlickrApi(', '');
            flickrStore = flickrStore.replace(/\)(?=[^.]*$)/, '');
            flickrStore = JSON.parse(flickrStore);
            flickrStore = 'http://farm'+flickrStore.photo.farm+'.static.flickr.com/'+flickrStore.photo.server+'/'+photoID+'_'+flickrStore.photo.secret+'.jpg';

            // JSONP support
            // ----------------
            // Wraps json object in callback.
            if (urlString.queryparam.callback && urlString.queryparam.callback != '?') {
                jsonp_store = urlString.queryparam.callback + "('" + flickrStore + "');";
                flickrStore = jsonp_store;
            }

            res.write(flickrStore);
            console.log(flickrStore);
            res.end();

        })
    });

    flickrReq.write(postData);
    flickrReq.end();

});



// Hotel API: `/hotels`
// ----------------
// The Hotel API returns a list of hotels and relative information based on a given location.

// PARAMETERS
// * `city`	            The city you wish to search for hotels in.
// * `state`	        The state (abbreviation: NV) you wish to search for hotels in.
// * `arrivalMonth`	    The month of the date when you would potentially check-in to the hotel.
// * `arrivalDay`	    The day of the date when you would potentially check-in to the hotel.
// * `arrivalYear`	    The year of the date when you would potentially check-in to the hotel.
// * `departureMonth`	The month of the date when you would potentially check-out to the hotel.
// * `departureDay`	    The day of the date when you would potentially check-out to the hotel.
// * `departureYear`	The year of the date when you would potentially check-out to the hotel.
// * `numOfResults`	    The number of results you want returned.

app.get('/hotels', function(req, res, next) {
    http = require("https");
    city = encodeURIComponent(urlString.queryparam.city);
    state = encodeURIComponent(urlString.queryparam.state);
    arrivalMonth = encodeURIComponent(urlString.queryparam.arrivalMonth);
    arrivalDay = encodeURIComponent(urlString.queryparam.arrivalDay);
    arrivalYear = encodeURIComponent(urlString.queryparam.arrivalYear);
    departureMonth = encodeURIComponent(urlString.queryparam.departureMonth);
    departureDay = encodeURIComponent(urlString.queryparam.departureDay);
    departureYear = encodeURIComponent(urlString.queryparam.departureYear);
    numOfResults = encodeURIComponent(urlString.queryparam.numOfResults);

    options = {
        /*remove protocol from url*/
        host:"api.eancdn.com",
        path:"/ean-services/rs/hotel/v3/list?cid=55505&minorRev=99&apiKey=emsqfvp7bxw2najqprquswcd&locale=en_US&currencyCode=USD&xml=<HotelListRequest>%0A%20%20%20%20<city>" + city + "<%2Fcity>%0A%20%20%20%20<stateProvinceCode>" + state + "<%2FstateProvinceCode>%0A%20%20%20%20<countryCode>US<%2FcountryCode>%0A%20%20%20%20<arrivalDate>" + arrivalMonth + "%2F" + arrivalDay + "%2F" + arrivalYear + "<%2FarrivalDate>%0A%20%20%20%20<departureDate>" + departureMonth + "%2F" + departureDay + "%2F" + departureYear + "<%2FdepartureDate>%0A%20%20%20%20<RoomGroup>%0A%20%20%20%20%20%20%20%20<Room>%0A%20%20%20%20%20%20%20%20%20%20%20%20<numberOfAdults>2<%2FnumberOfAdults>%0A%20%20%20%20%20%20%20%20<%2FRoom>%0A%20%20%20%20<%2FRoomGroup>%0A%20%20%20%20<numberOfResults>" + numOfResults + "<%2FnumberOfResults>%0A<%2FHotelListRequest>",
        dataType:"XML",
        method:"GET"
    };

    next();
});



app.use(function(req, res) {
    var store = " ";

    http.request(options, function(response) {
        response.on('data', function(chunk) {
            store += chunk;
        });
        response.on('error', function(e) {
            console.log(e);
        });

        response.on('end', function() {
            if (options.dataType=="XML") {
                parseString(store, function (err, result) {
                    if (err) { console.error(err); }
                    if (result!=undefined) {
                        store = typeof result === 'object' ? JSON.stringify(result) : result;
                    }
                });
            }

            // JSONP support
            // ----------------
            // Wraps json object in callback.
            if (urlString.queryparam.callback && urlString.queryparam.callback != '?') {
                jsonp_store = urlString.queryparam.callback + "(" + store + ");";
                store = jsonp_store;
            }

            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.write(store);
            res.end();
        });


    }).end();
});



