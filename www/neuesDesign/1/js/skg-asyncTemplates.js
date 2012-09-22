var skgmh = skgmh || {};

var keyValueReplacement = function(dataNode,domNode) {
    for (var key in dataNode) {
        var tempList = $("."+key,domNode);
        for (var key2 = tempList.length-1; key2 >= 0; key2--) {
            tempList[key2].innerHTML = dataNode[key];
        }
    }
}

skgmh.async = {};
skgmh.async.templates = {};
skgmh.processes = {};
skgmh.closures = {};
skgmh.actionHandlers = {};
skgmh.processes.alert = function(dest,loaded_template,msg) {
    alert("Not Yet Implemented");
};

skgmh.closures.bindShowSpieltag = function(template,domNode,loaded_data,spieltag) {
    return function() {
        skgmh.actionHandlers.showSpieltag(template,domNode,loaded_data,spieltag);
    }
};

skgmh.actionHandlers.showSpieltag = function(template,domNode,loaded_data,spieltag) {
    parent = domNode.parentNode;
    after = domNode.nextSibling;
    parent.removeChild(domNode);
    for (var key in loaded_data['spiele']) {
        var repeatData = loaded_data['spiele'][key];
        if (repeatData.spieltag == spieltag) {
            var destDomNode = template.cloneNode(true);
            parent.insertBefore(destDomNode,after);
            if ("spielnr" in repeatData) {
                var tempList = $(".spielnr_in_klammern",destDomNode);
                for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                    tempList[key3].innerHTML = "(" + repeatData.spielnr +")";
                }
            }
            keyValueReplacement(repeatData,destDomNode);
        }
    }
};

skgmh.processes.spieltage = function(dSpec,loaded_template,loaded_data) {
    dSpec.dest.innerHTML = loaded_template;
    var nodesToRepeat = null;
    var parent = null;
    var repeat = $(".repeat",dSpec.dest);
    if (repeat.length == 1) {
        nodesToRepeat = repeat[0].childNodes;
        parent = repeat[0].parentNode;
        parent.removeChild(repeat[0]);
        for (var key in loaded_data['spiele']) {
            var repeatData = loaded_data['spiele'][key];
            if (repeatData.heim == "KSC 71 Saarn 1" || repeatData.gast == "KSC 71 Saarn 1") {
                var destDomNode = repeat[0].cloneNode(true);
                $(destDomNode).bind('click',
                    skgmh.closures.bindShowSpieltag(
                        repeat[0],
                        destDomNode,
                        loaded_data,
                        repeatData.spieltag));
                
                parent.appendChild(destDomNode);
                if ("spielnr" in repeatData) {
                    var tempList = $(".spielnr_in_klammern",destDomNode);
                    for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                        tempList[key3].innerHTML = "(" + repeatData.spielnr +")";
                    }
                }
                keyValueReplacement(repeatData,destDomNode);
            }
        }
    }
}

skgmh.processes.tabelle = function(dSpec,loaded_template,loaded_data) {
    dSpec.dest.innerHTML = loaded_template;
    var nodesToRepeat = null;
    var parent = null;
    var repeat = $(".repeat",dSpec.dest);
    if (repeat.length == 1) {
        nodesToRepeat = repeat[0].childNodes;
        parent = repeat[0].parentNode;
        parent.removeChild(repeat[0]);
        var platz = 1;
        for (var key in loaded_data['tabelle']) {
            var repeatData = loaded_data['tabelle'][key];
            var destDomNode = repeat[0].cloneNode(true);
            parent.appendChild(destDomNode);
            // Spezial Behandlung für Platzierungen 
            if ("platzierung" in repeatData) {
                platz = repeatData['platzierung'];
            }else {
                platz++;
                var tempList = $(".platzierung",destDomNode);
                for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                    tempList[key3].innerHTML = platz;
                }
            }
            keyValueReplacement(repeatData,destDomNode);
        }
    }
    
    var domPointer = $(".mannschaften",dSpec.dest);
    if (domPointer.length == 1) {
        var mannschaft =  Encoder.htmlEncode(loaded_data['mannschaften'],true);
        mannschaft = str_replace(" ","&nbsp",mannschaft);
        domPointer[0].innerHTML = mannschaft;
    }
    
    domPointer = $(".termin",dSpec.dest);
    if (domPointer.length == 1) {
        var termin =  Encoder.htmlEncode(loaded_data['termin'],true);
        termin = str_replace(" ","&nbsp",mannschaft);
        domPointer[0].innerHTML = termin;
    }
    
    domPointer = $(".liga",dSpec.dest);
    if (domPointer.length == 1) {
        var liga =  Encoder.htmlEncode(loaded_data['liga'],true);
        liga = str_replace(" ","&nbsp",liga);
        domPointer[0].innerHTML = liga;
    }
};




(function(){
    var loadData = function(dest,loaded_template) {
        var domain = document.domain.split(".");
        var tld = domain[domain.length-1];
        $.ajax({
            type: "GET",
            url: "data.php/"+dest.data,
            success: function(msg) {
                var procname = dest.dest.getAttribute("process");
                var proc = null;
                if (procname != null) {
                    proc = skgmh.processes[procname];
                }
                if (proc != null) {
                    proc(dest,loaded_template,msg);
                }else {
                    skgmh.processes.alert(dest, loaded_template, msg);
                }
            }
            ,
            error: function(request,errortype,ex) {
                dest.dest.innerHTML = 'Konnte Daten nicht laden';
            }
        });        
    }
    
    var loadAsync = function(templatename,destinations) {
        $.ajax({ 
            type: "GET"
            ,
            url: "templates/"+templatename+".client.html"
            ,
            success: function(msg){
                for (var i= destinations.length-1; i >= 0; i--) {
                    var dest = destinations[i];
                    loadData(dest,msg);
                }
            }
            ,
            error: function(request,errortype,ex) {
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