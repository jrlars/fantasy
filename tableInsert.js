var WEEK = 3;
var YEAR = 2017;
var tableName = "allPlayers";

var request = require("request"),
  	cheerio = require("cheerio"),
   	url1 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of QB urls
   	url2 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	url3 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
    url4 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of RB urls
   	url5 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	url6 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
   	url7 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
   	url8 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
    url9 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of WR urls
   	url10 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	url11 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
   	url12 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
   	url13 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
   	url14 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=250";
    url15 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=300";
    url16 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of TE urls
   	url17 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	url18 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
   	url19 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
    urls = [url1, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11, url12, url13, url14, url15, url16, url17, url18, url19];
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
  console.log('You are now connected...');
})

// connection.query('INSERT INTO '+ tableName + '(playerName varchar(255) NOT NULL, position varchar(255) NOT NULL, year int NOT NULL, week int NOT NULL, team varchar(255) NOT NULL, completions int, attempts int, passingYards int, passingTouchdowns int, interceptions int, rushes int, rushingYards int, rushingTouchdowns int, receptions int, receivingYards int, receivingTouchdowns int, targets int, twopc int, fumbles int, miscTouchdown int, standardPoints int, halfPprPoints float(1), pprPoints int, PRIMARY KEY (playerName, year, week, team));',function(err,rows){
//   if(err) throw err;
//
//   console.log('Database Created\n');
// });

var playerData;
var positionArr = [];
var teamArr = [];
var arr = [];

var opponents = [];
var homeAway = [];

var completionsArray = [];
var attemptsArray = [];
var passingYards = [];
var passingTouchdowns = [];
var interceptions = [];

var rushes = [];
var rushingYards = [];
var rushingTouchdowns = [];

var receptions = [];
var receivingYards = [];
var receivingTouchdowns = [];
var targets = [];

var twopc = [];
var fumbles = [];
var miscTouchdowns = [];
var standardPoints = [];
var halfPprPoints = [];
var pprPoints = [];

var playerNum = 1;


