<html>
    <head>
        <title>Links</title>
        <base target="detail">
    </head>
    <body bgcolor="#7892B5" text="black" link="blue" vlink="purple" alink="red" style="font-family:Arial,sans-serif; font-size:9pt;" topmargin="0" marginheight="2px">
        <p align="left">
           
            
            <font face="Arial" color="black"><span style="font-size:7pt; margin-left:10px;">Danke
            für Dein Interesse. Du bist Besucher:<br>
 <?php
 /***********************************************
  * Snippet Name : Easy Counter                 *
  * Scripted By  : Hermawan Haryanto            *
  * Website      : http://hermawan.dmonster.com *
  * Email        : hermawan@dmonster.com        *
  * License      : GPL (Gnu Public License)     *
  * Created Date : 10/08/2002                   *
  * Instruction  : 1. Upload all pack           *
  *                2. CHMOD +777 to counter.dat *
  *                3. You're done               *
  ***********************************************/
  $cf = "counter.dat";
  $fp = fopen($cf,"r");
  $ct = trim(fread($fp,filesize($cf)));
  if ($ct != "") $ct++;
  else $ct = 1;
  @fclose($fp);
  $fp = fopen($cf,"w");
  @fputs($fp,$ct);
  for($i=0;$i<strlen($ct);$i++) {
    $imgnum = substr($ct,$i,1);
    $counter .= "<img src='$imgnum.gif'>";
  }
  @fclose($fp);
  print $counter;
            ?>

            
    </font></span></body>
</html>

