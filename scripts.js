var year = 2016;

//you're stupid and this is actually weeks-1, or what's the difference between from and to in your query
var weeks = 16;
//week is the LAST WEEK YOU HAVE SCORES FOR
var week = 17;
var maxWeek = 17;

// var mostPoints = 32;
// var mostReceptions = 18;


// var wantLabels = true;
var wantLabels = 0;
var floorCeiling = 1;

var dbDone = 0;
var tdbDone = 0;

var dataArr;
var byeArr;
var dataCast;

var targetQuery;

var generic = 0;
var NUMPLAYERS = 50;
var SCORINGTYPE = "standardPoints";
var SORTEDBY = "standardPoints";
var loadBool = true;
// var POSITION = "RB' OR position='WR";
var POSITION1 = "RB";
var POSITION2 = "";
var POSITION3 = "";
var positionText = "RBs";
var POSITIONNUM = 0;
var WEEK = 1;

var maxValArr = [];

var pageLoadNum = 0;



    var dataPull;


    function castTargets(inArr){
        var tempObj = {};

        for(var i=0;i<inArr.length;i++){
            var tempTeam = inArr[i];
            var teamName = tempTeam.team.toString();
            var uppercaseTeamName = teamName.toUpperCase();
            var tempTargets = tempTeam.targets;
            tempObj[uppercaseTeamName] = tempTargets;
        }
        return tempObj;
    }

    function castResults(inArr){
        var tempArr = [];

        var pointsArr = [];
        var targetsArr = [];
        var recsArr = [];
        var recYardsArr = [];
        var rushesArr = [];
        var rushYardsArr = [];
        var touchdownsArr = [];

        for(var z=0;z<inArr.length;z++){
            pointsArr.push(parseInt(inArr[z].standardPoints));
            targetsArr.push(parseInt(inArr[z].targets));
            recsArr.push(parseInt(inArr[z].receptions));
            recYardsArr.push(parseInt(inArr[z].receivingYards));
            rushesArr.push(parseInt(inArr[z].rushes));
            rushYardsArr.push(parseInt(inArr[z].rushingYards));
            touchdownsArr.push(parseInt(inArr[z].receivingTouchdowns) + parseInt(inArr[z].rushingTouchdowns) + parseInt(inArr[z].miscTouchdown));
        }
        tempArr.points = pointsArr;
        tempArr.targets = targetsArr;
        tempArr.recs = recsArr;
        tempArr.recYards = recYardsArr;
        tempArr.rushes = rushesArr;
        tempArr.rushYards = rushYardsArr;
        tempArr.touchdowns = touchdownsArr;

        return tempArr;
    }

    function castPlayerInfo(inArr){
        var tempPlayerInfo = inArr;
        for(var z=0;z<playerInfo.length;z++){
            playerInfo[z].attempts = parseInt(tempPlayerInfo[z].attempts);
            playerInfo[z].completions = parseInt(tempPlayerInfo[z].completions);
            playerInfo[z].fumbles = parseInt(tempPlayerInfo[z].fumbles);
            playerInfo[z].halfPprPoints = parseFloat(tempPlayerInfo[z].halfPprPoints);
            playerInfo[z].interceptions = parseInt(tempPlayerInfo[z].interceptions);
            playerInfo[z].miscTouchdown = parseInt(tempPlayerInfo[z].miscTouchdown);
            playerInfo[z].passingTouchdowns = parseInt(tempPlayerInfo[z].passingTouchdowns);
            playerInfo[z].passingYards = parseInt(tempPlayerInfo[z].passingYards);
            playerInfo[z].pprPoints = parseInt(tempPlayerInfo[z].pprPoints);
            playerInfo[z].receivingTouchdowns = parseInt(tempPlayerInfo[z].receivingTouchdowns);
            playerInfo[z].receivingYards = parseInt(tempPlayerInfo[z].receivingYards);
            playerInfo[z].receptions = parseInt(tempPlayerInfo[z].receptions);
            playerInfo[z].rushes = parseInt(tempPlayerInfo[z].rushes);
            playerInfo[z].rushingTouchdowns = parseInt(tempPlayerInfo[z].rushingTouchdowns);
            playerInfo[z].rushingYards = parseInt(tempPlayerInfo[z].rushingYards);
            playerInfo[z].standardPoints = parseInt(tempPlayerInfo[z].standardPoints);
            playerInfo[z].targets = parseInt(tempPlayerInfo[z].targets);
            playerInfo[z].twopc = parseInt(tempPlayerInfo[z].twopc);
            playerInfo[z].week = parseInt(tempPlayerInfo[z].week);
            playerInfo[z].year = parseInt(tempPlayerInfo[z].year);
        }
        return playerInfo;
    }



    function createArray(input){
        var output = [];

        var currentPlayer = "";
        var currentObject = {};

        var currentStats = [];

        var currentPoints = [];
        var currentTargets = [];
        var currentRecs = [];
        var currentRecYards = [];
        var currentRushes = [];
        var currentRushYards = [];
        var currentTouchdowns = [];

        var startWeek = (week-weeks);
        var endWeek = week;
        var tempWeek = startWeek;
        console.log(startWeek + " startweek");
        console.log(endWeek + " endweek");
        //var tempPlayer = input[0].playerName;
        var tempPlayer = "";
        var byeFlag = 0;

        for(var i=0; i<input.length;i++){

            var currentOpponent = input[i].opponent;
            var currentWeek = input[i].week;

            ///////// BYE
            ///////// LOGIC

            if(input[i].playerName!=tempPlayer){
                tempPlayer = input[i].playerName;
                tempWeek = startWeek;
            }

            if(currentWeek!=(tempWeek+"")){
                //BYE WEEK LOGIC
                byeFlag = 1;
            }

            if(i<=((input.length)-2)){
                if(input[(i+1)].playerName!=tempPlayer){
                    //next is first week of next player - need to check for last week bye
                    if(currentWeek!=week){
                        byeFlag = 2;
                    }
                }
            }else if(i==input.length-1){
                if(currentWeek!=week){
                    byeFlag = 2;
                }
            }

            if(byeFlag==1){
                var byeWeek = {"val":0,"vs":"BYE","week":(""+tempWeek)};
            }else if(byeFlag==2){
                var byeWeek = {"val":0,"vs":"BYE","week":(""+(week))};
            }

            ///////// END
            ///////// BYE
            ///////// LOGIC


            if(input[i].playerName == currentPlayer){

                if(byeFlag==1){
                    var tempPoint = {val: 0, vs: "BYE", week: tempWeek};
                    currentPoints.push(tempPoint);

                    var tempTarget = {val: 0, vs: "BYE", week: tempWeek};
                    currentTargets.push(tempTarget);

                    var tempRec = {val: 0, vs: "BYE", week: tempWeek};
                    currentRecs.push(tempRec);

                    var tempRecYard = {val: 0, vs: "BYE", week: tempWeek};
                    currentRecYards.push(tempRecYard);

                    var tempRush = {val: 0, vs: "BYE", week: tempWeek};
                    currentRushes.push(tempRush);

                    var tempRushYard = {val: 0, vs: "BYE", week: tempWeek};
                    currentRushYards.push(tempRushYard);

                    var tempTouchdown = {val: 0, vs: "BYE", week: tempWeek};
                    currentTouchdowns.push(tempTouchdown);
                }


                var tempPoint = {val: parseInt(input[i].standardPoints), vs: currentOpponent, week: currentWeek};
                currentPoints.push(tempPoint);

                var tempTarget = {val: parseInt(input[i].targets), vs: currentOpponent, week: currentWeek};
                currentTargets.push(tempTarget);

                var tempRec = {val: parseInt(input[i].receptions), vs: currentOpponent, week: currentWeek};
                currentRecs.push(tempRec);

                var tempRecYard = {val: parseInt(input[i].receivingYards), vs: currentOpponent, week: currentWeek};
                currentRecYards.push(tempRecYard);

                var tempRush = {val: parseInt(input[i].rushes), vs: currentOpponent, week: currentWeek};
                currentRushes.push(tempRush);

                var tempRushYard = {val: parseInt(input[i].rushingYards), vs: currentOpponent, week: currentWeek};
                currentRushYards.push(tempRushYard);

                var tempTouchdown = {val: (parseInt(input[i].receivingTouchdowns) + parseInt(input[i].rushingTouchdowns) + parseInt(input[i].miscTouchdown)), vs: currentOpponent, week: currentWeek};
                currentTouchdowns.push(tempTouchdown);

                if(byeFlag==2){
                    var tempPoint = {val: 0, vs: "BYE", week: week};
                    currentPoints.push(tempPoint);

                    var tempTarget = {val: 0, vs: "BYE", week: week};
                    currentTargets.push(tempTarget);

                    var tempRec = {val: 0, vs: "BYE", week: week};
                    currentRecs.push(tempRec);

                    var tempRecYard = {val: 0, vs: "BYE", week: week};
                    currentRecYards.push(tempRecYard);

                    var tempRush = {val: 0, vs: "BYE", week: week};
                    currentRushes.push(tempRush);

                    var tempRushYard = {val: 0, vs: "BYE", week: week};
                    currentRushYards.push(tempRushYard);

                    var tempTouchdown = {val: 0, vs: "BYE", week: week};
                    currentTouchdowns.push(tempTouchdown);
                }


                if((i+1)==input.length){
                    var sortedPoints = currentPoints.slice(0);
                    sortedPoints.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedTargets = currentTargets.slice(0);
                    sortedTargets.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRecs = currentRecs.slice(0);
                    sortedRecs.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRecYards = currentRecYards.slice(0);
                    sortedRecYards.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRushes = currentRushes.slice(0);
                    sortedRushes.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRushYards = currentRushYards.slice(0);
                    sortedRushYards.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedTouchdowns = currentTouchdowns.slice(0);
                    sortedTouchdowns.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });



                    var tempPoints = {stat:"Points", maxVal: d3.max(dataCast.points)};
                    tempPoints.values = sortedPoints;
                    maxValArr.push(d3.max(dataCast.points));

                    var tempTargets = {stat:"Targets", maxVal: d3.max(dataCast.targets)};
                    tempTargets.values = sortedTargets;
                    maxValArr.push(d3.max(dataCast.targets));

                    var tempRecs = {stat:"Receptions", maxVal: d3.max(dataCast.recs)};
                    tempRecs.values = sortedRecs;
                    maxValArr.push(d3.max(dataCast.recs));

                    var tempRecYards = {stat:"Receiving Yards", maxVal: d3.max(dataCast.recYards)};
                    tempRecYards.values = sortedRecYards;
                    maxValArr.push(d3.max(dataCast.recYards));

                    var tempRushes = {stat:"Rushes", maxVal: d3.max(dataCast.rushes)};
                    tempRushes.values = sortedRushes;
                    maxValArr.push(d3.max(dataCast.rushes));

                    var tempRushYards = {stat:"Rushing Yards", maxVal: d3.max(dataCast.rushYards)};
                    tempRushYards.values = sortedRushYards;
                    maxValArr.push(d3.max(dataCast.rushYards));

                    var tempTouchdowns = {stat:"Touchdowns", maxVal: d3.max(dataCast.touchdowns)};
                    tempTouchdowns.values = sortedTouchdowns;
                    maxValArr.push(d3.max(dataCast.touchdowns));

                    currentStats.push(tempPoints);
                    currentStats.push(tempTargets);
                    currentStats.push(tempRecs);
                    currentStats.push(tempRecYards);
                    currentStats.push(tempRushes);
                    currentStats.push(tempRushYards);
                    currentStats.push(tempTouchdowns);

                    currentObject.stats = currentStats;


                    output.push(currentObject);
                }

            }else{



                if(i!=0){

                    var sortedPoints = currentPoints.slice(0);
                    sortedPoints.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedTargets = currentTargets.slice(0);
                    sortedTargets.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRecs = currentRecs.slice(0);
                    sortedRecs.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRecYards = currentRecYards.slice(0);
                    sortedRecYards.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRushes = currentRushes.slice(0);
                    sortedRushes.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedRushYards = currentRushYards.slice(0);
                    sortedRushYards.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });

                    var sortedTouchdowns = currentTouchdowns.slice(0);
                    sortedTouchdowns.sort(function(x, y){
                        return d3.ascending(x.val, y.val);
                    });



                    var tempPoints = {stat:"Points", maxVal: d3.max(dataCast.points)};
                    tempPoints.values = sortedPoints;

                    var tempTargets = {stat:"Targets", maxVal: d3.max(dataCast.targets)};
                    tempTargets.values = sortedTargets;

                    var tempRecs = {stat:"Receptions", maxVal: d3.max(dataCast.recs)};
                    tempRecs.values = sortedRecs;

                    var tempRecYards = {stat:"Receiving Yards", maxVal: d3.max(dataCast.recYards)};
                    tempRecYards.values = sortedRecYards;

                    var tempRushes = {stat:"Rushes", maxVal: d3.max(dataCast.rushes)};
                    tempRushes.values = sortedRushes;

                    var tempRushYards = {stat:"Rushing Yards", maxVal: d3.max(dataCast.rushYards)};
                    tempRushYards.values = sortedRushYards;

                    var tempTouchdowns = {stat:"Touchdowns", maxVal: d3.max(dataCast.touchdowns)};
                    tempTouchdowns.values = sortedTouchdowns;

                    currentStats.push(tempPoints);
                    currentStats.push(tempTargets);
                    currentStats.push(tempRecs);
                    currentStats.push(tempRecYards);
                    currentStats.push(tempRushes);
                    currentStats.push(tempRushYards);
                    currentStats.push(tempTouchdowns);

                    currentObject.stats = currentStats;



                    output.push(currentObject);
                }


                var currentObject = {};

                var currentStats = [];

                var currentPoints = [];
                var currentTargets = [];
                var currentRecs = [];
                var currentRecYards = [];
                var currentRushes = [];
                var currentRushYards = [];
                var currentTouchdowns = [];




                currentObject.name = input[i].playerName;
                var spaceIndex = input[i].playerName.indexOf(" ");
                var playerInitials = input[i].playerName[0] + input[i].playerName[spaceIndex+1];
                currentObject.initials = playerInitials;
                currentObject.position = input[i].position;
                currentObject.team = input[i].team.toUpperCase();




                if(byeFlag==1){
                    var tempPoint = {val: 0, vs: "BYE", week: tempWeek};
                    currentPoints.push(tempPoint);

                    var tempTarget = {val: 0, vs: "BYE", week: tempWeek};
                    currentTargets.push(tempTarget);

                    var tempRec = {val: 0, vs: "BYE", week: tempWeek};
                    currentRecs.push(tempRec);

                    var tempRecYard = {val: 0, vs: "BYE", week: tempWeek};
                    currentRecYards.push(tempRecYard);

                    var tempRush = {val: 0, vs: "BYE", week: tempWeek};
                    currentRushes.push(tempRush);

                    var tempRushYard = {val: 0, vs: "BYE", week: tempWeek};
                    currentRushYards.push(tempRushYard);

                    var tempTouchdown = {val: 0, vs: "BYE", week: tempWeek};
                    currentTouchdowns.push(tempTouchdown);
                }



                var tempPoint = {val: parseInt(input[i].standardPoints), vs: currentOpponent, week: currentWeek};
                currentPoints.push(tempPoint);

                var tempTarget = {val: parseInt(input[i].targets), vs: currentOpponent, week: currentWeek};
                currentTargets.push(tempTarget);

                var tempRec = {val: parseInt(input[i].receptions), vs: currentOpponent, week: currentWeek};
                currentRecs.push(tempRec);

                var tempRecYard = {val: parseInt(input[i].receivingYards), vs: currentOpponent, week: currentWeek};
                currentRecYards.push(tempRecYard);

                var tempRush = {val: parseInt(input[i].rushes), vs: currentOpponent, week: currentWeek};
                currentRushes.push(tempRush);

                var tempRushYard = {val: parseInt(input[i].rushingYards), vs: currentOpponent, week: currentWeek};
                currentRushYards.push(tempRushYard);

                var tempTouchdown = {val: (parseInt(input[i].receivingTouchdowns) + parseInt(input[i].rushingTouchdowns) + parseInt(input[i].miscTouchdown)), vs: currentOpponent, week: currentWeek};
                currentTouchdowns.push(tempTouchdown);


                if(byeFlag==2){
                    var tempPoint = {val: 0, vs: "BYE", week: week};
                    currentPoints.push(tempPoint);

                    var tempTarget = {val: 0, vs: "BYE", week: week};
                    currentTargets.push(tempTarget);

                    var tempRec = {val: 0, vs: "BYE", week: week};
                    currentRecs.push(tempRec);

                    var tempRecYard = {val: 0, vs: "BYE", week: week};
                    currentRecYards.push(tempRecYard);

                    var tempRush = {val: 0, vs: "BYE", week: week};
                    currentRushes.push(tempRush);

                    var tempRushYard = {val: 0, vs: "BYE", week: week};
                    currentRushYards.push(tempRushYard);

                    var tempTouchdown = {val: 0, vs: "BYE", week: week};
                    currentTouchdowns.push(tempTouchdown);
                }


                currentPlayer = input[i].playerName;


            }
            byeFlag = 0;
            if(currentWeek!=(tempWeek+"")){
                //console.log("BYE WEEK " + tempWeek);
                tempWeek++;
                console.log(tempWeek);
                tempWeek++;
            }else{
                tempWeek++;
            }
        }
        return output;
    }

    function createByeArr(inArr){
        var outArr;
        console.log("create bye arr");
        console.log(inArr);

    }


