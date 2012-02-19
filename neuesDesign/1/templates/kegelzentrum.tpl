<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<html>
    <head>
        <title>SKG Muelheim Homepage</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
        <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

        <!-- Le styles -->
        <link href="css/bootstrap.css" rel="stylesheet">
        <style>
            {literal}
                body {
                    padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
                }
            {/literal}
        </style>
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <link href="css/docs.css" rel="stylesheet">

        <!-- Le fav and touch icons -->
        <link rel="shortcut icon" href="images/favicon.ico">
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">

        <link rel="SHORTCUT ICON" href="../../skgicon.ico">
    </head>
    <body data-spy="scroll" data-target=".subnav" data-offset="50">
        <!-- 
                <div id="header">{*include file='banner.tpl'*}</div>
                <div id="nav">TOP Navigation</div>
                <div id="main">{*include file='skg_news_mit_tabellen.tpl'*}</div>
                <div id="sidebar">{*include file='navigator-neu.tpl'*}</div>
                <div id="footer">Footer</div>
        -->
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="index.php">SKG M&uuml;lheim</a>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li ><a href="index.php">Aktuelles</a></li>
                            <li class="dropdown active">
                                <a class="dropdown-toggle"
                                   data-toggle="dropdown"
                                   href="#">
                                    Der Verein
                                    <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#Meisterschaften">Meisterschaften</a></li>
                                    <li><a href="#Kegelzentrum">Unser Kegelzentrum</a></li>
                                    <li><a href="#Chronik">Chronik</a></li>
                                </ul>
                            </li>

                            <li><a href="#Jugend">Jugend</a></li>
                            <li class="dropdown">
                                <a class="dropdown-toggle"
                                   data-toggle="dropdown"
                                   href="#">
                                    RW 59 M&uuml;lheim
                                    <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#RWM1">1. Mannschaft</a></li>
                                    <li><a href="#RWM2">2. Mannschaft</a></li>
                                    <li><a href="#RWPokale">Pokalespiele</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle"
                                   data-toggle="dropdown"
                                   href="#">
                                    BW 61 M&uuml;lheim
                                    <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#BWM1">1. Mannschaft</a></li>
                                    <li><a href="#BWM2">2. Mannschaft</a></li>
                                    <li><a href="#BWM3">3. Mannschaft</a></li>
                                    <li><a href="#BWM4">4. Mannschaft</a></li>
                                    <li><a href="#BWPokale">Pokalespiele</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle"
                                   data-toggle="dropdown"
                                   href="#">
                                    KSC 71 Saarn
                                    <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#KSCM1">1. Mannschaft</a></li>
                                    <li><a href="#KSCPokale">Pokalespiele</a></li>
                                    <li><a href="#KSCChronik">Chronik</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle"
                                   data-toggle="dropdown"
                                   href="#">
                                    Kontakt
                                    <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#Kontakte">Ansprechpartner</a></li>
                                    <li><a href="#Routenplaner">Routenplaner</a></li>
                                    <li><a href="#Impressum">Impressum</a></li>
                                    <li><a href="#Gaestebuch">G&auml;stebuch</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
            <ul class="nav nav-pills">
            </ul>
        </div>
        <div class="container" id="main">
            {include file='kegelzentrum_inner.tpl'}
        </div>

        <script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
        <script src="js/jquery.js"></script>
        <script src="js/google-code-prettify/prettify.js"></script>
        <script src="js/bootstrap-transition.js"></script>
        <script src="js/bootstrap-alert.js"></script>
        <script src="js/bootstrap-modal.js"></script>
        <script src="js/bootstrap-dropdown.js"></script>
        <script src="js/bootstrap-scrollspy.js"></script>
        <script src="js/bootstrap-tab.js"></script>
        <script src="js/bootstrap-tooltip.js"></script>
        <script src="js/bootstrap-popover.js"></script>
        <script src="js/bootstrap-button.js"></script>
        <script src="js/bootstrap-collapse.js"></script>
        <script src="js/bootstrap-carousel.js"></script>
        <script src="js/bootstrap-typeahead.js"></script>
        <script src="js/skg-mainapp.js"></script>

    </body>
</html>