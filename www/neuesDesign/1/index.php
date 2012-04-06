<?php
include 'default.php';

$smarty->assign('mainnav','aktuelles');
$smarty->assign('content','skg_news_mit_tabellen.tpl');
$smarty->display('index.tpl');
?>