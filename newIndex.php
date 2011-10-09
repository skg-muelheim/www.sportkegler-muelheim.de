<?php

require 'lib/smarty/Smarty.class.php';

$smarty = new Smarty;

$smarty->compile_check = true;
$smarty->template_dir = 'templates';

$smarty->display('index.tpl');
?>