var playerDiv
var targetGraphDivWrapper;
var targetGraphDiv;
var targetGraph;

var timesPageRendered = 0;


function renderPage(dataArr){

    timesPageRendered++;

    //updateHeader();

    var testArray = d3.select(dataArr).sort(d3.ascending(function(d,i) {
        console.log("sorting");
        return d[i].stats[0].values[5].val;
    }))

    playerDiv = d3.select("#wrapper").selectAll("div")
    .data(dataArr)
    .enter()
    .append("div")
    .attr("class", function(d, i){
        if(generic){
            if((i%2)==0){
                return "playerDiv playerDivGeneric1 " + d.team;
            }else{
                return "playerDiv playerDivGeneric2 " + d.team;
            }

        }else{
            return "playerDiv " + d.team;
        }

    });

    playerDiv.append("div")
    .attr("class", "playerDivBG");

    playerDiv.append("div")
        .attr("class", "playerRank");

    $(".playerRank").each(function(){
        $(this).html($(".playerRank").index(this)+1)
    })

    var playerNameWrapperDiv = playerDiv.append("div")
    .attr("class", "playerNameWrapperDiv");

    var playerInitialsWrapper = playerNameWrapperDiv.append("div")
    .attr("class", "playerInitialsWrapper");

    var playerInitials = playerInitialsWrapper.append("p")
    .attr("class", "playerInitials")
    .text( function (d) { return d.initials; } );

    var playerFirstName = playerNameWrapperDiv.append("h3")
    .attr("class", "playerName playerFirstName")
    .text( function (d) {
        var tempName = d.name;
        return (tempName.substr(0,d.name.indexOf(" ")));
    } );

    var playerLastName = playerNameWrapperDiv.append("h3")
    .attr("class", "playerName")
    .text( function (d) {
        var tempName = d.name;
        return (tempName.substr(d.name.indexOf(" "), d.name.length-1));
    } );

    var playerInfo = playerNameWrapperDiv.append("p")
    .attr("class","playerInfo")
    .text(function(d){
        var tempInfo = d.position + " • " + d.team;
        return tempInfo;
    })

    var statNameDiv = playerDiv.append("div")
    .attr("class","statNameDiv");

    var statNameP;

    statNameDiv.each(function(d){
        statNameP = d3.select(this)
        .selectAll("p")
        .data(d.stats)
        .enter()
        .append("p")
        .attr("class", function(d){
            return ("statNameP " + d.stat);
        })
        .html(function(d, i){

            return (d.stat);
        });
    });


    var statDiv = playerDiv.append("div")
    .attr("class","statDiv")
    .append("div");

    var singleStat = statDiv.selectAll("div")
    .data((d)=> d.stats)
    .enter()
    .append("div")
    .attr("class", function(){
        return "singleStatDivWrapper ";
    })
    .append("div")
    .attr("class", function(d){
        var statDivClassName = d.stat;
        if((d.stat).indexOf(" ")!=-1){
            statDivClassName = (d.stat.substr(0,d.stat.indexOf(" "))+ d.stat.substr((d.stat.indexOf(" ")+1), d.stat.length));

        }
        return (statDivClassName + "SingleStat" + " singleStat nonFocus");
    });



    var statSVG = singleStat.append("svg")
    .attr("width", "100%")
    .attr("height", 5);

    var stats;
    var tempValues;


    statSVG.each(function(d){
        stats = d3.select(this)
        .selectAll("rect")
        .data(function(){
            tempValues = d.values;

            var byeIndex = -1;
            for(var key in tempValues){
                if (tempValues.hasOwnProperty(key)) {
                    if(tempValues[key].vs=="BYE"){
                        byeIndex = key;
                    }
                }
            }
            return tempValues;
        })
        .enter()
        .append("rect")
        .attr("width", function(values, i){
            var maxVal = d.maxVal;

            var widthVal = "0%";
            //console.log(tempValues);
            if(tempValues[i+1]){
                if(tempValues[i+1].vs=="BYE"){
                    if(tempValues[i+2]){
                        //widthVal = ((((tempValues[i+2].val/maxVal) - (values.val/maxVal)) * 100) + "%");
                    }
                }else{
                    widthVal = ((((tempValues[i+1].val/maxVal) - (values.val/maxVal)) * 100) + "%");
                }
                if(widthVal=="NaN%"){
                    widthVal = "0%";
                }
            }else{

                this.remove();
            };

            if(values.vs=="BYE"){
                console.log("remove")
                this.remove();
            }
            return widthVal;
        })
        .attr("height", 5)
        .attr("fill", "#c1272d")
        .attr("opacity", function(values, i){


            if(floorCeiling){
                if(tempValues.length>2){
                    return (.35 + (i*(.7/(tempValues.length-2))));
                }else{
                    if(i==0){
                        return ".5";
                    }else if(i==1){
                        return "1";
                    }else{
                        return "1";
                    }
                }
            }else{
                if(tempValues.length>2){

                    return (1 - (i*(.45/(tempValues.length-2))));
                }else{
                    if(i==0){
                        return "1";
                    }else if(i==1){
                        return ".5";
                    }else{
                        return ".5";
                    }
                }
            }
        })
        .attr("class", function(data, i){
            var rectClass = d.stat;


            return "rectClass " + rectClass + "Rect";
        })
        .attr("x", function(values, i){
            var maxVal = d.maxVal;
            return (((values.val/maxVal)*100) + "%");
        })
        .attr("y","0")
    });




    // statSVG.each(function(d){
    //     stats = d3.select(this)
    //     .selectAll("rect")
    //     // .data(d.values)
    //     .data(function(){

    //         var byeIndex = -1;
    //         for(var key in d.values){
    //             if (d.values.hasOwnProperty(key)) {

    //                 if(d.values[key].vs=="BYE"){
    //                     byeIndex = key;
    //                 }
    //             }
    //         }

    //         // delete d.values[key];
    //         // if (byeIndex > -1) {
    //         //     d.values.splice(byeIndex, 1);
    //         // }

    //         return d.values;
    //     })
    //     .enter()
    //     .append("rect")
    //     .attr("width", function(values, i){
    //         var maxVal = d.maxVal;

    //         var widthVal = "0%";
    //         if(d.values[i+1]){
    //
    //             widthVal = ((((d.values[i+1].val/maxVal) - (values.val/maxVal)) * 100) + "%");
    //             if(widthVal=="NaN%"){
    //                 widthVal = "0%";
    //             }
    //         }else{

    //             this.remove();
    //         };
    //
    //         // if(values.vs=="BYE"){

    //         //     this.remove();
    //         // }
    //         return widthVal;
    //     })
    //     .attr("height", 5)
    //     .attr("fill", "#c1272d")
    //     .attr("opacity", function(values, i){
    //
    //
    //         if(floorCeiling){
    //             if(d.values.length>2){
    //                 return (.35 + (i*(.7/(d.values.length-2))));
    //             }else{
    //                 if(i==0){
    //                     return ".5";
    //                 }else if(i==1){
    //                     return "1";
    //                 }else{
    //                     return "1";
    //                 }
    //             }
    //         }else{
    //             if(d.values.length>2){
    //
    //                 return (1 - (i*(.45/(d.values.length-2))));
    //             }else{
    //                 if(i==0){
    //                     return "1";
    //                 }else if(i==1){
    //                     return ".5";
    //                 }else{
    //                     return ".5";
    //                 }
    //             }
    //         }
    //     })
    //     .attr("class", function(data, i){
    //         var rectClass = d.stat;
    //
    //
    //         return "rectClass " + rectClass + "Rect";
    //     })
    //     .attr("x", function(values, i){
    //         var maxVal = d.maxVal;
    //         return (((values.val/maxVal)*100) + "%");
    //     })
    //     .attr("y","0")
    // });







    //stat hover stuff

    var statHover;


    //valNums stuff

    var valNum;

    singleStat.each(function(d){

        valNum = d3.select(this)
        .selectAll("div")
        .data(d.values)
        .enter()
        .append("div")
        .attr("position","absolute")
        .attr("class",function(values, i){
            var tempClass = "valNum ";

            if($(this).prev().hasClass("valNumTight")){
                tempClass += " valNumLastTight";

                if($(this).prev().hasClass("valNumLastTight")){
                    $(this).prev().removeClass("valNumLastTight")
                }
            }
            if(i!=(d.values.length-1)){
                if(d.values[i+1].vs=="BYE"){
                    if(d.values[i+2]){
                        if(((d.values[i+2].val - values.val)/d.maxVal)<.025){
                            tempClass += " valNumTight";
                        }
                    }
                }else{
                    if(((d.values[i+1].val - values.val)/d.maxVal)<.025){
                        tempClass += " valNumTight";
                    }
                }

            }
            if(values.vs=="BYE"){
                this.remove();
            }
            return tempClass;

        })
        .style("left", function(values, i){

            var maxVal = d.maxVal;
            return (((values.val/maxVal)*100) + "%");
        })
        .append("p")
        .text(function(values,i){
            if(values.val>-1){
                return (values.val);
            }
        })
        //ENDED HERE
        .append("div")
        .attr("position","absolute")
        .attr("class","statHover")
        .append("p")
        .text(function(values,i){

            return ("WK " + values.week + " | " + values.vs.toUpperCase());
        });

    });

    singleStat.each(function(d){
        var tempArr = [];
        for(var i=0;i<d.values.length;i++){
            tempArr.push(d.values[i].val);
        }


        var sum = d3.sum(d.values, function(d) { return d.val; });

        var avg = (sum/tempArr.length);


        d3.select(this).append('div')
            .attr("class", "avgCircle")
            .style("left", function(){
                return ((avg/d.maxVal)*100)+"%";
            })
            .append("div")
            .attr("class","avgPWrapper")
            .append("p")
            .attr("class","avgP")
            .html(function(){
                return "AVG — " + (avg+"").substr(0,5);
            })
    });



    //Week Graph Stuff
    // var weekGraphDiv = playerDiv.append("div")
    // .attr("class","weekGraphDiv");


    /////STARTING WEEK

    var weekGraphStart = 0;


    var weekGraphDivWrapper = playerDiv.append('div')
        .attr('class', function(){
            if((weeks+1)<=5){
                return "weekGraphDivWrapper smallWeekGraph";
            }else if((weeks+1)<=10){
                return "weekGraphDivWrapper mediumWeekGraph";
            }else{
                return "weekGraphDivWrapper";
            }
        });
        // .attr('class', 'weekGraphDivWrapper');

    var weekGraphDiv = weekGraphDivWrapper.append('div')
        .attr('class', 'weekGraphDiv');


    var weekGraphBar = weekGraphDiv.selectAll("div.weekGraphBar")
        .data(function(d){
            var valsByWeek = JSON.parse(JSON.stringify(d.stats[0].values));
            console.log(valsByWeek);
            console.log("between " + weeks);
            valsByWeek.sort(function(x, y){
                return d3.ascending(parseInt(x.week), parseInt(y.week));
            });
            console.log(valsByWeek);
            return valsByWeek;
        })
        .enter()
        .append("div")
        .attr("class", function(d,i){
            return "weekGraphBar";
        })
        .style("left", function(d,i){

            console.log(i);
            var tempLeftVal = ((Math.floor((1/(weeks + 1))*100))*i) + "%";
            console.log(tempLeftVal);
            return tempLeftVal;
        })
        .style("opacity", function(d){
            var tempOpacity = (.3+((((parseInt(d.week)-(week-weeks))/weeks)*(.7))));
            return tempOpacity;
        })
        .style("width", function(d){
            // return "8px";
            var tempWeekWidth = Math.floor((1/(weeks + 1))*100) + "%";
            console.log(tempWeekWidth);
            return tempWeekWidth;
        })
        .style("height", function(d){
            var tempHeight = (((d.val/maxValArr[weekGraphStart])*100)+"%");

            if(d.vs=="BYE"){
                tempHeight = "100%"
            }

            return tempHeight;
        })
        .style("background-color", function(d,i){
            if(d.vs=="BYE"){
                return ("rgba(0,0,0, .1)");
                return ("rgb(160,170,180)");
            }
        })
        // .on('mouseover', function(){
        //     d3.select(this).attr('style', 'opacity:1;');
        // })

    weekGraphBar.each(function(d){
        var weekGraphBarHover = d3.select(this)

        .append("div")
        .attr("class", "statHover weekGraphBarHover")
        .attr("position","absolute")
        .append("p")
        .html(function(d){
            var tempHover = ("WEEK " + d.week + " | " + d.vs);
            return (tempHover);
        })


    });

    weekGraphDiv.append("hr")
    .attr("class", "weekGraphHR")
    .style("width", function(){
        return ((weeks+1)*8)+12+"px";
    })
    .style("margin-left", function(){
        return (((weeks*8)+12)/-2)+"px";
    });

    weekGraphDivWrapper.append("div")
        .attr("class", "graphLabel weeklyPointsLabel")
        .html("WEEKLY<br/>POINTS");





    var targetGraphDivWrapper = playerDiv.append('div')
        .attr('class', function(){
            if((weeks+1)<=5){
                return "targetGraphDivWrapper smallWeekGraph";
            }else if((weeks+1)<=10){
                return "targetGraphDivWrapper mediumWeekGraph";
            }else{
                return "targetGraphDivWrapper";
            }
        });
        // .attr('class', 'targetGraphDivWrapper');

    var targetGraphDiv = targetGraphDivWrapper.append('div')
        .attr('class', 'targetGraphDiv');

    targetGraphDivWrapper.append("div")
        .attr("class", "graphLabel targetsLabel")
        .html("TARGET<br/>SHARE");

    var targetMax = 0;
    var targetMin = 100;

    targetGraph = targetGraphDiv.selectAll("div.targetGraph")
    // var targetGraph = targetGraphDiv.selectAll("div.targetGraph")
        .data(function(d){
            return d.stats;
        })
        .enter()
        .append("div")
        .attr("class", function(d,i){
            return "targetGraph";
        })
        .attr("data", function(stats, i){
            if(i==1){
                var tempPlayer = d3.select(this.parentNode).datum();
                var playerTeam = tempPlayer.team;

                var targetsArray = stats.values;
                var targetTotal = 0;
                for(var i=0;i<targetsArray.length;i++){
                    var tempTargetTotal = parseInt(targetsArray[i].val);
                    if(typeof tempTargetTotal==='number' && (tempTargetTotal%1)===0){
                        targetTotal += parseInt(targetsArray[i].val);
                    }

                }

                var teamTotal = parseInt(targetQuery[playerTeam]);

                var tempPercentage = ((targetTotal/teamTotal)*100);

                var newTempPercentage;
                var regex = /[\d]*[\.]?[\d]/g;
                let m;

                if ((m = regex.exec(tempPercentage)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }

                    // The result can be accessed through the `m`-variable.
                    m.forEach((match, groupIndex) => {

                        newTempPercentage = match;

                    });
                }


                var targetFloat = parseFloat(newTempPercentage);
                if(targetFloat>targetMax){
                    targetMax=targetFloat;
                }
                if(targetFloat<targetMin){
                    targetMin=targetFloat;
                }

                //return newTempPercentage+"%";
                return newTempPercentage;
            }else{
                d3.select(this).remove();
            }
        })
        .html(function(d,i){

            if(i==1){
                return (d3.select(this).attr("data")+"%");
            }else{
                d3.select(this).remove();
            }
        });



        $(".targetGraph").each(function(){
            var tempTargetPerc = $(this).attr("data");
            tempTargetPerc = parseFloat(tempTargetPerc);

            var tempTargetOpacity = (((((tempTargetPerc-targetMin)/(targetMax-targetMin))*.55)+.15));

            $(this).css("opacity", function(){
                return tempTargetOpacity;
            });
        })


    //labels

    if(wantLabels){
        singleStat.each(function(d){

            labelNum = d3.select(this)
            .selectAll("div .labelNum")
            .data(function(d){

                var tempValues = d.values.sort(function(x, y){
                    return d3.ascending(x.val, y.val);
                });

                return tempValues;

            })
            .enter()
            .append("div")
            .attr("position","absolute")
            .attr("class",function(values, i){

                var maxVal = d.maxVal;
                if(i==0){
                    return "labelNumDiv labelNumLeft"
                }else {
                    return "labelNumDiv labelNumRight"
                }
            })
            .style("left", function(values, i){

                var maxVal = d.maxVal;
                if(i==0 || i==(d.values.length-1)){
                    if ((values.val/d.maxVal)<.06){
                        this.remove();
                    }
                    return (((values.val/maxVal)*100) + "%");
                }else {
                    this.remove();
                }
            })
            .append("p")
            .attr("class","labelNum")
            .text(function(values,i){
                return (values.val);
            })
        });
    }



    d3.select("body").selectAll(".statHover")
    .append("div")
    .attr("class","downCaret");

    d3.select("body").selectAll(".statHover2")
    .append("div")
    .attr("class","downCaret2");


    var valsVisible = false;
    var visibleVals = -2;
    var playerIndexValsVisible = -1;

    $(".singleStatDivWrapper").on("click", function(){
        var pArray;
        var pElement;
        var clickIndex = $(this).index();
        thisClickPlayerIndex = $(this).parent().parent().parent().index();
        var thisClick = $(this).children(".singleStat");
        var thisClickParent = $(this);

        if(((clickIndex!=visibleVals) || (thisClickPlayerIndex!=playerIndexValsVisible)) && valsVisible){
            playerIndexValsVisible = thisClickPlayerIndex;
            valsVisible = false;
            $(".singleStatDivWrapper").removeClass("thirtyTall");
            $(".singleStat").children(".valNum").removeClass("opaque");

            $(".labelNumDiv").css("opacity","1");
            $(".statNameP").removeClass("focusP");

            setTimeout(function(){
                $(".opaque").css("opacity","0");
            },100);
            $(".statNameP").css("margin-top","9px");
            setTimeout(function(){
                valsVisible = true;
                visibleVals = clickIndex;
                thisClick.children(".valNum").addClass("opaque");
                thisClickParent.addClass("thirtyTall");

                thisClick.children(".labelNumDiv").css("opacity","0");

                pArray = thisClickParent.parent().parent().prev().children();
                pElement = pArray[(clickIndex+1)];
                $(pElement).css("margin-top","17px");
                setTimeout(function(){

                    $(".opaque").css("opacity","1");
                },101);
            }, 300);
        }else{
            if(!valsVisible){
                playerIndexValsVisible = thisClickPlayerIndex;
                valsVisible = true;
                visibleVals = $(this).index();
                $(this).children(".singleStat").children(".labelNumDiv").css("opacity","0");
                $(this).children(".singleStat").children(".valNum").addClass("opaque");
                $(this).addClass("thirtyTall");

                pArray = thisClickParent.parent().parent().prev().children();

                pElement = pArray[(clickIndex+1)];
                $(pElement).css("margin-top","17px");
                setTimeout(function(){
                    $(".opaque").css("opacity","1");
                },100);
            }else{
                valsVisible = false;
                visibleVals = -2;
                $(".statNameP").removeClass("focusP");
                $(".singleStatDivWrapper").removeClass("thirtyTall")
                $(".singleStat").children(".valNum").removeClass("opaque");
                $(".labelNumDiv").css("opacity","1");
                setTimeout(function(){
                    $(".opaque").css("opacity","0");
                },100);
                $(".statNameP").css("margin-top","9px");
            }
        }

    });

// $(".singleStat").addClass("moreTransp");
//     thisClick.removeClass("nonFocus");
//     thisClick.removeClass("moreTransp");

    function clickAllStats(statIndex){
        var pArray;
        var pElement;
        var clickIndex = statIndex;

        if((clickIndex!=visibleVals) && valsVisible){
            valsVisible = false;
            $(".singleStatDivWrapper").removeClass("thirtyTall");
            $(".singleStat").children(".valNum").removeClass("opaque");

            $(".labelNumDiv").css("opacity","1");

            $(".statNameP").removeClass("focusP");
            $(".singleStat").addClass("moreTransp");

            setTimeout(function(){
                $(".opaque").css("opacity","0");
            },100);
            $(".statNameP").css("margin-top","9px");
            setTimeout(function(){
                valsVisible = true;
                visibleVals = clickIndex;


                $(".statDiv").each(function(){
                    var thisClickTemp = $(this).children().children().children(".singleStat");
                    var thisClick = $(thisClickTemp[clickIndex]);
                    //var thisClickParent = $(this).children().children();
                    var thisClickParent = $(thisClick).parent();
                    thisClick.removeClass("nonFocus");
                    thisClick.removeClass("moreTransp");

                    thisClick.children(".valNum").addClass("opaque");
                    thisClickParent.addClass("thirtyTall");
                    thisClick.children(".labelNumDiv").css("opacity","0");

                    pArray = thisClickParent.parent().parent().prev().children();
                    pElement = pArray[(clickIndex+1)];
                    $(pElement).css("margin-top","17px");
                    $(pArray[(clickIndex)]).addClass("focusP");
                    setTimeout(function(){

                        $(".opaque").css("opacity","1");
                    },101);
                })

            }, 300);
        }else{

            if(!valsVisible || ($(".thirtyTall").length == 1)){
                $(".singleStat").addClass("moreTransp");
                valsVisible = true;
                visibleVals = clickIndex;
                $(".statDiv").each(function(){


                    var thisClickTemp = $(this).children().children().children(".singleStat");
                    var thisClick = $(thisClickTemp[clickIndex]);
                    //var thisClickParent = $(this).children().children();
                    var thisClickParent = $(thisClick).parent();

                    thisClick.removeClass("nonFocus");
                    thisClick.removeClass("moreTransp");

                    thisClick.children(".valNum").addClass("opaque");
                    thisClickParent.addClass("thirtyTall");
                    thisClick.children(".labelNumDiv").css("opacity","0");

                    pArray = thisClickParent.parent().parent().prev().children();
                    pElement = pArray[(clickIndex+1)];
                    $(pElement).css("margin-top","17px");
                    $(pArray[(clickIndex)]).addClass("focusP");
                    setTimeout(function(){

                        $(".opaque").css("opacity","1");
                    },101);
                })

            }else{
                $(".statNameP").removeClass("focusP");
                $(".singleStat").removeClass("moreTransp");
                valsVisible = false;
                visibleVals = -2;
                $(".singleStatDivWrapper").removeClass("thirtyTall")
                $(".singleStat").children(".valNum").removeClass("opaque");
                $(".labelNumDiv").css("opacity","1");
                setTimeout(function(){
                    $(".opaque").css("opacity","0");
                },100);
                $(".statNameP").css("margin-top","9px");
            }
        }
    }


    $(".statNameP").on("click", function(){
        var pIndex = $(this).index();

        clickAllStats(pIndex);

    })


    $(".singleStatDivWrapper").hover(function(){

        $(this).children(".singleStat").removeClass("nonFocus");
        // $(this).children(".avgCircle").removeClass("nonFocus");

        var tempStatClassName = $(this).children(".singleStat").attr("class");
        var statClassName = tempStatClassName.substr(0,(tempStatClassName.indexOf(" ")));

        $("." + statClassName).removeClass("nonFocus");

        $(".nonFocus").addClass("moreTransp");

    }, function(){
        $(this).children(".singleStat").addClass("nonFocus");

        var tempStatClassName = $(this).children(".singleStat").attr("class");
        var statClassName = tempStatClassName.substr(0,(tempStatClassName.indexOf(" ")));

        $("." + statClassName).addClass("nonFocus");
        $(".nonFocus").removeClass("moreTransp");
    });


    $(".weekGraphPoint").hover(function(){
        var thisIndex = $(this).index() - 2;
        $(this).attr("r","5");

        var graphHover = $(this).parent().next().children();
        $(graphHover[thisIndex]).addClass("hoverOpaque");

    }, function(){
        var thisIndex = $(this).index() - 2;
        $(this).attr("r","4");

        var graphHover = $(this).parent().next().children();
        $(graphHover[thisIndex]).removeClass("hoverOpaque");
    });

    $(".valNumTight").hover(function(){
        $(".valNumLastTight").css("color","#444444");
    }, function(){
        $(".valNumLastTight").css("color","#ffffff");
    });




    // d3.select("#wrapper").append("div")
    //     .attr("class","gridlines");
    //
    // $(".gridlines").css("left", function(){
    //     return ($(".singleStat").position().left + 40);
    //     // return ($(".singleStat").position().left + 48);
    // });
    //
    // $(".gridlines").css("width", function(){
    //     return ($(".singleStat").width());
    // });
    //
    // for(var k=0;k<11;k++){
    //     d3.select(".gridlines").append("div")
    //         .attr("class","gridline")
    //         .attr("style",function(){
    //             return "left:" + (k*10) + "%";
    //         })
    // }
    //
    // $(window).resize(function(){
    //     $(".gridlines").css("left", function(){
    //         return ($(".singleStat").position().left + 48);
    //     });
    //     $(".gridlines").css("width", function(){
    //         return ($(".singleStat").width());
    //     });
    // })

}