for(var j=0; j<urls.length ;j++){

	request(urls[j], function (error, response, body) {
	  if (!error) {

	  var $ = cheerio.load(body);

		var name = $(".playerTableTable .playertablePlayerName a").html();

		$(".playertablePlayerName").each(function( index ) {

		  var player =$( this ).text();
		  var playerNameStart = 0;
		  var playerNameEnd = player.indexOf(",");
		  //console.log(player.indexOf("*"));
		  if((player.indexOf("*")!==-1)&&(player.indexOf("*")<playerNameEnd)){
		  	playerNameEnd = player.indexOf("*");
		  }

      // var playerTeam = player.replace(/^[^,]*, ([a-zA-Z]*).*/, "$1");
      //console.log(player);
      var playerTeam = player.replace(/^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/gi, "$1");
      //console.log(player);
      //console.log(playerTeam + " is playerTeam");

      //console.log(playerTeam);
      var playerPosition = player.replace(/^[^,]*, [a-zA-Z]*\s*([a-zA-Z]*).*/gi, "$1");
    //  console.log(player);
      //console.log(playerPosition + " is playerPosition");
      //console.log(name);
      //console.log(playerPosition);


      //console.log(playerPosition);
		  //playerTeam = playerTeam.toUpperCase();
		  //teamArr.push(playerTeam);

      //var matches = player.exec(/^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/gi);


      // var regexpattern = /^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/gi;
      // var matches = regexpattern.exec(player);
      // console.log(matches[2]);


      //var playerTeam = player.replace(/^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/, "$1");
      //var playerTeam = matches[0];
      //console.log(playerTeam);
      //var playerPosition = matches[1];
      //console.log(playerPosition);
      //var playerPosition = player.replace(/^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/, "$2");

		  //playerTeam = playerTeam.toUpperCase();
      //playerPosition = playerPosition.toUpperCase();
      //var playerPosition = "failed";
		  teamArr.push(playerTeam);
      positionArr.push(playerPosition);

		  var newPlayer = player.substr(playerNameStart, playerNameEnd);
		  arr.push(newPlayer);

// 		  var playerVal = "player" + playerNum;
//
// 		  obj[playerVal] = newPlayer;


		  playerNum++;
		  //console.log(playerNum);
		});

		$(".pncPlayerRow").each(function( index ) {

            var opponent = $(this).find("td:nth-child(3)>div>a").html();
            var location = "home";
            if(!opponent){
                //console.log("TIM TEBOW");
                opponent = "NULL";
            }
            if(opponent.includes("@")){
                //console.log(opponent);
                location = "away";
                opponent = opponent.substr((opponent.indexOf("@")+1), opponent.length);
            }
            //console.log(opponent);
            opponents.push(opponent);
            homeAway.push(location);

			var passingRatio = $(this).find("td:nth-child(6)").html();

			var completions = passingRatio.replace(/^([0-9]*)\/([0-9]*)/, "$1");
			var attempts = passingRatio.replace(/^([0-9]*)\/([0-9]*)/, "$2");

			if(isNaN(completions) || completions==""){
				completions = "NULL";
			}
			completionsArray.push(completions);

			if(isNaN(attempts) || attempts==""){
				attempts = "NULL";
			}
			attemptsArray.push(attempts);


			var passingYardsVar = $(this).find("td:nth-child(7)").html();
      if(passingYardsVar[0]=="-"){
        if(passingYardsVar[1]=="-"){
          //console.log("BYE WEEK");
        }else{
          console.log("Negative Passer");
          passingYardsVarTemp = passingYardsVar.substr(1,passingYardsVar.length);
          //console.log(passingYardsVarTemp);
          passingYardsVar = (passingYardsVarTemp * (-1));
        }
      }
			if(isNaN(passingYardsVar) || passingYardsVar==""){
				passingYardsVar = "NULL";
			}
			passingYards.push(passingYardsVar);


			var passingTouchdownsVar = $(this).find("td:nth-child(8)").html();
			if(isNaN(passingTouchdownsVar) || passingTouchdownsVar==""){
				passingTouchdownsVar = "NULL";
			}
			passingTouchdowns.push(passingTouchdownsVar);


			var interceptionsVar = $(this).find("td:nth-child(9)").html();
			if(isNaN(interceptionsVar) || interceptionsVar==""){
				interceptionsVar = "NULL";
			}
			interceptions.push(interceptionsVar);



			var rushesVar = $(this).find("td:nth-child(11)").html();
			if(isNaN(rushesVar) || rushesVar==""){
				rushesVar = "NULL";
			}
			rushes.push(rushesVar);


			var rushingYardsVar = $(this).find("td:nth-child(12)").html();
      if(rushingYardsVar[0]=="-"){
        if(rushingYardsVar[1]=="-"){
          //console.log("BYE WEEK");
        }else{
          console.log("Negative Rusher");
          rushingYardsVarTemp = rushingYardsVar.substr(1,rushingYardsVar.length);
          //console.log(rushingYardsVarTemp);
          rushingYardsVar = (rushingYardsVarTemp * (-1));
        }
      }
            //console.log(rushingYardsVar);
			if(isNaN(rushingYardsVar) || rushingYardsVar==""){
				rushingYardsVar = "NULL";
			}
			rushingYards.push(rushingYardsVar);


			var rushingTouchdownsVar = $(this).find("td:nth-child(13)").html();
			if(isNaN(rushingTouchdownsVar) || rushingTouchdownsVar==""){
				rushingTouchdownsVar = "NULL";
			}
			rushingTouchdowns.push(rushingTouchdownsVar);



			var receptionsVar = $(this).find("td:nth-child(15)").html();
			if(isNaN(receptionsVar) || receptionsVar==""){
				receptionsVar = "NULL";
			}
			receptions.push(receptionsVar);


			var receivingYardsVar = $(this).find("td:nth-child(16)").html();
      if(receivingYardsVar[0]=="-"){
        if(receivingYardsVar[1]=="-"){
          //console.log("BYE WEEK");
        }else{
          console.log("Negative Receiver");
          receivingYardsVarTemp = receivingYardsVar.substr(1,receivingYardsVar.length);
          //console.log(receivingYardsVarTemp);
          receivingYardsVar = (receivingYardsVarTemp * (-1));
        }
      }
			if(isNaN(receivingYardsVar) || receivingYardsVar==""){
				receivingYardsVar = "NULL";
			}
			receivingYards.push(receivingYardsVar);


			var receivingTouchdownsVar = $(this).find("td:nth-child(17)").html();
			if(isNaN(receivingTouchdownsVar) || receivingTouchdownsVar==""){
				receivingTouchdownsVar = "NULL";
			}
			receivingTouchdowns.push(receivingTouchdownsVar);


			var targetsVar = $(this).find("td:nth-child(18)").html();
			if(isNaN(targetsVar) || targetsVar==""){
				targetsVar = "NULL";
			}
      // if(isNaN(targets)){
      //   console.log("Is an integer");
      // }else{
      //   console.log("Isn't an integer");
      // }
			targets.push(targetsVar);



			var twopcVar = $(this).find("td:nth-child(20)").html();
			if(isNaN(twopcVar) || twopcVar==""){
				twopcVar = "NULL";
			}
			twopc.push(twopcVar);


			var fumblesVar = $(this).find("td:nth-child(21)").html();
			if(isNaN(fumblesVar) || fumblesVar==""){
				fumblesVar = "NULL";
			}
			fumbles.push(fumblesVar);


			var miscTouchdownsVar = $(this).find("td:nth-child(22)").html();
			if(isNaN(miscTouchdownsVar) || miscTouchdownsVar==""){
				miscTouchdownsVar = "NULL";
			}
			miscTouchdowns.push(miscTouchdownsVar);



			var standardPointsVar = $(this).find("td:nth-child(24)").html();
			var halfPprPointsVar;
			var pprPointsVar;
			if(isNaN(standardPointsVar) || standardPointsVar==""){
				standardPointsVar = "NULL";
				halfPprPointsVar = standardPointsVar;
				pprPointsVar = standardPointsVar;
			}else{
				if(isNaN(receptionsVar) || receptionsVar==""){
					halfPprPointsVar = "NULL";
					pprPointsVar = "NULL";
				}else{
					halfPprPointsVar = (parseInt(standardPointsVar) + (parseInt(receptionsVar)/2));
					pprPointsVar = (parseInt(standardPointsVar) + (parseInt(receptionsVar)));
				}
			}
			standardPoints.push(standardPointsVar);

			if((isNaN(halfPprPointsVar) || halfPprPointsVar=="") && halfPprPointsVar!==0){
				halfPprPointsVar = "NULL";
			}
			halfPprPoints.push(halfPprPointsVar);

			if((isNaN(pprPointsVar) || pprPointsVar=="") && pprPointsVar!==0){
				pprPointsVar = "NULL";
			}
			pprPoints.push(pprPointsVar);

		});


	  } else {
		console.log("We’ve encountered an error: " + error);
	  }
	});
}

