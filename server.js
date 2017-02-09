var express = require('express');
var request = require('request');
const API_KEY = "a17db91bc77bfdd0d14b4053c5cc0a51";
var app = express();
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/partials", express.static(__dirname + '/partials'));
app.use("/lib", express.static(__dirname + '/lib'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/index', function (req, res) {
    res.sendfile('index.html');
});

app.get('/getStyles', function (req, res) {
    request('https://api.brewerydb.com/v2/styles/?key=' + API_KEY, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    });
});

app.get('/searchBeer', function (req, res) {
    request('https://api.brewerydb.com/v2/search/?q=' + req.query.searchText + '&key=' + API_KEY, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        if (response.statusCode === 200) {
            res.send(body);
        }
    });
});

function buildQueryString(params){
     let queryString = "";
    if(params.abvMin && params.abvMax){
        queryString += "&abv=" + params.abvMin + "," + params.abvMax;
    }else if(params.abvMin){
        queryString += "&abv=" + params.abvMin;
    }else if(params.abvMax){
        queryString += "&abv=" + params.abvMax;
    }
    
    if(params.ibuMin && params.ibuMax){
        queryString += "&ibu=" + params.ibuMin + "," + params.ibuMax;
    }else if(params.ibuMin){
        queryString += "&ibu=" + params.ibuMin;
    }else if(params.ibuMax){
        queryString += "&ibu=" + params.ibuMax;
    }
    
    if(params.styleId){
         queryString += "&styleId=" + params.styleId;
    }
    
    return queryString;
}

app.get('/getAllBeers', function (req, res) {
   
    let queryString = buildQueryString(req.query);
    request('https://api.brewerydb.com/v2/beers/?key=' + API_KEY + queryString, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        if (response.statusCode === 200) {
            res.send(body);
        }
    });
});

app.listen(3000);
console.log('Server running on port %d', 3000);