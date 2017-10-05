var WEEK = 1;
var YEAR = 2016;
var tableName = "nflPlayers";

var request = require("request"),
  	cheerio = require("cheerio");

   	var qb1 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of qb urls
   	var qb2 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	var qb3 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
    var qb4 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
    var qb5 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
    var qb6 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=250";
    var qb7 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=300";
    var qb8 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=350";
    var qb9 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=400";
    var qb10 = "http://games.espn.com/ffl/leaders?slotCategoryId=0&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=450";

    var rb1 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of rb urls
   	var rb2 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	var rb3 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
    var rb4 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
    var rb5 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
    var rb6 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=250";
    var rb7 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=300";
    var rb8 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=350";
    var rb9 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=400";
    var rb10 = "http://games.espn.com/ffl/leaders?slotCategoryId=2&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=450";

    var wr1 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of wr urls
   	var wr2 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	var wr3 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
    var wr4 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
    var wr5 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
    var wr6 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=250";
    var wr7 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=300";
    var wr8 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=350";
    var wr9 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=400";
    var wr10 = "http://games.espn.com/ffl/leaders?slotCategoryId=4&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=450";

    var te1 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR; //start of te urls
   	var te2 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=50";
   	var te3 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=100";
    var te4 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=150";
    var te5 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=200";
    var te6 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=250";
    var te7 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=300";
    var te8 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=350";
    var te9 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=400";
    var te10 = "http://games.espn.com/ffl/leaders?slotCategoryId=6&scoringPeriodId=" + WEEK + "&seasonId=" + YEAR + "&startIndex=450";

    var urls=[qb1, qb2, qb3, qb4, qb5, qb6, qb7, qb8, qb9, qb10, rb1, rb2, rb3, rb4, rb5, rb6, rb7, rb8, rb9, rb10, wr1, wr2, wr3, wr4, wr5, wr6, wr7, wr8, wr9, wr10, te1, te2, te3, te4, te5, te6, te7, te8, te9, te10];

var fs = require('fs');

var mysql = require('mysql')
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'scrape',
//     port     : '8889'
//   });

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...');
// })


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

var playerNames = [];
var playerIDs = [];



