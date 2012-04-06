var fehler=true;
var pfad = 'http://newsticker.shortnews.de/de/export/js/';

switch(sparte)
{
 case 1:
	 var spa = ('h');
	 break;
 case 2:
	 var spa = ('s');
	 break;
 case 3:
	 var spa = ('t');
	 break;
 case 4:
	 var spa = ('a');
	 break;
} 

switch(rubrik)
{
 case 1:
	 var rub = ('hig');
	 break;
 case 2:
	 var rub = ('bre');
	 break;
 case 3:
	 var rub = ('ent');
	 break;
 case 4:
	 var rub = ('wir');
	 break;
case 5:
	 var rub = ('spo');
	 break;
 case 6:
	 var rub = ('pol');
	 break;
 case 7:
	 var rub = ('fre');
	 break;
 case 8:
	 var rub = ('reg');
	 break;
 case 9:
	 var rub = ('wis');
	 break;
 case 10:
	 var rub = ('ges');
	 break;
 case 11:
	 var rub = ('kul');
	 break;
 case 12:
	 var rub = ('aut');
	 break;
 case 13:
	 var rub = ('all');
	 break;
 case 14:
	var rub = ('kur');
	break;
 default:
	var rub = ('kur');
	break;
} 

switch(spa)
{
 case 'a':
	 var datei = rub+'_'+tickertyp+'.js';
	 break;
 default:
	 var datei = spa +'_'+ rub+'_'+tickertyp+'.js';
	 break;
} 

var content = pfad + datei;
var ax = '<SCRIPT charset="iso-8859-1" language="JavaScript" SRC="'+content+'" TYPE="text/javascript"><\/SCRIPT>';
document.write(ax);