function queryDB(){
    $.ajax({
        type: "GET",
        url: "server.php",
        data: { "purpose" : "queryDB", "startWeek": (week-weeks), "endWeek": week, "numPlayers": NUMPLAYERS, "position1": POSITION1, "position2": POSITION2, "position3": POSITION3, "scoringType":SCORINGTYPE},
        success: function (response) {
        }
    })
    .done(function(results){
        var parsed = JSON.parse(results);
        dataCast = castResults(parsed);
        dataArr = createArray(parsed);
        byeArr = createByeArr(dataArr);

        dbDoneCheck(1);

    });
}

// function queryDB(){
//     $.ajax({
//         type: "GET",
//         url: "server.php",
//         data: { "purpose" : "queryDB", "startWeek": (week-weeks), "endWeek": week, "numPlayers": NUMPLAYERS, "position": POSITION, "scoringType":SCORINGTYPE},
//         success: function (response) {
//         }
//     })
//     .done(function(results){
//         var parsed = JSON.parse(results);
//         dataCast = castResults(parsed);
//         dataArr = createArray(parsed);
//
//         dbDoneCheck(1);
//
//     });
// }


function queryTargets(){
    $.ajax({
        type: "GET",
        url: "server.php",
        data: { "purpose" : "queryTargets", "startWeek": (week-weeks), "endWeek": week},
        success: function (response) {
            //alert ("successfully loaded");
        }
    })
    .done(function(results){
        var parsed = JSON.parse(results);
        targetQuery = castTargets(parsed);

        //dataCast = castResults(parsed);
        //dataArr = createArray(parsed);
        dbDoneCheck(2)
    });
}


