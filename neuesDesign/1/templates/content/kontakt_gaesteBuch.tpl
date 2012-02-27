<header class="jumbotron subhead">
    <h1>G&auml;stebuch</h1>
    <br/>
    <h3>weitere Kontaktm&ouml;glichkeiten</h3>
    
<!--
<p class="lead">Momentan sind wir in der Ligenspielphase, daher aus aktuellen Anlass unsere Tabellen nach Ligen sortiert</p>
-->
    {include file="content/kontakt-subnav.tpl" gbuch_aktiv="active" }
</header>

<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<div class="row">
<div id ="gb_skgmh" class="span6"> 
<script>
{literal}
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '#test_gb_skgmh',
  interval: 30000,
  title: 'G&auml;stebuch',
  subject: 'Sportkegler Gemeinschaft M&uuml;lheim an der Ruhr',
  width: 'auto',
  height: 500,
  theme: {
    shell: {
      background: '#18114f',
      color: '#ffffff'
    },
    tweets: {
      background: '#bfbbe6',
      color: '#000000',
      links: '#0000ff'
    }
  },
  features: {
    scrollbar: true,
    loop: false,
    live: true,
    behavior: 'all'
  }
}).render().start();
{/literal}
</script>
</div>
<div id ="gb_bw61" class="span6" style="display: none"> 
<script>
{literal}
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '#test_gb_bw61',
  interval: 30000,
  title: 'G&auml;stebuch',
  subject: 'BW 61 M&uuml;lheim',
  width: 'auto',
  height: 500,
  theme: {
    shell: {
      background: '#18114f',
      color: '#ffffff'
    },
    tweets: {
      background: '#bfbbe6',
      color: '#000000',
      links: '#0000ff'
    }
  },
  features: {
    scrollbar: true,
    loop: false,
    live: true,
    behavior: 'all'
  }
}).render().start();
{/literal}
</script>
</div>
<div id ="gb_rw59" class="span6" style="display: none"> 
<script>
{literal}
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '#test_gb_rw59',
  interval: 30000,
  title: 'G&auml;stebuch',
  subject: 'RW 59 M&uuml;lheim',
  width: 'auto',
  height: 500,
  theme: {
    shell: {
      background: '#18114f',
      color: '#ffffff'
    },
    tweets: {
      background: '#bfbbe6',
      color: '#000000',
      links: '#0000ff'
    }
  },
  features: {
    scrollbar: true,
    loop: false,
    live: true,
    behavior: 'all'
  }
}).render().start();
{/literal}
</script>
</div>
<div id ="gb_ksc71" class="span6" style="display: none"> 
<script>
{literal}
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '#test_gb_ksc71',
  interval: 30000,
  title: 'G&auml;stebuch',
  subject: 'KSC 71 Saarn',
  width: 'auto',
  height: 500,
  theme: {
    shell: {
      background: '#18114f',
      color: '#ffffff'
    },
    tweets: {
      background: '#bfbbe6',
      color: '#000000',
      links: '#0000ff'
    }
  },
  features: {
    scrollbar: true,
    loop: false,
    live: true,
    behavior: 'all'
  }
}).render().start();
{/literal}
</script>
</div>
<div class="span4">
    <form class="form-horizontal">
        <fieldset>
            <legend>Einstellungen</legend>
            <div class="control-group">
                <label class="control-label">W&auml;hle G&auml;stebuch&nbsp;&nbsp;</label>
                <div class="control">
                    <select id="welches_gb">
                        <option value="gb_skgmh" selected="true">SKG M&uuml;lheim</option>
                        <option value="gb_bw61">BW 61 M&uuml;lheim</option>
                        <option value="gb_rw59">RW 59 M&uuml;lheim</option>
                        <option value="gb_ksc71">KSC 71 Saarn</option>
                    </select>
                </div>
            </div>
        </fieldset>
    </form> 
    <div id="tbox"/>
</div>
</div>

{literal}

<script src="http://platform.twitter.com/anywhere.js?id=W3CuAQBYVeIZineWtmJKqg&v=1" type="text/javascript"></script>
<script type="text/javascript">
var select_gb = function(which) {
    document.getElementById('gb_skgmh').style.display= "none";
    document.getElementById('gb_bw61').style.display= "none";
    document.getElementById('gb_rw59').style.display= "none";
    document.getElementById('gb_ksc71').style.display= "none";
    document.getElementById(which).style.display= null;
    window.location.hash=which;
}
    
var onTweet = function (par1,par2) {
initTweetBox('gb_ksc71','KSC');
}

var initTweetBox = function(id) {
    document.getElementById('tbox').innerHTML = "";
    twttr.anywhere(function (T) {

        T("#tbox").tweetBox({
        label: "Neues f&uuml;rs G&auml;stebuch hier twittern.",
        height: 100,
        width: 400,
        defaultContent: "#test_"+id,
        onTweet: onTweet
        });
    });
}

var onChangeSelection = function (selectbox) {
    var selected;
    for(var i=0; i < selectbox.options.length; i++) {
        if (selectbox.options[i].selected) {
            selected = selectbox.options[i].value;
        }
    }
    select_gb(selected);
    initTweetBox(selected);
}

var ele = document.getElementById("welches_gb")
ele.onchange = function () {
    onChangeSelection(this);
}

if (window.location.hash) {
    var pos = window.location.hash.indexOf('#gb_');
    if (pos == 0) {
        var gb = window.location.hash.substring(1);
        select_gb(gb);
        var select = document.getElementById('welches_gb');
        for(var i=0; i < select.options.length; i++) {
            select.options[i].selected = select.options[i].value == gb;
        }
        initTweetBox(gb);
    }else {
        onChangeSelection(ele);
    }
}else {
    onChangeSelection(ele);
}


</script>
{/literal}
