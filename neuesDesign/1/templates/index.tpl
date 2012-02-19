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
       {include file='main_navbar.tpl'}
        <div class="container" id="main">
            {include file='skg_news_mit_tabellen.tpl'}
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