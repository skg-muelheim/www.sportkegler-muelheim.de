<?php

include 'default.php';

$smarty->assign('mainnav', 'kontakt');

$smarty->assign('content', 'kontakt_impressum.tpl');
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'impressum') {
        $smarty->assign('content', 'kontakt_impressum.tpl');
    } else if ($_GET['was'] == 'gaestebuch') {
        if (isset($_GET['prefix'])) {
            $smarty->assign('test_prefix',$_GET['prefix']);
        }
        $smarty->assign('content', 'kontakt_gaestebuch.tpl');
    } else if ($_GET['was'] == 'ansprechpartner') {
        $smarty->assign('content', 'kontakt_ansprechpartner.tpl');
    } else if ($_GET['was'] == 'route') {
        $smarty->assign('content', 'kontakt_routenplaner.tpl');
    }
}
$smarty->display('index.tpl');
?>
