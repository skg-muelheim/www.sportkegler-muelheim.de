<?php

include 'default.php';

$smarty->assign('mainnav', 'bw61muelheim');
$smarty->assign('content', 'bw61muelheim_buli.tpl');
$content = "";
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'buli') {
        $content = 'bw61muelheim_mannschaften.tpl';
    } else if ($_GET['was'] == 'pokale') {
        $content = 'bw61muelheim_pokale.tpl';
    }
}
$smarty->assign('content', $content);
$smarty->display('index.tpl',$content);
?>