(function(){
    var loadData = function(dest,loaded_template,data) {
        var domain = document.domain.split(".");
        var tld = domain[domain.length-1];
        $.ajax({
            type: "GET",
            url: "data.php/p/"+data,
            success: function(msg) {
                var loaded_data = msg;
                dest.innerHTML = loaded_template;
                var repeat = $(".repeat",dest);
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
                        tempList[key3].innerText = platz;
                    }
                    for (var key2 in eintrag) {
                        var tempList = $("."+key2,node);
                        for (var key3 = tempList.length-1; key3 >= 0; key3--) {
                            tempList[key3].innerText = eintrag[key2];
                        }
                    }
                    
                }
                var liga = $(".mannschaften",dest);
                var mannschaft =  Encoder.htmlEncode(loaded_data['mannschaften'],true);
                mannschaft = str_replace(" ","&nbsp",mannschaft);
                liga[0].innerHTML = mannschaft;
            }
            ,error: function(request,errortype,ex) {
                dest.innerHTML = 'Konnte Daten nicht laden';
            }
        });        
    }
    var loadAsync = function(dest,template,data) {
        $.ajax(
            { 
                type: "GET"
                ,url: "templates/"+template+".client.html"
                ,success: function(msg){
                    loadData(dest,msg,data);
                }
                ,error: function(request,errortype,ex) {
                    dest.innerHTML = 'Konnte Vorlage nicht laden';
                }
            });    
    }

    var toLoad = $('.load-async');
    for (var i = toLoad.length-1 ; i >= 0; i--) {
        var template = toLoad[i].getAttribute('template');
        var data = toLoad[i].getAttribute('data');
        loadAsync(toLoad[i],template,data);
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

    }
    
}());