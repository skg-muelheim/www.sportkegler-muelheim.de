<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<html>
<head>
<link rel="SHORTCUT ICON" href="http://www.sportkegler-muelheim.de/skgicon.ico">
<title>SKG Muelheim Homepage</title>
<style>
{literal}
    #header {
    background:#ddd;
    }
    #nav {
    background:#c99;
    }
    #main {
    background:#9c9;
    }
    #sidebar {
    background:#c9c;
    }
    #footer {
    background:#cc9;
    }
    #main {
    float:left;
    width:600px;
    background:#9c9;
    }
    #sidebar {
    float:right;
    width:180px;
    background:#c9c;
    }
	#footer {
    clear:both;
    background:#cc9;
    }

{/literal}
</style>
</head>
<body bgcolor="#FFFFFF" text="#000000" link="#0000FF" vlink="#800080" alink="#FF0000">
<div id="wrap">
	<div id="header">{include file='banner.tpl'}</div>
	<div id="nav">TOP Navigation</div>
	<div id="main">{include file='skg_news_mit_tabellen.tpl'}</div>
	<div id="sidebar">{include file='navigator-neu.tpl'}</div>
	<div id="footer">Footer</div>
</div>

<p>This page contains frames. Diese Seite enth&auml;lt Frames</p>
</body>
</html>