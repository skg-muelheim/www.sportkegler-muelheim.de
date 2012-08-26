<?php

include 'default.php';

$smarty->assign('mainnav', 'kontakt');

$content = 'kontakt_impressum.tpl'
if (isset ($_GET['was'])) {
    if ($_GET['was'] == 'main' or $_GET['was'] == 'impressum') {
        $content = 'kontakt_impressum.tpl';
    } else if ($_GET['was'] == 'gaestebuch') {
        if (isset($_GET['prefix'])) {
            $smarty->assign('test_prefix',$_GET['prefix']);
        }
        $content = 'kontakt_gaestebuch.tpl';
    } else if ($_GET['was'] == 'ansprechpartner') {
        $content = 'kontakt_ansprechpartner.tpl';
    } else if ($_GET['was'] == 'route') {
        $content = 'kontakt_routenplaner.tpl';
    }
}
$smarty->assign('content', $content);
$smarty->display('index.tpl',$content);
?>
