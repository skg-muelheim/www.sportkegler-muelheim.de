<html>

<head>

	<title>Neue Seiten</title>

	





	<script language="javascript" src="ts_files/scroll.js"></script>



<base target="_self"></head>



<body bgcolor="#DFDFFA" link="#0000CC" vlink="#009966" topmargin="0" marginheight="0" leftmargin="0" marginwidth="0" alink="red">

<p style="text-align:left; line-height:11pt; margin-bottom:2; margin-left:0; border-left-style:none;" align="left"><span style="font-size:10pt;"><b><i><font face="Arial" color="navy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></i></b></span><span style="font-size:12pt;"><b><i><font face="Arial" color="navy">&nbsp;Was 

gibt es Neues? &nbsp;&nbsp;&nbsp;&nbsp;</font></i></b></span><span style="font-size:10pt;"><b><i><font face="Arial" color="navy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></i></b></span><font face="Arial" color="navy"><span style="font-size:8pt;"><i>

<?php
 $tage = array(
 0=>"Sonntag",
 1=>"Montag",
 2=>"Dienstag",
 3=>"Mittwoch",
 4=>"Donnerstag",
 5=>"Freitag",
 6=>"Samstag");
 
 $monate = array(
 1=>"Januar",
 2=>"Februar",
 3=>"März",
 4=>"April",
 5=>"Mai",
 6=>"Juni",
 7=>"Juli",
 8=>"August",
 9=>"September",
 10=>"Oktober",
 11=>"November",
 12=>"Dezember");

 // Name der Datei (eventuell anpassen!)
 $datei = basename($_SERVER["SCRIPT_NAME"]);

 $monat = $monate[date("n",filemtime($datei))];
 $tagname = $tage[date("w",filemtime($datei))];
 $tag = date("d",filemtime($datei));
 $jahr = date("Y",filemtime($datei));
 
 echo "<i>Letzte Aktualisierung am " . $tagname . 
  ", den " . $tag . ". " . $monat." " . $jahr . "</i>";
 ?>
    </i></span></font><font color="navy"><i><br></i>

</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
<ul>
    <div align="left">
        <li style="text-align:left; line-height:11pt; margin-bottom:2; margin-left:0; border-left-style:none;">&nbsp;<font face="Arial"><span style="font-size:11pt;">&nbsp;&nbsp;</span></font><span style="font-size:11pt;"><font face="Arial"><i><a href="../bw-ligenspiele/bw-erste-mannschaft/bw-erste-mannschaft.htm" target="detail">Blau-Weiß 
        61 Mülheim 1:  1. Bundesliga - 6. Spieltag&nbsp;&nbsp;</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="../bw-ligenspiele/bw-vierte-mannschaft/bw-vierte-mannschaft.htm" target="detail">Blau-Weiß 
        61 Mülheim 4:  Kreisliga 2 - 1. Spieltag</a></i></font></span></li>
        <li style="text-align:left; line-height:11pt; margin-bottom:2; margin-left:0; border-left-style:none;"><span style="font-size:11pt;"><font face="Arial"><i>&nbsp;&nbsp;&nbsp;<a href="../bw-ligenspiele/bw-zweite-mannschaft/bw-zweite-mannschaft.htm" target="detail">Blau-Weiß 
        61 Mülheim 2:  Bezirksliga 1 - 3. Spieltag</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="../rw-ligenspiele/rw-erste-mannschaft/rw-erste-mannschaft.htm" target="detail">Rot-Weiß 
        59 Mülheim 1:  Niederrheinliga -&nbsp;3. Spieltag</a></i></font></span></li>
        <li style="text-align:left; line-height:11pt; margin-bottom:2; margin-left:0; border-left-style:none;"><span style="font-size:11pt;"><font face="Arial"><i>&nbsp;&nbsp;&nbsp;<a href="../bw-ligenspiele/bw-dritte-mannschaft/bw-dritte-mannschaft.htm" target="detail">Blau-Weiß 
        61 Mülheim 3:  Bezirksklasse 2 - 3. Spieltag</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="../rw-ligenspiele/rw-zweite-mannschaft/rw-zweite-mannschaft.htm" target="detail">Rot-Weiß 
        59 Mülheim 2:   Bezirksliga - 3. Spieltag</a></i></font></span></li>
        <li style="text-align:left; line-height:11pt; margin-bottom:2; margin-left:0; border-left-style:none;"><span style="font-size:11pt;"><font face="Arial"><i>&nbsp;&nbsp;<a href="../bw-ligenspiele/bw-dritte-mannschaft/bw-dritte-mannschaft.htm" target="detail">&nbsp;</a><a href="../saarn-ligenspiele/saarn-erste-mannschaft/saarn-erste-mannschaft.htm" target="detail">KSC 
        71 Saarn:  Spielplan Bezirksklasse 1 - 1. Spieltag</a>&nbsp;</i></font></span></li>
    </div>
</ul>
</body>

</html>

</script></i></span></font>