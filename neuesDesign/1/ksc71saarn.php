<?php
include 'default.php';

$smarty->assign('mainnav','ksc71saarn');
if ($_GET['was'] == 'main' or $_GET['was'] == 'bk') {
    $smarty->assign('content','ksc71saarn_bk.tpl');
}else if ($_GET['was'] == 'pokale') {
    $smarty->assign('content','ksc71saarn_pokale.tpl');
}else if ($_GET['was'] == 'chronik') {
    $smarty->assign('content','ksc71saarn_chronik.tpl');
}else {
    $smarty->assign('content','ksc71saarn_bk.tpl');
}
$smarty->display('index.tpl');
?>