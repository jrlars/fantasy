var express = require('express');
var app = express();
var path = require('path');

var mysql = require('mysql');
var exec = require('child_process').exec;
var child;

app.use(express.static('public'));



var responseJSON;


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/page.html'));
});

app.get('/players', function(req, res) {
    res.sendFile(path.join(__dirname + '/players.html'));
});

app.get('/script.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/script.js'));
});

app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style/style.css'));
});

// app.get('/qbs', function(req, res) {
//
// 	scrapeDBqbs(res);
//
// });

app.get('/wrs', function(req, res) {
  //console.log(req.query);
  //console.log(req.query.sort);
	scrapeDBwrs(res, req.query.num, req.query.scoring, req.query.sort, req.query.week);

});

app.get('/rbs', function(req, res) {
  //console.log(req.query);
  //console.log(req.query.sort);
	scrapeDBrbs(res, req.query.num, req.query.scoring, req.query.sort, req.query.week);

});

app.get('/tes', function(req, res) {
  //console.log(req.query);
  //console.log(req.query.sort);
	scrapeDBtes(res, req.query.num, req.query.scoring, req.query.sort, req.query.week);

});



app.get('/getpoints', function(req, res) {

  //console.log("HI");
  //console.log(req.query.sort);
  getPointsRequest(res, req.query.teamabb, req.query.num, req.query.scoring, req.query.sort, req.query.week);
  //res.send('id: ' + req.query.teamabb);

});

// var scrapeDBqbs = function(res) {
//
// 	var connection = mysql.createConnection({
// 		host     : 'localhost',
// 		user     : 'root',
// 		password : 'root',
// 		database : 'scrape',
// 		port     : '8889'
// 	});
//
// 	connection.connect();
//
// 	var querystring = "SELECT * FROM wk4qbs ORDER BY standardPoints DESC limit 5";
//
// 	connection.query(querystring, function(err, results, fields) {
// 		if (err) throw err;
//
// 		res.setHeader('Content-Type', 'application/json');
// 		res.json ( (results) );
// 		responseJSON = results;
//     //console.log(responseJSON);
// 	});
//
// 	connection.end();
// }

// var scrapeDBwrs = function(res, numPlayers, scoringType, sortTemp) {
//
// 	var connection = mysql.createConnection({
// 		host     : 'localhost',
// 		user     : 'root',
// 		password : 'root',
// 		database : 'scrape',
// 		port     : '8889'
// 	});
//
// 	connection.connect();
//
// 	var querystring = "SELECT * FROM wk4wrs ORDER BY " + sortTemp + " DESC limit " + numPlayers;
//   //console.log(querystring);
// 	connection.query(querystring, function(err, results, fields) {
// 		if (err) throw err;
//
// 		res.setHeader('Content-Type', 'application/json');
// 		res.json ( (results) );
// 		responseJSON = results;
//
// 	});
//
// 	connection.end();
// }
//
//
// var scrapeDBwrs = function(res, numPlayers, scoringType, sortTemp) {
//
// 	var connection = mysql.createConnection({
// 		host     : 'localhost',
// 		user     : 'root',
// 		password : 'root',
// 		database : 'scrape',
// 		port     : '8889'
// 	});
//
// 	connection.connect();
//
// 	var querystring = "SELECT * FROM wk4wrs ORDER BY " + sortTemp + " DESC limit " + numPlayers;
//   //console.log(querystring);
// 	connection.query(querystring, function(err, results, fields) {
// 		if (err) throw err;
//
// 		res.setHeader('Content-Type', 'application/json');
// 		res.json ( (results) );
// 		responseJSON = results;
//
// 	});
//
// 	connection.end();
// }



var scrapeDBwrs = function(res, numPlayers, scoringType, sortTemp, weekNum) {

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'scrape',
		port     : '8889'
	});

	connection.connect();

	var querystring = "SELECT * FROM wk"+weekNum+"players WHERE position='WR' ORDER BY " + sortTemp + " DESC limit " + numPlayers;

	connection.query(querystring, function(err, results, fields) {
		if (err) throw err;

		res.setHeader('Content-Type', 'application/json');
		res.json ( (results) );
		responseJSON = results;

	});

	connection.end();
}





var scrapeDBrbs = function(res, numPlayers, scoringType, sortTemp, weekNum) {

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'scrape',
		port     : '8889'
	});

	connection.connect();

	var querystring = "SELECT * FROM wk"+weekNum+"players WHERE position='RB' ORDER BY " + sortTemp + " DESC limit " + numPlayers;

	connection.query(querystring, function(err, results, fields) {
		if (err) throw err;

		res.setHeader('Content-Type', 'application/json');
		res.json ( (results) );
		responseJSON = results;

	});

	connection.end();
}



var scrapeDBtes = function(res, numPlayers, scoringType, sortTemp, weekNum) {

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'scrape',
		port     : '8889'
	});

	connection.connect();

	var querystring = "SELECT * FROM wk"+weekNum+"players WHERE position='TE' ORDER BY " + sortTemp + " DESC limit " + numPlayers;

	connection.query(querystring, function(err, results, fields) {
		if (err) throw err;

		res.setHeader('Content-Type', 'application/json');
		res.json ( (results) );
		responseJSON = results;

	});

	connection.end();
}




var getPointsRequest = function(res, teamVar, numPlayers, scoring, sort, weekNum) {

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'scrape',
		port     : '8889'
	});

	connection.connect();

  //console.log(teamVar);

  var querystring2 = "SELECT SUM(attempts) FROM wk"+weekNum+"players WHERE team='"+ teamVar + "' AND (position='QB' OR position='TE' OR position='WR' OR position='RB') ORDER BY " + sort + " DESC LIMIT " + numPlayers;
  //console.log(querystring);
  var teamAttempts;
	connection.query(querystring2, function(err, results, fields) {
		if (err) throw err;

    for (var key in results[0]) {
        var tempResultObj = results[0];
    }
    teamAttempts = tempResultObj[key];

		// responseJSON = results;
    // console.log(responseJSON);
	});





	//var querystring = "SELECT SUM(standardPoints) FROM wk4players WHERE team='"+ teamVar + "' AND position IN ('TE', 'WR', 'RB')";
  var querystring = "SELECT SUM(" + scoring + ") FROM wk"+weekNum+"players WHERE team='"+ teamVar + "' AND (position='TE' OR position='WR' OR position='RB')";
  //console.log(querystring);

	connection.query(querystring, function(err, results, fields) {
		if (err) throw err;

    for (var key in results[0]) {
        var tempResultObj = results[0];
    }
    var totalTeamPoints = tempResultObj[key];

    var responseTeamPoints = {"teamP":totalTeamPoints, "teamA":teamAttempts};

		res.setHeader('Content-Type', 'application/json');
		res.json ( responseTeamPoints );
		// responseJSON = results;
    // console.log(responseJSON);
	});

	connection.end();
}







app.listen(8080);
