<?php
include 'default.php';


$smarty->assign('mainnav','aktuelles');
$smarty->assign('content','skg_news_mit_tabellen.tpl');

$host = $_SERVER['HTTP_HOST'];
if (preg_match('/loc$/', $host)) {
    $smarty->assign('cdnHost','cdn.skg.loc');
} else {
    $smarty->assign('cdnHost','cdn.sportkegler-muelheim.loc');
}

$smarty->display('index.tpl');

?>