for(var j=0; j<urls.length ;j++){

	request(urls[j], function (error, response, body) {
	if (!error) {

        var $ = cheerio.load(body);

        // var name = $(".playerTableTable .playertablePlayerName a").html();
        // var playerID = $(".playerTableTable .playertablePlayerName a").attr("playerid");
        // console.log(name + " " + playerID);

        // $(".playerTableTable .playertablePlayerName a").each(function(index){
        //     var name = $(this).html();
        // })

        $(".playertablePlayerName").each(function( index ) {

            var player =$( this ).text();
            var playerNameStart = 0;
            var playerNameEnd = player.indexOf(",");

            if((player.indexOf("*")!==-1)&&(player.indexOf("*")<playerNameEnd)){
            	playerNameEnd = player.indexOf("*");
            }


            //var playerTeam = player.replace(/^[^,]*, ([a-zA-Z]*)[ ]*([a-zA-Z]*).*/gi, "$1");

            //var playerPosition = player.replace(/^[^,]*, [a-zA-Z]*\s*([a-zA-Z]*).*/gi, "$1");

            //teamArr.push(playerTeam);
            //positionArr.push(playerPosition);

            var name = player.substr(playerNameStart, playerNameEnd);

            var childrenNodes = $(this).children("a");
            var playerID = $(childrenNodes[0]).attr("playerid");

            console.log(name + " " + playerID);
            //arr.push(newPlayer);

            playerNames.push(name);
            playerIDs.push(parseInt(playerID));

            playerNum++;
            //console.log(playerNum);
		});

        console.log(j);
        console.log("playerNum " + playerNum);
















	// 	$(".pncPlayerRow").each(function( index ) {
      //
    //         var opponent = $(this).find("td:nth-child(3)>div>a").html();
    //         var location = "home";
    //         if(!opponent){
    //             //console.log("TIM TEBOW");
    //             opponent = "NULL";
    //         }
    //         if(opponent.includes("@")){
    //             //console.log(opponent);
    //             location = "away";
    //             opponent = opponent.substr((opponent.indexOf("@")+1), opponent.length);
    //         }
    //         //console.log(opponent);
    //         opponents.push(opponent);
    //         homeAway.push(location);
      //
	// 		var passingRatio = $(this).find("td:nth-child(6)").html();
      //
	// 		var completions = passingRatio.replace(/^([0-9]*)\/([0-9]*)/, "$1");
	// 		var attempts = passingRatio.replace(/^([0-9]*)\/([0-9]*)/, "$2");
      //
	// 		if(isNaN(completions) || completions==""){
	// 			completions = "NULL";
	// 		}
	// 		completionsArray.push(completions);
      //
	// 		if(isNaN(attempts) || attempts==""){
	// 			attempts = "NULL";
	// 		}
	// 		attemptsArray.push(attempts);
      //
      //
	// 		var passingYardsVar = $(this).find("td:nth-child(7)").html();
    //   if(passingYardsVar[0]=="-"){
    //     if(passingYardsVar[1]=="-"){
    //       //console.log("BYE WEEK");
    //     }else{
    //       console.log("Negative Passer");
    //       passingYardsVarTemp = passingYardsVar.substr(1,passingYardsVar.length);
    //       //console.log(passingYardsVarTemp);
    //       passingYardsVar = (passingYardsVarTemp * (-1));
    //     }
    //   }
	// 		if(isNaN(passingYardsVar) || passingYardsVar==""){
	// 			passingYardsVar = "NULL";
	// 		}
	// 		passingYards.push(passingYardsVar);
      //
      //
	// 		var passingTouchdownsVar = $(this).find("td:nth-child(8)").html();
	// 		if(isNaN(passingTouchdownsVar) || passingTouchdownsVar==""){
	// 			passingTouchdownsVar = "NULL";
	// 		}
	// 		passingTouchdowns.push(passingTouchdownsVar);
      //
      //
	// 		var interceptionsVar = $(this).find("td:nth-child(9)").html();
	// 		if(isNaN(interceptionsVar) || interceptionsVar==""){
	// 			interceptionsVar = "NULL";
	// 		}
	// 		interceptions.push(interceptionsVar);
      //
      //
      //
	// 		var rushesVar = $(this).find("td:nth-child(11)").html();
	// 		if(isNaN(rushesVar) || rushesVar==""){
	// 			rushesVar = "NULL";
	// 		}
	// 		rushes.push(rushesVar);
      //
      //
	// 		var rushingYardsVar = $(this).find("td:nth-child(12)").html();
    //   if(rushingYardsVar[0]=="-"){
    //     if(rushingYardsVar[1]=="-"){
    //       //console.log("BYE WEEK");
    //     }else{
    //       console.log("Negative Rusher");
    //       rushingYardsVarTemp = rushingYardsVar.substr(1,rushingYardsVar.length);
    //       //console.log(rushingYardsVarTemp);
    //       rushingYardsVar = (rushingYardsVarTemp * (-1));
    //     }
    //   }
    //         //console.log(rushingYardsVar);
	// 		if(isNaN(rushingYardsVar) || rushingYardsVar==""){
	// 			rushingYardsVar = "NULL";
	// 		}
	// 		rushingYards.push(rushingYardsVar);
      //
      //
	// 		var rushingTouchdownsVar = $(this).find("td:nth-child(13)").html();
	// 		if(isNaN(rushingTouchdownsVar) || rushingTouchdownsVar==""){
	// 			rushingTouchdownsVar = "NULL";
	// 		}
	// 		rushingTouchdowns.push(rushingTouchdownsVar);
      //
      //
      //
	// 		var receptionsVar = $(this).find("td:nth-child(15)").html();
	// 		if(isNaN(receptionsVar) || receptionsVar==""){
	// 			receptionsVar = "NULL";
	// 		}
	// 		receptions.push(receptionsVar);
      //
      //
	// 		var receivingYardsVar = $(this).find("td:nth-child(16)").html();
    //   if(receivingYardsVar[0]=="-"){
    //     if(receivingYardsVar[1]=="-"){
    //       //console.log("BYE WEEK");
    //     }else{
    //       console.log("Negative Receiver");
    //       receivingYardsVarTemp = receivingYardsVar.substr(1,receivingYardsVar.length);
    //       //console.log(receivingYardsVarTemp);
    //       receivingYardsVar = (receivingYardsVarTemp * (-1));
    //     }
    //   }
	// 		if(isNaN(receivingYardsVar) || receivingYardsVar==""){
	// 			receivingYardsVar = "NULL";
	// 		}
	// 		receivingYards.push(receivingYardsVar);
      //
      //
	// 		var receivingTouchdownsVar = $(this).find("td:nth-child(17)").html();
	// 		if(isNaN(receivingTouchdownsVar) || receivingTouchdownsVar==""){
	// 			receivingTouchdownsVar = "NULL";
	// 		}
	// 		receivingTouchdowns.push(receivingTouchdownsVar);
      //
      //
	// 		var targetsVar = $(this).find("td:nth-child(18)").html();
	// 		if(isNaN(targetsVar) || targetsVar==""){
	// 			targetsVar = "NULL";
	// 		}
    //   // if(isNaN(targets)){
    //   //   console.log("Is an integer");
    //   // }else{
    //   //   console.log("Isn't an integer");
    //   // }
	// 		targets.push(targetsVar);
      //
      //
      //
	// 		var twopcVar = $(this).find("td:nth-child(20)").html();
	// 		if(isNaN(twopcVar) || twopcVar==""){
	// 			twopcVar = "NULL";
	// 		}
	// 		twopc.push(twopcVar);
      //
      //
	// 		var fumblesVar = $(this).find("td:nth-child(21)").html();
	// 		if(isNaN(fumblesVar) || fumblesVar==""){
	// 			fumblesVar = "NULL";
	// 		}
	// 		fumbles.push(fumblesVar);
      //
      //
	// 		var miscTouchdownsVar = $(this).find("td:nth-child(22)").html();
	// 		if(isNaN(miscTouchdownsVar) || miscTouchdownsVar==""){
	// 			miscTouchdownsVar = "NULL";
	// 		}
	// 		miscTouchdowns.push(miscTouchdownsVar);
      //
      //
      //
	// 		var standardPointsVar = $(this).find("td:nth-child(24)").html();
	// 		var halfPprPointsVar;
	// 		var pprPointsVar;
	// 		if(isNaN(standardPointsVar) || standardPointsVar==""){
	// 			standardPointsVar = "NULL";
	// 			halfPprPointsVar = standardPointsVar;
	// 			pprPointsVar = standardPointsVar;
	// 		}else{
	// 			if(isNaN(receptionsVar) || receptionsVar==""){
	// 				halfPprPointsVar = "NULL";
	// 				pprPointsVar = "NULL";
	// 			}else{
	// 				halfPprPointsVar = (parseInt(standardPointsVar) + (parseInt(receptionsVar)/2));
	// 				pprPointsVar = (parseInt(standardPointsVar) + (parseInt(receptionsVar)));
	// 			}
	// 		}
	// 		standardPoints.push(standardPointsVar);
      //
	// 		if((isNaN(halfPprPointsVar) || halfPprPointsVar=="") && halfPprPointsVar!==0){
	// 			halfPprPointsVar = "NULL";
	// 		}
	// 		halfPprPoints.push(halfPprPointsVar);
      //
	// 		if((isNaN(pprPointsVar) || pprPointsVar=="") && pprPointsVar!==0){
	// 			pprPointsVar = "NULL";
	// 		}
	// 		pprPoints.push(pprPointsVar);
      //
	// 	});


	  } else {
		console.log("We’ve encountered an error: " + error);
	  }
	});
}