function dbDoneCheck(which){
    if(which==1){
        dbDone = 1
    }else{
        tdbDone = 1;
    }
    if(dbDone && tdbDone){
        if(pageLoadNum==0){
            loadWeeksConfig();
        }
        pageLoadNum++;
        renderPage(dataArr);
        loadWeekParameters();
        updateHeader();
    }
}

function loadPage(){
    queryDB();
    queryTargets();
}



var allowReload = 1;
function pullConfig(){

    //POSITION
    var posArr = [];
    $("#configPositionWrapper .configInput").each(function(){
        if($(this).prop('checked')){
            posArr.push($(this).val());
        }
    });
    if(posArr.length<1){
        allowReload=0;
        console.log("error");
    }else if(posArr.length==1){
        POSITION1=posArr[0];
        POSITION2="";
        POSITION3="";
        positionText = posArr[0]+"s";
    }else if(posArr.length==2){
        POSITION1 = posArr[0];
        POSITION2 = posArr[1];
        POSITION3="";
        if(($.inArray("RB", posArr)>-1) && ($.inArray("WR", posArr)>-1)){
            //POSITION = "RB' OR position='WR";
            positionText = "RBs and WRs";
        }else if(($.inArray("RB", posArr)>-1) && ($.inArray("TE", posArr)>-1)){
            //POSITION = "RB' OR position='TE";
            positionText = "RBs and TEs";
        }else{
            //POSITION = "WR' OR position='TE";
            positionText = "WRs and TEs";
        }
    }else if(posArr.length==3){
        POSITION1 = posArr[0];
        POSITION2 = posArr[1];
        POSITION3 = posArr[2];
        positionText = "RBs, WRs, and TEs";
        //POSITION="RB' OR position='TE' OR position='WR"
    }


    //NUMPLAYERS
    NUMPLAYERS = parseInt($("#configNumber").val());

    //NUMPLAYERS
    if($("#configColors").prop('checked')){
        generic = 0;
    }else{
        generic = 1;
    }


    //WEEKS
    if($.isNumeric(parseInt($("#configEndWeek").val())) && $.isNumeric(parseInt($("#configStartWeek").val()))){
        week = $("#configEndWeek").val();
        var tempStartWeek = $("#configStartWeek").val();
        weeks = (week-tempStartWeek);
    }else{
        allowReload = 0;
    }

}

