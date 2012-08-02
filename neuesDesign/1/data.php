<?php
$pinfo = $_SERVER['PATH_INFO'];

if (strpos($pinfo,'/p/') == 0) {
    $perm = true;
    $pinfo = substr($pinfo,3);
}else {
    $perm = false;
}

if (strpos($pinfo,"..") === true) {
    exit;
}

$filename = "../../../cdn/data/".$pinfo.".json";

$change = filemtime($filename);
header("Last-Modified: " . date ("F d Y H:i:s.", filemtime($filename)));
if ($perm) {
    header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + 365*24*3600));
    header('Cache-Control: max-age=31556926, public');
}


$etag = md5($_SERVER['REQUEST_URI']);
header('Etag: '.$etag);
if (@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $change) { 
    header("HTTP/1.1 304 Not Modified");
    exit;
}


header('Content-type: application/json; charset=iso-8859-1');
include 'gzip.php';
$content = file_get_contents($filename);
echo $content;
?>
