<?php

include 'default.php';

$content = 'ksc71saarn_mannschaften.tpl';
$smarty->assign('mainnav', 'ksc71saarn');
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'bk') {
        $content = 'ksc71saarn_mannschaften.tpl';
    } else if ($_GET['was'] == 'pokale') {
        $content = 'ksc71saarn_pokale.tpl';
    } else if ($_GET['was'] == 'chronik') {
        $content = 'ksc71saarn_chronik.tpl';
    }
}
$smarty->assign('content', $content );
$smarty->display('index.tpl', $content);
?>