<!DOCTYPE html>
<html>
    <head>
        {include file='headElements.tpl'}
        {include file='analytics.tpl'}
    </head>
    {*include file='bodyElements.tpl'*}
    <body data-spy="scroll" data-target=".subnav" data-offset="50">
       {include file='main_navbar.tpl'}
        <div class="container" id="main" mainnav-id="{$mainnav}">
            {include file="content/$content"}
        </div>
    </body>
   {include file='defaultScripts.tpl'}
</html>