function updateHeader(){
    $("#weeks").html(function(){
        //console.log("week and weeks" + week + " " + weeks);
        return ("WEEK "+(week-weeks)+" — WEEK "+week );
    })

    $("#year").html(function(){
        return year;
    })

    $("#filters").html(function(){
        //var filterString = "TOP "+ NUMPLAYERS +" "+ POSITION1 +"s BY AVERAGE STANDARD POINTS"
        var filterString = "TOP "+ NUMPLAYERS +" ";
        var positionCount = 0;
        if(POSITION1!=""){
            filterString += POSITION1+"s";
            positionCount++;
        }
        if(POSITION2!=""){
            if(positionCount===0){
                filterString += POSITION2+"s";
            }else{
                filterString += ", "+POSITION2+"s";
            }
            positionCount++;
        }
        if(POSITION3!=""){
            if(positionCount===0){
                filterString += POSITION3+"s";
            }else if(positionCount==1){
                filterString += ", "+POSITION3+"s";
            }else{
                filterString += ", AND "+POSITION3+"s";
            }
        }
        filterString += " BY AVERAGE STANDARD POINTS";
        return filterString;
    })

}

function reloadPage(){

    dataArr = [];

    $("#wrapper").html("");
    setTimeout(loadPage, 250);
}

function pageListeners(){
    $("#configEndWeek").on("change",function(){
        updateSelectStartWeek();
    });
    $("#configStartWeek").on("change",function(){
        updateSelectEndWeek();
    });

    $(".configConfig").on("change", function(){
        allowReload= 1;
    })
}




