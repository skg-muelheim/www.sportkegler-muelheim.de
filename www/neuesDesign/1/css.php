<?php
include 'default.php';
header('Content-Type: text/css');

$smarty->left_delimiter = 'MitDiesenDelimeterFaengtHierNixAn{';
$smarty->right_delimiter = '}MitDiesenDelimeterHoertHierNixAuf';
$smarty->display('css.tpl');
?>