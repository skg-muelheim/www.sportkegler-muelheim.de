<header class="jumbotron subhead">
    <h1>G&auml;stebuch</h1>
<!--
<p class="lead">Momentan sind wir in der Ligenspielphase, daher aus aktuellen Anlass unsere Tabellen nach Ligen sortiert</p>
-->
    {include file="content/kontakt-subnav.tpl" gbuch_aktiv="active" }
</header>

{literal}
<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<div class="row">
<div class="span6">
<script>
new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '#test',
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
</script>
</div>
<div class="span4">
    <form class="form-horizontal">
        <fieldset>
            <legend>Einstellungen</legend>
            <div class="control-group">
                <label class="control-label">W&auml;hle G&auml;stebuch&nbsp;&nbsp;</label>
                <div class="control">
                    <select id="welche_gb">
                        <option>SKG M&uuml;lheim</option>
                        <option>BW 61 M&uuml;lheim</option>
                        <option>RW 59 M&uuml;lheim</option>
                        <option>KSC 71 Saarn</option>
                    </select>
                </div>
            </div>
        </fieldset>
    </form> 
</div>
</div>
{/literal}