var urlParams = {};
function loadParameters(){
    //var urlParams;
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
    })();

    if(urlParams['year']){
        year = parseInt(urlParams['year']);
    }
    if(urlParams['numplayers']){
        NUMPLAYERS = parseInt(urlParams['numplayers']);
        $("#configNumber").val(NUMPLAYERS);
    }
    if(urlParams['position1']){
        POSITION1 = urlParams['position1'];

    }
    if(urlParams['position2']){
        POSITION2 = urlParams['position2'];

    }
    if(urlParams['position3']){
        POSITION3 = urlParams['position3'];

    }

    if(urlParams['generic']){
        generic = parseInt(urlParams['generic']);
    }

    if(urlParams['endweek']){
        week = parseInt(urlParams['endweek']);
        // $("#configEndWeek").val(week);
        // updateSelectEndWeek();
    }

    if(urlParams['startweek']){
        var tempStartWeek = parseInt(urlParams['startweek']);
        weeks = (week-tempStartWeek);
        // $("#configStartWeek").val(tempStartWeek);
    }



    // loadConfig();


}




function loadWeeksConfig(){
    $("#configStartWeek").html("");
    $("#configEndWeek").html("");
    for(var i=1;i<=maxWeek;i++){

        if(i<week){
            $("#configStartWeek").append(function(){
                return ("<option value='"+i+"'>"+i+"</option>");
            });
        }
        // if(i!=1){
        if(i!=1){

            $("#configEndWeek").append(function(){
                return ("<option value='"+i+"'>"+i+"</option>");
            });
        }
    }
}

