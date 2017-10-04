<?php

$db = mysqli_connect('localhost','root','root','scrape') or die('Error connecting to MySQL server.');


if ($_GET["purpose"] == "queryDB")
{

    $startWeek = $_GET["startWeek"];
    $endWeek = $_GET["endWeek"];
    $position1 = $_GET["position1"];
    $position2 = $_GET["position2"];
    $position3 = $_GET["position3"];
    $numPlayers = $_GET["numPlayers"];
    $scoringType = $_GET["scoringType"];
    $year = $_GET["year"];

    $sort = $_GET["sort"];

    if($sort == "touchdowns"){
        $sort = "rushingTouchdowns + receivingTouchdowns + miscTouchdown";
    }

    if($sort == "points"){
        $sort = $scoringType;
    }

    // $query = "SELECT * FROM allPlayers A LEFT JOIN ( SELECT playerName, position, team, AVG( $scoringType ) as playerAvg FROM allPlayers WHERE week BETWEEN $startWeek AND $endWeek AND position='$position' GROUP BY playerName, position, team ORDER BY playerAvg DESC LIMIT $numPlayers) B ON A.playerName=B.playerName AND A.team=B.team AND A.position=B.position WHERE week BETWEEN $startWeek AND $endWeek AND B.playerName IS NOT NULL AND A.opponent <> 'NULL' ORDER BY B.playerAvg DESC, A.playerName ASC, A.week ASC";
    //$query = "SELECT * FROM allPlayers A LEFT JOIN ( SELECT playerName, position, team, (SUM( $scoringType )/($endWeek-$startWeek+1)) as playerAvg FROM allPlayers WHERE week BETWEEN $startWeek AND $endWeek AND position='$position' GROUP BY playerName, position, team ORDER BY playerAvg DESC LIMIT $numPlayers) B ON A.playerName=B.playerName AND A.team=B.team AND A.position=B.position WHERE week BETWEEN $startWeek AND $endWeek AND B.playerName IS NOT NULL AND A.opponent <> 'NULL' ORDER BY B.playerAvg DESC, A.playerName ASC, A.week ASC";

    // $query = "SELECT * FROM allPlayers A LEFT JOIN ( SELECT playerName, position,  AVG( $scoringType ) as playerAvg FROM allPlayers WHERE week BETWEEN $startWeek AND $endWeek AND position='$position' GROUP BY playerName, position ORDER BY playerAvg DESC LIMIT $numPlayers) B ON A.playerName=B.playerName AND A.position=B.position WHERE week BETWEEN $startWeek AND $endWeek AND B.playerName IS NOT NULL AND A.opponent <> 'NULL' ORDER BY B.playerAvg DESC, A.playerName ASC, A.week ASC";

    //$query = "SELECT * FROM allPlayers A LEFT JOIN ( SELECT playerName, position, (SUM( $scoringType )/($endWeek-$startWeek+1)) as playerAvg FROM allPlayers WHERE week BETWEEN $startWeek AND $endWeek AND position='$position1' OR position='$position2' OR position='$position3' GROUP BY playerName ORDER BY playerAvg DESC LIMIT $numPlayers) B ON A.playerName=B.playerName AND A.position=B.position WHERE week BETWEEN $startWeek AND $endWeek AND B.playerName IS NOT NULL AND A.opponent <> 'NULL' ORDER BY B.playerAvg DESC, A.playerName ASC, A.week ASC";

    $query = "SELECT * FROM allPlayers A LEFT JOIN ( SELECT playerName, position, (SUM( $sort )) as playerAvg FROM allPlayers WHERE year='$year' AND week BETWEEN $startWeek AND $endWeek AND (position='$position1' OR position='$position2' OR position='$position3') GROUP BY playerName ORDER BY playerAvg DESC LIMIT $numPlayers) B ON A.playerName=B.playerName AND A.position=B.position WHERE week BETWEEN $startWeek AND $endWeek AND year='$year' AND B.playerName IS NOT NULL AND A.opponent <> 'NULL' ORDER BY B.playerAvg DESC, A.playerName ASC, A.week ASC";





	$result = mysqli_query($db, $query);

	$playerArray = array();

	while ($row = mysqli_fetch_assoc($result)) {
	 array_push($playerArray,$row);
	}
	echo json_encode($playerArray);

	mysql_close($con);
}



