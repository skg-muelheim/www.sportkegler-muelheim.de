<?php /* Smarty version 2.6.26, created on 2011-11-20 15:44:33
         compiled from index.tpl */ ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<html>
<head>
<link rel="SHORTCUT ICON" href="http://www.sportkegler-muelheim.de/skgicon.ico">
<title>SKG Muelheim Homepage</title>
<style>
<?php echo '
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

'; ?>

</style>
</head>
<body bgcolor="#FFFFFF" text="#000000" link="#0000FF" vlink="#800080" alink="#FF0000">
<div id="wrap">
	<div id="header"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'banner.tpl', 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
	<div id="nav">TOP Navigation</div>
	<div id="main"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'skg_news_mit_tabellen.tpl', 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
	<div id="sidebar"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'navigator-neu.tpl', 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
	<div id="footer">Footer</div>
</div>

<p>This page contains frames. Diese Seite enth&auml;lt Frames</p>
</body>
</html>