function paramLoadWeeksConfig(){
    var tempStart = $("#configStartWeek").val();
    var tempEnd = $("#configEndWeek").val();
    $("#configStartWeek").html("");
    $("#configEndWeek").html("");
    for(var i=1;i<=maxWeek;i++){
        if(i<week && i>=(week-weeks)){
            $("#configStartWeek").append(function(){
                return ("<option value='"+i+"'>"+i+"</option>");
            });
        }
        if(i!=1 && i>=week){
            $("#configEndWeek").append(function(){
                return ("<option value='"+i+"'>"+i+"</option>");
            });
        }
    }
    $("#configStartWeek").val(tempStart);
    $("#configEndWeek").val(tempEnd)
}

function updateSelectStartWeek(){
    var tempVal = $("#configStartWeek").val();
    $("#configStartWeek").html("");
    for(var i=1;i<$("#configEndWeek").val();i++){
        $("#configStartWeek").append(function(){
            return ("<option value='"+i+"'>"+i+"</option>");
        });
    }
    $("#configStartWeek").val(tempVal);
}

function updateSelectEndWeek(){
    var tempVal = $("#configEndWeek").val();

    $("#configEndWeek").html("");
    for(var i=(parseInt($("#configStartWeek").val())+1);i<=maxWeek;i++){
        $("#configEndWeek").append(function(){
            return ("<option value='"+i+"'>"+i+"</option>");
        });
    }
    $("#configEndWeek").val(tempVal);
}

