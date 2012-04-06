<?php
include 'config.php';
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
    ob_start("ob_gzhandler");
}
else {
    ob_start();
}

require '../../lib/smarty/Smarty.class.php';

$smarty = new Smarty;

$smarty->compile_check = true;
$smarty->template_dir = 'templates';
$smarty->compile_dir = 'templates_c';
$smarty->debugging_ctrl = $smarty_debugger_ctrl;
?>
