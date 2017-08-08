<!DOCTYPE html>
<html>
<head>
    <title>Fantasy Football Leaders Visualized - Tidbits.fyi</title>
    <meta name="description" content="Fantasy football season stats visualized. See the ceiling, floor, and consistency of players week to week."

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <meta content="utf-8" http-equiv="encoding">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:100,300,400,500,700,900" rel="stylesheet">

    <script src="https://d3js.org/d3.v4.min.js" charset="utf-8"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

    <!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script> -->
    <!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/jquery.gsap.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"></script>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>


    <script src="scripts.js"></script>

    <?php include_once("analyticstracking.php") ?>


    <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
    <link rel="manifest" href="favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">


    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div id="top">
        <div id="logoWrapper">
            <h2 id="logo">tidbits.fyi</h2>
        </div>
        <h1 id="pageTitle">FANTASY LEADERS</h1>
    </div>
    <div id="heroWrapper">
        <div id="hero">
            <div id="weeks">
                WEEK X - WEEK Y
            </div>
            <div id="year">
                2016
            </div>
            <div id="filters">
                TOP X POSITION BY AVG STANDARD POINTS
            </div>
            <div id="configureText">
                CONFIGURE
            </div>
            <div id="configureIcon">
                <img id="configureIconImg" src="configure.png"/>
            </div>
        </div>
    </div>
    <div id="inactiveOverlay" class="hidden"></div>
    <div id="configPanel" class="configPanelClosed">
        <div id="configWrapper">
            <div class="configName" id="configPositionLabel">
                POSITION
            </div>
            <div id="configPositionWrapper" class="configOptions">
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="rb" id="configRB" value="RB" checked/><label for="rb">RB</label></div>
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="wr" id="configWR" value="WR" /><label for="wr">WR</label></div>
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="te" id="configTE" value="TE" /><label for="te">TE</label></div>
            </div>


            <div class="configName" id="configScoringLabel">
                SCORING
            </div>
            <div id="configScoringWrapper" class="configOptions">
                <select class="configConfig" id="configScoring">
                    <option value="standardPoints">Standard</option>
                    <option value="halfPprPoints">.5 PPR</option>
                    <option value="pprPoints">PPR</option>
                </select>
            </div>

            <div class="configName" id="configSortLabel">
                SORT BY
            </div>
            <div id="configSortWrapper" class="configOptions">
                <select class="configConfig" id="configSort">
                    <option selected value="points">Points</option>
                    <option value="targets">Targets</option>
                    <option value="receptions">Receptions</option>
                    <option value="receivingYards">Receiving Yards</option>
                    <option value="rushes">Rushes</option>
                    <option value="rushingYards">Rushing Yards</option>
                    <option value="touchdowns">Touchdowns</option>
                </select>
            </div>


            <div class="configName" id="configNumberLabel">
                NUMBER
            </div>
            <div id="configNumberWrapper" class="configOptions">
                <select class="configConfig" id="configNumber">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                </select>
            </div>

            <div class="configName" id="configWeeksLabel">
                WEEKS
            </div>
            <div id="configWeeksWrapper" class="configOptions">
                <select class="configConfig" id="configStartWeek">

                </select>
                <p>
                    TO
                </p>
                <select class="configConfig" id="configEndWeek">

                </select>
            </div>

            <div id="configColorsWrapper" class="configOptions">
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="colors" id="configColors" value="0" checked/><label for="colors">TEAM <br class="visible-xs"/>COLORS</label></div>
            </div>

            <div id="configAveragesWrapper" class="configOptions">
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="averages" id="configAverages" value="0"/><label for="averages">SHOW <br class="visible-xs"/>AVERAGES</label></div>
            </div>

            <div id="configLabelsWrapper" class="configOptions">
                <div class="checkboxWrapper"><input class="configInput configConfig" type="checkbox" name="labels" id="configLabels" value="0"/><label for="averages">SHOW <br class="visible-xs"/>HI/LO</label></div>
            </div>

            <div id="updatePage">UPDATE</div>
        </div>
    </div>
    <div id="wrapper">

    </div>
</body>
</html>
