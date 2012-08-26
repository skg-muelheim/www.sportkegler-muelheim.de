var skgmh = skgmh || {};
skgmh.async = {};
skgmh.async.templates = {};

(function(){
    var loadData = function(dest,loaded_template) {
        var domain = document.domain.split(".");
        var tld = domain[domain.length-1];
        $.ajax({
            type: "GET",
            url: "data.php/p/"+dest.data,
            success: function(msg) {
                var loaded_data = msg;
                dest.dest.innerHTML = loaded_template;
                var repeat = $(".repeat",dest.dest);
                var nodesToRepeat = repeat[0].childNodes;
                var parent = repeat[0].parentNode;
                parent.removeChild(repeat[0]);
                var platz = 1;
                for (var key in loaded_data['tabelle']) {
                    var eintrag = loaded_data['tabelle'][key];
                    if ("platzierung" in eintrag) {
                        platz = eintrag['platzierung'];
                    }else {
                        platz++;
                    }
                    var node = repeat[0].cloneNode(true);
                    parent.appendChild(node);
                    var tempList = $(".platzierung",node);
                    for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                        tempList[key3].innerHTML = platz;
                    }
                    for (var key2 in eintrag) {
                        var tempList = $("."+key2,node);
                        for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                            tempList[key3].innerHTML = eintrag[key2];
                        }
                    }
                    
                }
                
                var domPointer = $(".mannschaften",dest.dest);
                var mannschaft =  Encoder.htmlEncode(loaded_data['mannschaften'],true);
                mannschaft = str_replace(" ","&nbsp",mannschaft);
                domPointer[0].innerHTML = mannschaft;

                domPointer = $(".termin",dest.dest);
                var termin =  Encoder.htmlEncode(loaded_data['termin'],true);
                termin = str_replace(" ","&nbsp",mannschaft);
                domPointer[0].innerHTML = termin;

                domPointer = $(".liga",dest.dest);
                var liga =  Encoder.htmlEncode(loaded_data['liga'],true);
                liga = str_replace(" ","&nbsp",liga);
                domPointer[0].innerHTML = liga;
            }
            ,error: function(request,errortype,ex) {
                dest.innerHTML = 'Konnte Daten nicht laden';
            }
        });        
    }
    
    var loadAsyncOld = function(dest,template,data) {
        if (template in skgmh.async.templates) {
            
        }else {
            $.ajax({ 
                    type: "GET"
                    ,url: "templates/"+template+".client.html"
                    ,success: function(msg){
                        skgmh.async.templates[template] = msg;
                        loadData(dest,msg,data);
                    }
                    ,error: function(request,errortype,ex) {
                        dest.innerHTML = 'Konnte Vorlage nicht laden';
                    }
            });    
        }
    }

    var loadAsync = function(templatename,destinations) {
        $.ajax({ 
                type: "GET"
                ,url: "templates/"+templatename+".client.html"
                ,success: function(msg){
                    for (var i= destinations.length-1; i >= 0; i--) {
                        var dest = destinations[i];
                        loadData(dest,msg);
                    }
                }
                ,error: function(request,errortype,ex) {
                    for (var i= destinations.length-1; i >= 0; i--) {
                        var dest = destinations[i];
                        dest.dest.innerHTML = 'Konnte Vorlage nicht laden';
                    }
                }
        });    
    }


    var toLoad = $('.load-async');
    for (var i = toLoad.length-1 ; i >= 0; i--) {
        var templatename = toLoad[i].getAttribute('template');
        if (templatename in skgmh.async.templates) {
            var template = skgmh.async.templates[templatename];
        }else {
            var template = Array();
            skgmh.async.templates[templatename] = template;
        }
        var dataname = toLoad[i].getAttribute('data');
        var destSpec = {};
        destSpec.data = dataname;
        destSpec.dest = toLoad[i];
        template.push(destSpec);
    }
    
    for (var key in skgmh.async.templates) {
        var destinations = skgmh.async.templates[key];
        loadAsync(key,destinations);
    }
    
    //    loadAsync(toLoad[i],template,data);
/*
       $.ajax(
        { 
            type: "POST"
            ,cache: false  
            ,url: "post.php"
            ,data: "u="+username+"&p="+password
            ,success: function(msg){
                var msgObj = JSON.parse(msg);
                if (msgObj['inserted'] > 0) {
                    alert( "Registrierung erfolgreich. Sie erhalten eine Email mit weiteren Informationen.");
                }
            }
            ,error: function(request,errortype,ex) {
                var errObj = JSON.parse(request.responseText);
                alert(errObj['message']);
            }
        });
*/

//    }
    
}());