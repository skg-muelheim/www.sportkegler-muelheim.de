<?php
$VAR_SOURCE = $_POST;
if ($VAR_SOURCE) {

    $user = $VAR_SOURCE['u'];
    $passwd = $VAR_SOURCE['p'];
    
    $connection = @mysql_connect("127.0.0.1","skgapps","skgapps");
    if (!$connection) {
        $result['error'] = true;
        $result['message'] = "Auf Grund von technischen Problemen können derzeit keine neuen Benutzer registriert werden. Wir bitten um Verstädnnis.";
        header("Error-Message: ".$result['message'],false,503);
        die(json_encode($result));
    }

    if (!mysql_select_db("skgapps",$connection)) {
        $result['error'] = true;
        $result['message'] = "Auf Grund von technischen Problemen können derzeit keine neuen Benutzer registriert werden. Wir bitten um Verstädnnis.";
        echo $result['message'];
        header("Error-Message: ".$result['message'],false,503);
        die(json_encode($result));
    }
    
    $stmt = "SELECT name FROM `registrierte_benutzer` where `name`='".$user."'";
    $resultset = mysql_query($stmt,$connection);
    if ($resultset) {
        if ($erg = mysql_fetch_array($resultset,MYSQL_NUM)) {
            if ($erg[0] == $user) {
                $result['error'] = true;
                $result['message'] = "Dieser Benutzername ist schon vergeben. Eventuell haben Sie sich schon registriert.";
                header("Error-Message: ".$result['message'],false,403);
                die(json_encode($result));
            }
        }
        mysql_free_result($resultset);
    }
    
    $stmt = "INSERT INTO `registrierte_benutzer`(`name`, `passwort`) VALUES ('".$user."','".md5($passwd)."')";
    $newEntries = mysql_query($stmt,$connection);
    $result['inserted'] = $newEntries;

    mysql_close($connection);
    echo json_encode($result);
}else {
    header("HTTP/1.0 403 Not Found");
}
?>