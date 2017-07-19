var WEEK = 1;

var request = require("request"),
  cheerio = require("cheerio"),
   url2 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=4&seasonId=2016",
  url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + "chicago";
var fs = require('fs');


var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'scrape',
    port     : '8889'
  });

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})



connection.query('DROP TABLE wk' + WEEK + 'players',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');

});

connection.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