if ($_GET["purpose"] == "queryTargets")
{
    $startWeek = $_GET["startWeek"];
    $endWeek = $_GET["endWeek"];
    $year = $_GET["year"];

    $query = "SELECT team, SUM(targets) as targets FROM allPlayers WHERE week BETWEEN $startWeek AND $endWeek AND year='$year' GROUP BY team";
//    $query = “SELECT team, SUM(targets) FROM allPlayers GROUP BY team”;


	$result = mysqli_query($db, $query);

	$targetArray = array();

	while ($row = mysqli_fetch_assoc($result)) {
	 array_push($targetArray,$row);
	}
	echo json_encode($targetArray);

	mysql_close($con);
}





if ($_GET["purpose"] == "getWRs")
{
    echo ("here");
    $query = "SELECT * FROM allPlayers";
    //$query = "SELECT * FROM wk" . $_GET['week'] . "players WHERE position='WR' ORDER BY " . $_GET['sort'] . " DESC limit " . $_GET['numplayers'];

	$result = mysqli_query($db, $query);

	$playerArray = array();

	while ($row = mysqli_fetch_assoc($result)) {
	 array_push($playerArray,$row);
	}
	echo json_encode($playerArray);

	mysql_close($con);
}


if ($_GET["purpose"] == "getRBs")
{
    $query = "SELECT * FROM wk" . $_GET['week'] . "players WHERE position='RB' ORDER BY " . $_GET['sort'] . " DESC limit " . $_GET['numplayers'];

	$result = mysqli_query($db, $query);

	$playerArray = array();

	while ($row = mysqli_fetch_assoc($result)) {
	 array_push($playerArray,$row);
	}
	echo json_encode($playerArray);

	mysql_close($con);
}


if ($_GET["purpose"] == "getTEs")
{
    $query = "SELECT * FROM wk" . $_GET['week'] . "players WHERE position='TE' ORDER BY " . $_GET['sort'] . " DESC limit " . $_GET['numplayers'];

	$result = mysqli_query($db, $query);

	$playerArray = array();

	while ($row = mysqli_fetch_assoc($result)) {
	 array_push($playerArray,$row);
	}
	echo json_encode($playerArray);

	mysql_close($con);
}



if ($_GET["purpose"] == "getPointsPoints")
{

    $query = "SELECT SUM(" .$_GET['scoring'] . ") FROM wk" .$_GET['weekNum'] . "players WHERE team='" . $_GET['teamAbb'] . "' AND (position='QB' OR position='TE' OR position='WR' OR position='RB') ORDER BY " . $_GET['sortx'] . " DESC LIMIT " . $_GET['numplayers'];
    //$query = "SELECT SUM(attempts) FROM wk" .$_GET['weekNum'] . "players WHERE team='".$_GET['teamVar'] ."' AND (position='QB' OR position='TE' OR position='WR' OR position='RB') ORDER BY ". $_GET['sortx'] ." DESC LIMIT " .$_GET['numplayers'];
	mysqli_query($db, $query) or die('Error querying database.');

	$result = mysqli_query($db, $query);

	while ($row = mysqli_fetch_assoc($result)) {

	 echo $row["SUM(" .$_GET['scoring'] . ")"];

	}

	//mysql_close($con);
};




if ($_GET["purpose"] == "getPointsAttempts")
{

    $query = "SELECT SUM(attempts) FROM wk" .$_GET['weekNum'] . "players WHERE team='" . $_GET['teamAbb'] . "' AND (position='QB' OR position='TE' OR position='WR' OR position='RB') ORDER BY " . $_GET['sortx'] . " DESC LIMIT " . $_GET['numplayers'];
    //$query = "SELECT SUM(attempts) FROM wk" .$_GET['weekNum'] . "players WHERE team='".$_GET['teamVar'] ."' AND (position='QB' OR position='TE' OR position='WR' OR position='RB') ORDER BY ". $_GET['sortx'] ." DESC LIMIT " .$_GET['numplayers'];
	mysqli_query($db, $query) or die('Error querying database.');

	$result = mysqli_query($db, $query);

	while ($row = mysqli_fetch_assoc($result)) {

	 echo $row["SUM(attempts)"];

	}


};

?>