// function loadConfig(){
//     loadWeeksConfig();
// }



function loadWeekParameters(){

    //loadWeeksConfig();
    if(urlParams['startweek']){
        var tempStartWeek = parseInt(urlParams['startweek']);

        $("#configStartWeek").val(parseInt(tempStartWeek));
        paramLoadWeeksConfig();
        // updateSelectStartWeek();
    }

    if(urlParams['endweek']){
        $("#configEndWeek").val(week)
        paramLoadWeeksConfig();
        // updateSelectEndWeek();
    }

}

function updateConfig(){
    $("#configPositionWrapper .configConfig").each(function(){
        $(this).attr('checked', false);
    })
    if(POSITION1=="RB" || POSITION2=="RB" || POSITION3=="RB"){
        $("#configRB").attr('checked', true);
    }
    if(POSITION1=="WR" || POSITION2=="WR" || POSITION3=="WR"){
        $("#configWR").attr('checked', true);
    }
    if(POSITION1=="TE" || POSITION2=="TE" || POSITION3=="TE"){
        $("#configTE").attr('checked', true);
    }


    $("#configNumber").val(NUMPLAYERS);


    // loadWeeksConfig();


}

function updateParameters(){

    /*here you use your own method to refine the url, as the code you provide in your question.*/
    //var newUrl ="newUrl";//can leave it empty. This will be appended after the last /
    var newUrl = refineUrl();//fetch new url

    //here you pass whatever you want to appear in the url after the domain /
    window.history.pushState("object or string", "Title", "/"+newUrl );


    /*Helper function to extract the URL between the last / and before ?
      If url is www.example.com/file.php?f_id=55 this function will return file.php
     pseudo code: edit to match your url settings
    */


}

function refineUrl()
{

    var newUrl = ("?numplayers=" + NUMPLAYERS + "&startweek=" + (week-weeks) + "&endweek=" + week + "&position1=" + POSITION1 + "&scoring=" + SCORINGTYPE + "&generic=" + generic);
    if(POSITION2!=""){
        newUrl = ("?numplayers=" + NUMPLAYERS + "&startweek=" + (week-weeks) + "&endweek=" + week + "&position1=" + POSITION1 + "&position2=" + POSITION2 + "&scoring=" + SCORINGTYPE + "&generic=" + generic);
    }
    if(POSITION2!=""){
        newUrl = ("?numplayers=" + NUMPLAYERS + "&startweek=" + (week-weeks) + "&endweek=" + week + "&position1=" + POSITION1 + "&position2=" + POSITION2 + "&position3=" + POSITION3 + "&scoring=" + SCORINGTYPE + "&generic=" + generic);
    }

    return newUrl;
    // //get full url
    // var url = window.location.href;
    // //get url after/
    // var value = url.substring(url.lastIndexOf('/') + 1);

    // //get the part after before ?
    // value  = value.split("?")[0];

    // return value;
}


$( document ).ready(function() {


    loadParameters();

    loadPage();

    //loadWeekParameters();

    updateConfig();

    // loadConfig();


    pageListeners();


    // updateConfig();
    // loadConfig();

    $("#configureIcon").on("click", function(){

        if($("#configPanel").hasClass("configPanelClosed")){
            $("#inactiveOverlay").removeClass("hidden");
            $("#inactiveOverlay").addClass("visible");

            $("#configPanel").removeClass("configPanelClosed");
            $("#configPanel").addClass("configPanelOpen");

            $("#configureIconImg").attr("src", "configure_exit.png");
        }else{
            $("#inactiveOverlay").addClass("hidden");
            $("#inactiveOverlay").removeClass("visible");

            $("#configPanel").addClass("configPanelClosed");
            $("#configPanel").removeClass("configPanelOpen");

            $("#configureIconImg").attr("src", "configure.png");
        }

    })

    $("#updatePage").on("click", function(){
        pullConfig();
        if(allowReload){
            setTimeout(reloadPage, 10);
        }else{
            console.log("ERROR");
        }
        updateParameters();
        $("#inactiveOverlay").addClass("hidden");
        $("#inactiveOverlay").removeClass("visible");

        $("#configPanel").addClass("configPanelClosed");
        $("#configPanel").removeClass("configPanelOpen");

        $("#configureIconImg").attr("src", "configure.png");
    })

    $("#weeks").on("click", function(){
        $("#configureIcon").click();
    });
    $("#year").on("click", function(){
        $("#configureIcon").click();
    });
    $("#filters").on("click", function(){
        $("#configureIcon").click();
    });
    $("#configureText").on("click", function(){
        $("#configureIcon").click();
    });
    $("#inactiveOverlay").on("click", function(){
        $("#configureIcon").click();
    });

});
