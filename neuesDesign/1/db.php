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

?>
<div>
    <form id="newUserForm">
    <div>New User:</div>
    <div>Name: <input id ="newUserName"></input></div>
    <div>Password: <input id ="newUserPassword"></input></div>
    <div><a href="#" id="submitNewUser">Create New User</a></div>
    </form>
</div>
<a href="#" id="load_basic">Click</a>
<div id="result">Ergebnis</div>

<script src="js/jquery.js"></script>
<script type="text/javascript">
    var submit = function(e) {
       var username = $("#newUserName").val();
       var password = $("#newUserPassword").val();
        $.ajax(
        { 
            type: "POST"
            ,cache: false  
            ,url: "post.php"
            ,data: "u="+username+"&p="+password
            ,success: function(msg){ 
                alert( "Data Saved: " + msg);
            }
            ,error: function(request,errortype,ex) {
//                alert(request);
//                alert(errortype);
//                alert(ex);
            }
        });
    };
    
    var submitOnEnter = function(evt) {
        if (evt.keyCode == 13) {
            submit();
        }
    }
    $("#submitNewUser").click(submit);
    $("#newUserForm").submit(submit);
    $("#newUserName").keypress(submitOnEnter);
    $("#newUserPassword").keypress(submitOnEnter);
</script>
<?php

mysql_close($connection);

?>