// setTimeout(function(){
// 	for(var i=0; i<playerNum-1;i++){
//         connection.query('INSERT INTO ' + tableName + ' (playerName, position, team, year, week, opponent, homeAway, completions, attempts, passingYards, passingTouchdowns, interceptions, rushes, rushingYards, rushingTouchdowns, receptions, receivingYards, receivingTouchdowns, targets, twopc, fumbles, miscTouchdown, standardPoints, halfPprPoints, pprPoints) VALUES ("' + arr[i] + '","' + positionArr[i] + '","' + teamArr[i] + '",' + YEAR + ',' + WEEK + ',"' + opponents[i] + '","' + homeAway[i] + '",' + completionsArray[i] + ',' + attemptsArray[i] + ',' + passingYards[i] + ',' + passingTouchdowns[i] + ',' + interceptions[i] + ','  + rushes[i] + ','  + rushingYards[i] + ','  + rushingTouchdowns[i] + ','  + receptions[i] + ','  + receivingYards[i] + ','  + receivingTouchdowns[i] + ','  + targets[i] + ','  + twopc[i] + ','  + fumbles[i] + ','  + miscTouchdowns[i] + ','  + standardPoints[i] + ',' + halfPprPoints[i] + ',' + pprPoints[i] + ') ON DUPLICATE KEY UPDATE playerName=playerName',function(err,rows){
//           if(err) throw err;
//     	});
// 	}
// }, 10000);

// setTimeout(function(){
// 	fs.writeFile('output.json', JSON.stringify(obj, null, 4), function(err){
// 		console.log('File successfully written! - Check your project directory for the output.json file');
// 	})
// }, 8000);

// setTimeout(function(){
// 		connection.end(function(err) {
// 		  // The connection is terminated gracefully
// 		  // Ensures all previously enqueued queries are still
// 		  // before sending a COM_QUIT packet to the MySQL server.
// 		});
// }, 20000);
