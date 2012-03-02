<?php

$connection = @mysql_connect("127.0.0.1","skgapps","skgapps");
if (!$connection) {
    die('Es konnte keine Verbindung zum Datenbankserver hergestellt werden.');
}

if (!mysql_select_db("skgapps",$connection)) {
    die('Es konnte keine Verbindung zur Datenbank hergestellt werden.');
}

$result = mysql_query("SELECT * FROM gaestebuch");

while ($row = mysql_fetch_assoc($result)) {
    echo $row['autor'].'<br/>';
    echo $row['inhalt'].'<br/>';
    echo $row['eingabe'];
}

mysql_free_result($result);

echo '<br>';
echo $_COOKIE;

mysql_close($connection);

?>
