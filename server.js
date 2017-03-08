var express = require('express');
var pug = require('pug');
var path = require('path');


var app = express();

var port = process.env.PORT || 3000;
app.set('view engine', 'pug');

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/*', function (req, res){

  //get the date from user get request
  var timestamp = req.params[0];
  //set up the array for identyfiing months, varaible d for date object
  //and the defoult null response values;
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var d;
  var unix = null;
  var natural = null;

  if (Number(timestamp)){
    unix = timestamp;
    d = new Date(timestamp*1000);
  }
  else {
    timestamp = Date.parse(timestamp + "UTC");
    d = new Date(timestamp);
    unix = d/1000;
  }

  //get the date form date object
  var m = d.getMonth();
  var day = d.getDate();
  var year = d.getFullYear();
  //fill the response values with the date if some form of date was given.
  //if user didn't cooparete leave date as null
  if(m || day || year) {
    natural = monthNames[m] + " " + day + ", " + year;
  }

  //object to be returned
  var resO = {
    'unix': unix,
    'natural': natural,
  };
  res.send(resO);
  });

app.listen(port);
