<?php
if ($_POST) {

    $user = $_POST['u'];
    $passwd = $_POST['p'];
    
    $connection = @mysql_connect("127.0.0.1","skgapps","skgapps");
    if (!$connection) {
        $result['error'] = true;
        $result['message'] = "Auf Grund von technischen Problemen können derzeit keine neuen Benutzer registriert werden. Wir bitten um Verstädnnis.";
        die(json_encode($result));
    }

    if (!mysql_select_db("skgapps",$connection)) {
        $result['error'] = true;
        $result['message'] = "Auf Grund von technischen Problemen können derzeit keine neuen Benutzer registriert werden. Wir bitten um Verstädnnis.";
        echo $result['message'];
        header("Error-Message: ".$result['message'],false,501);
        die(json_encode($result));
    }
    
    $stmt = "SELECT TOP 1 name FROM registrierte_benutzer where 'name'='".$user."')";
    $resultset = mysql_query($stmt,$connection);
    if (!$resultset) {
        $result['error'] = true;
        $result['message'] = "Auf Grund von technischen Problemen können derzeit keine neuen Benutzer registriert werden. Wir bitten um Verstädnnis.";
        
        header("Error-Message: ".$result['message'],false,502);
        header("Status: 503 ",false,502);
        echo $result['message'];
        die(json_encode($result));
    }
    
    $row = mysql_fetch_row($resultset);
    
    if ($row) {
        $stmt = "INSERT INTO `registrierte_benutzer`(`name`, `passwort`) VALUES ('".$user."','".md5($passwd)."')";
        $newEntries = mysql_query($stmt,$connection);
        $result['inserted'] = $newEntries;
    }else {
        $result['error'] = true;
        $result['message'] = "Dieser Benutzername ist schon vergeben. Eventuell haben Sie sich schon registriert.";
        header("Error-Message: ".$result['message'],false,504);
        echo $result['message'];
        die(json_encode($result));
    }

    mysql_close($connection);
    echo json_encode($result);
}else {
    header("HTTP/1.0 404 Not Found");
}
?>