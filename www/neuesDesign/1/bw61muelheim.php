<?php

include 'default.php';

$smarty->assign('mainnav', 'bw61muelheim');
$smarty->assign('content', 'bw61muelheim_buli.tpl');
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'buli') {
        $smarty->assign('content', 'bw61muelheim_mannschaften.tpl');
    } else if ($_GET['was'] == 'pokale') {
        $smarty->assign('content', 'bw61muelheim_pokale.tpl');
    }
}
$smarty->display('index.tpl');
?>