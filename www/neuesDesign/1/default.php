<?php
include 'config.php';
include 'gzip.php';
if (strpos(strtoupper($_SERVER['SERVER_NAME']),'WWW') === false) {
    header( 'Location: http://www.'.$_SERVER['SERVER_NAME'].$_SERVER[REQUEST_URI]);
    exit;
}
require '../../lib/smarty/Smarty.class.php';

$smarty = new Smarty;

$smarty->caching = 2;
$smarty->cache_dir = 'cache';
$smarty->cache_modified_check = true;
$smarty->compile_check = true;
$smarty->template_dir = 'templates';
$smarty->compile_dir = 'templates_c';
$smarty->debugging_ctrl = $smarty_debugger_ctrl;
$host = $_SERVER['HTTP_HOST'];
if (preg_match('/loc$/', $host)) {
    $smarty->assign('cdnHost','cdn.skg.loc');
} else {
    $smarty->assign('cdnHost','cdn.sportkegler-muelheim.loc');
}


?>