setTimeout(function(){
	//console.log(playerNum);
	for(var i=0; i<playerNum-1;i++){


    connection.query('INSERT INTO ' + tableName + ' (playerName, position, team, year, week, opponent, homeAway, completions, attempts, passingYards, passingTouchdowns, interceptions, rushes, rushingYards, rushingTouchdowns, receptions, receivingYards, receivingTouchdowns, targets, twopc, fumbles, miscTouchdown, standardPoints, halfPprPoints, pprPoints) VALUES ("' + arr[i] + '","' + positionArr[i] + '","' + teamArr[i] + '",' + YEAR + ',' + WEEK + ',"' + opponents[i] + '","' + homeAway[i] + '",' + completionsArray[i] + ',' + attemptsArray[i] + ',' + passingYards[i] + ',' + passingTouchdowns[i] + ',' + interceptions[i] + ','  + rushes[i] + ','  + rushingYards[i] + ','  + rushingTouchdowns[i] + ','  + receptions[i] + ','  + receivingYards[i] + ','  + receivingTouchdowns[i] + ','  + targets[i] + ','  + twopc[i] + ','  + fumbles[i] + ','  + miscTouchdowns[i] + ','  + standardPoints[i] + ',' + halfPprPoints[i] + ',' + pprPoints[i] + ') ON DUPLICATE KEY UPDATE playerName=playerName',function(err,rows){
      //connection.query('INSERT INTO wk' + WEEK + 'players ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)');
      //console.log(playerName);
      if(err) throw err;
      //connection.query('INSERT INTO `lastPosition` SET ? ON DUPLICATE KEY UPDATE Lat=VALUES(Lat), Lon=VALUES(Lon), Time=VALUES(Time)', result);
		});


    //WORKED BEFORE MONTGOMERY
    // connection.query('INSERT INTO wk' + WEEK + 'players (playerName, position, team, year, week, completions, attempts, passingYards, passingTouchdowns, interceptions, rushes, rushingYards, rushingTouchdowns, receptions, receivingYards, receivingTouchdowns, targets, twopc, fumbles, miscTouchdown, standardPoints, halfPprPoints, pprPoints) VALUES ("' + arr[i] + '","' + positionArr[i] + '","' + teamArr[i] + '",' + 2016 + ',' + WEEK + ',' + completionsArray[i] + ',' + attemptsArray[i] + ',' + passingYards[i] + ',' + passingTouchdowns[i] + ',' + interceptions[i] + ','  + rushes[i] + ','  + rushingYards[i] + ','  + rushingTouchdowns[i] + ','  + receptions[i] + ','  + receivingYards[i] + ','  + receivingTouchdowns[i] + ','  + targets[i] + ','  + twopc[i] + ','  + fumbles[i] + ','  + miscTouchdowns[i] + ','  + standardPoints[i] + ',' + halfPprPoints[i] + ',' + pprPoints[i] + ')',function(err,rows){
		//   if(err) throw err;
		// });

	}
}, 10000);

// setTimeout(function(){
// 	fs.writeFile('output.json', JSON.stringify(obj, null, 4), function(err){
// 		console.log('File successfully written! - Check your project directory for the output.json file');
// 	})
// }, 8000);

setTimeout(function(){
		connection.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
		});
}, 20000);
