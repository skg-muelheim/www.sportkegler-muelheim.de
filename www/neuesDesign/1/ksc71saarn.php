<?php

include 'default.php';

$smarty->assign('mainnav', 'ksc71saarn');
$smarty->assign('content', 'ksc71saarn_mannschaften.tpl');
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'bk') {
        $smarty->assign('content', 'ksc71saarn_mannschaften.tpl');
    } else if ($_GET['was'] == 'pokale') {
        $smarty->assign('content', 'ksc71saarn_pokale.tpl');
    } else if ($_GET['was'] == 'chronik') {
        $smarty->assign('content', 'ksc71saarn_chronik.tpl');
    }
}
$smarty->display('index.tpl');
?>