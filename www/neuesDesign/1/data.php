<?php
include 'gzip.php';
header('Content-type: application/json; charset=iso-8859-1');
$content = file_get_contents("data/".$_GET['content'].".json");
echo $content;
?>
