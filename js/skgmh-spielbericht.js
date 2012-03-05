var skgmh = skgmh || {};

skgmh.selected_app = null;
skgmh.selected_club = null;
skgmh.anzahl_spieler = 6;
skgmh.gespielte_gassen = 2*4*4*2; // 2 Mannschaften 4 Spieler * 4 Bahnen * 2 Gassen
skgmh.verlorene_wertungen = 78;
skgmh.dritter_block = new Array();
skgmh.data = {"HEIM" : new Array(6) , "GAST":new Array(6),};
skgmh.datapointers = {};
skgmh.inlineEdit = {};
skgmh.types = {};
skgmh.prototypes = {};

skgmh.prototypes.datapointer = {
    setValue : function (value) {
        if (skgmh.selected_app == 'Tippabgabe' && this.field_name == 'lp') {
            this.pointer['tipp'] = value;
        }else {
            this.pointer[this.field_name] = value;
        }
    },
    getValue : function () {
        if (skgmh.selected_app == 'Tippabgabe' && this.field_name == 'lp') {
            return this.pointer['tipp'];
        }else {
            return this.pointer[this.field_name];
        }
    },
};

skgmh.prototypes.datapointer_direct = {
    setValue : function (value) {
        this.pointer = value;
    },
    getValue : function () {
        return this.pointer;
    },
};

skgmh.types.datapointer = function (pointer,field_name,pointer_name) {
    this.pointer = pointer;
    this.field_name = field_name;
};
skgmh.types.datapointer_direct = function (pointer,pointer_name) {
    this.pointer = pointer;
};

skgmh.types.datapointer_direct.prototype = skgmh.prototypes.datapointer_direct;
skgmh.types.datapointer.prototype = skgmh.prototypes.datapointer;

skgmh.init_app = function() {with(skgmh) {
    skgmh.load_storage();
    create_datapointers();
    bind();
    selectClub(selected_club);
    selectApp(selected_app);
    recalculateValues();
    document.getElementById('downloadDataLink')['href'] = 'data:application/octet-stream;base64,'+Base64.encode(JSON.stringify(localStorage));
}};
skgmh.registerDataPointer = function (isHeim,spielerindex,feldname) {with(skgmh){
    datapointers[(isHeim?'H':'G')+(spielerindex+1)+'_' +feldname.toUpperCase()] = new types.datapointer((isHeim?data.HEIM:data.GAST)[spielerindex],feldname.toLowerCase());
}}

skgmh.create_datapointers = function () {with(skgmh) {
    for (var i=0; i < 6 ; i++) {
        registerDataPointer(true,i,'name');
        registerDataPointer(true,i,'zp');
        registerDataPointer(true,i,'lp');
//        datapointers['H'+(i+1)+'_NAME'] = new types.datapointer(data.HEIM[i],'name');
//        datapointers['H'+(i+1)+'_ZP'] = new types.datapointer(data.HEIM[i],'zp');
//        datapointers['H'+(i+1)+'_LP'] = new types.datapointer(data.HEIM[i],'lp');
        datapointers['H'+(i+1)+'_GassenLP'] = new types.datapointer_direct(data.HEIM[i].gassen);
        
        registerDataPointer(false,i,'name');
        registerDataPointer(false,i,'zp');
        registerDataPointer(false,i,'lp');
//        datapointers['G'+(i+1)+'_NAME'] = new types.datapointer(data.GAST[i],'name');
//        datapointers['G'+(i+1)+'_ZP'] = new types.datapointer(data.GAST[i],'zp');
//        datapointers['G'+(i+1)+'_LP'] = new types.datapointer(data.GAST[i],'lp');
        datapointers['G'+(i+1)+'_GassenLP'] = new types.datapointer_direct(data.GAST[i].gassen);
        
        for (var j=0; j < 8; j++) {
            datapointers['H'+(i+1)+'_GassenLP_'+(j+1)] = new types.datapointer(data.HEIM[i].gassen,j);
            datapointers['G'+(i+1)+'_GassenLP_'+(j+1)] = new types.datapointer(data.GAST[i].gassen,j);
        }
    }
    datapointers['HM_NAME'] = new types.datapointer(data,'HEIMMANNSCHAFT');
    datapointers['GM_NAME'] = new types.datapointer(data,'GASTMANNSCHAFT');
}};

skgmh.fillDataIntoForm = function () {with(skgmh) {
    for (var i=0; i < 6; i++) {
        updateEditById('H'+(i+1)+'_NAME');
        updateEditById('H'+(i+1)+'_LP');
        updateEditById('G'+(i+1)+'_NAME');
        updateEditById('G'+(i+1)+'_LP');
    }
    updateEditById('HM_NAME');
    updateEditById('GM_NAME');
    if (anzahl_spieler == 4) {
        remove3Block();
    }
}};

skgmh.updateEditById = function(fieldid) {with(skgmh) {
    updateEdit(document.getElementById(fieldid),datapointers[fieldid].getValue());
}};
skgmh.updateEditByIdPopup = function(fieldid,dataid) {with(skgmh) {
    updateEdit(document.getElementById(fieldid),datapointers[dataid].getValue());
}};

skgmh.updateEdit = function(field,value) {
    if (field != null) {
        var elements = field.childNodes;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var inner = elements[i];
            if (inner.tagName.toUpperCase() === 'SPAN') {
                inner.innerHTML = value;
            }
        }
    }
  
};

skgmh.bind = function() {with(skgmh){
    var elements = getElementsByClassName(document,'onMouseOverEdit');
    var n = elements.length;
    for (i = 0; i < n; i++) {
        var element = elements[i];
        element.innerHTML = '<span/>';
        skgmh.inlineEdit.init(element,wrapValueTransfer(element,datapointers[element.id],recalculateValues));
    }
    
    document.getElementById('remove_P5_P6_button').onclick = remove3Block;
    document.getElementById('progressGassenP').onclick = gassenProgressP;
    document.getElementById('progressGassen').onclick = gassenProgressM;
    document.getElementById('zumSpielbericht').onclick = function(){$('#LP_Eingabe').modal('hide')};
    document.getElementById('switchToSpielbericht').onclick = switchToProgrammModus('Spielbericht');
    document.getElementById('switchToHochrechnung').onclick = switchToProgrammModus('Hochrechnung');
    document.getElementById('switchToTippabgabe').onclick = switchToProgrammModus('Tippabgabe');
}};

skgmh.switchToProgrammModus = function(mode) {
    var func = function() {with(skgmh){
        selected_app = mode;
        selectApp(selected_app);
        store_all();
    }};
    return func;
}

skgmh.gassenProgressP = function(event) {
    skgmh.gespielte_gassen++;
    skgmh.recalculateValues();
}

skgmh.gassenProgressM = function(event) {
    skgmh.gespielte_gassen-=2;
    skgmh.recalculateValues();
}


skgmh.wrapValueTransfer = function(element,data_pointer,recalcMethod) {
    var wrapper = {};
    wrapper.toModel =function(newValue) {
        var elements = element.childNodes;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var inner = elements[i];
            if (inner.tagName.toUpperCase() === 'SPAN') {
                inner.innerHTML = newValue;
                if (data_pointer) {
                    data_pointer.setValue(newValue);
                }
            }
        }
        skgmh.store_all();
        if (element.getAttribute('recalcNeeded') === "true" && recalcMethod) {
            recalcMethod();
        }

    }
    wrapper.fromModel =function() {
        if (data_pointer) {
            return data_pointer.getValue();
        }
    }
    return wrapper;
}

skgmh.remove3Block = function() {with(skgmh){v
    var elements = getElementsByClassName(document,'dritterBlock');
    var n = elements.length;
    for (var i = n-1; i >= 0; i--) {
        dritter_block.push(elements[i].parentNode.removeChild(elements[i]));
    }
    var icon = document.createElement('i');
    icon.setAttribute('class','icon-plus');
    document.getElementById('insert_P5_P6_button').appendChild(icon);
    icon.onclick = insert3Block;
    anzahl_spieler = 4;
    store_value('anzahl_spieler',anzahl_spieler);
    recalculateValues();
}};

skgmh.insert3Block = function() {with(skgmh){
    var dom = document.getElementById('summenZeilen');
    var p = dom.parentNode;
    var n = dritter_block.length;
    for (var i = n-1; i >= 0; i--) {
        p.insertBefore(dritter_block.pop(),dom);
//        dom.appendChild(dritter_block.pop());
    }
    document.getElementById('insert_P5_P6_button').innerHTML = '';
    anzahl_spieler = 6;
    store_value('anzahl_spieler',anzahl_spieler);
    recalculateValues();
}};

skgmh.getValueByIdInSpan = function(id) {
    var ve = document.getElementById(id);
    var elements = ve.childNodes;
    var n = elements.length;
    for (k = 0; k < n; k++) {
        var inner = elements[k];
        if (inner.tagName && inner.tagName.toUpperCase() === 'SPAN') {
            return inner.innerHTML;
        }
    }
    return '';
}

skgmh.updatePopupSum = function() {
    for(var i=0; i < 4; i++) {
        for(var j=0; j < 4; j++) {
            var sum = ''
            var v = skgmh.getValueByIdInSpan('SpielerBahn'+(i+1)+'V'+(j+1));
            var r = skgmh.getValueByIdInSpan('SpielerBahn'+(i+1)+'R'+(j+1));

            if (v != '' || r != '') {
                sum = parseInt(0);
                if (v != '') {
                    sum += parseInt(v);
                }
                if (r != '') {
                    sum += parseInt(r);
                }
            }
            document.getElementById('SpielerBahn'+(i+1)+'S'+(j+1)).innerHTML=sum;    
        }
    }
}


skgmh.recalculateValues = function () {with(skgmh){
        sorter = function (a,b) {
        if (a.lp === b.lp) {
            return a.mannschaft =='G' ? +1 : -1;
        }
        return a.lp-b.lp;
    }

    if (selected_app != 'Tippabgabe') {
        
    
        for(var i=0; i < anzahl_spieler; i++) {
            var heim = 0;
            var gast = 0;
            var hgassen = new Array(4);
            hgassen[0] = 0;
            hgassen[1] = 0;
            hgassen[2] = 0;
            hgassen[3] = 0;
            var ggassen = new Array(4);
            ggassen[0] = 0;
            ggassen[1] = 0;
            ggassen[2] = 0;
            ggassen[3] = 0;
            for(var j=0; j < 8; j++) {
                var htemp = datapointers['H'+(i+1)+'_GassenLP_'+(j+1)].getValue();
                var gtemp = datapointers['G'+(i+1)+'_GassenLP_'+(j+1)].getValue();
                if (htemp != "") {
                    hgassen[j%2] += 1;
                    hgassen[2+(j%2)] += +(htemp)
                }
                if (gtemp != "") {
                    ggassen[j%2] += 1;
                    ggassen[2+(j%2)] += +(gtemp)
                }
                heim += +(htemp);
                gast += +(gtemp);
            }
            if (selected_app == 'Hochrechnung') {
                heim = hgassen[2];
                heim += hgassen[3];
                var vFaktor = hgassen[2] / (hgassen[2] + hgassen[3]); 
                var rFaktor = hgassen[3] / (hgassen[2] + hgassen[3]);
                var hTippV = (skgmh.data['HEIM'][i].tipp / 4) * vFaktor; 
                var hTippR = (skgmh.data['HEIM'][i].tipp / 4) * rFaktor;
                heim += hTippV * (4 - hgassen[0]);
                heim += hTippR * (4 - hgassen[1]);
                if (hgassen[0] == 0) {
                    heim = skgmh.data['HEIM'][i].tipp;
                }else {
                    heim = parseInt(heim);
                }
                
                gast = ggassen[2];
                gast += ggassen[3];
                vFaktor = ggassen[2] / (ggassen[2] + ggassen[3]); 
                rFaktor = ggassen[3] / (ggassen[2] + ggassen[3]);
                var gTippV = (skgmh.data['GAST'][i].tipp / 4) * vFaktor; 
                var gTippR = (skgmh.data['GAST'][i].tipp / 4) * rFaktor;
                gast += gTippV * (4 - ggassen[0]);
                gast += gTippR * (4 - ggassen[1]);
                if (ggassen[0] == 0) {
                    gast = skgmh.data['GAST'][i].tipp;
                }else {
                    gast = parseInt(gast);
                }
            }
            datapointers['H'+(i+1)+'_LP'].setValue(heim);
            datapointers['G'+(i+1)+'_LP'].setValue(gast);
            updateEditById('H'+(i+1)+'_LP');
            updateEditById('G'+(i+1)+'_LP');
        }
        
        updatePopupSum();
    }
       
    var h_lp = 0;
    var g_lp = 0;
    var g_punkte = 0;
    var gespielte_gassen = 0;
    punkteBerechunung = new Array(anzahl_spieler*2)
    for(var i=0; i < anzahl_spieler; i++) {
        var temp = {id: 'H'+(i+1), mannschaft:'H'}
        temp.lp = +(datapointers[temp.id+'_LP'].getValue());
        punkteBerechunung[(i*2)] = temp;
        h_lp += temp.lp;
        for(var j=0; j < 8; j++) {
            var gtemp = datapointers[temp.id+'_GassenLP'].getValue()[j];
            if (gtemp && gtemp != '') {
                gespielte_gassen++;
            }
        }
        
        
        temp = {id: 'G'+(i+1), mannschaft:'G'}
        temp.lp = +(datapointers[temp.id+'_LP'].getValue());
        punkteBerechunung[(i*2)+1] = temp;
        g_lp += temp.lp;
        for(var j=0; j < 8; j++) {
            var gtemp = datapointers[temp.id+'_GassenLP'].getValue()[j];
            if (gtemp && gtemp != '') {
                gespielte_gassen++;
            }
        }
    }
    
    
    punkteBerechunung.sort(sorter);
    document.getElementById('H_LP').innerHTML = h_lp;
    document.getElementById('G_LP').innerHTML = g_lp;
    
    if (g_lp > h_lp) {
        g_punkte += 2;
    } else if (g_lp === h_lp) {
        g_punkte += 1;
    }
    

    wertungen = 0;
    gast_spieler = 0;
    for(var i=punkteBerechunung.length-1; i >= 0; i--) {
        datapointers[punkteBerechunung[i].id+'_ZP'].setValue(i+1);
        if (datapointers[punkteBerechunung[i].id+'_LP'].getValue() != '') {
            document.getElementById(punkteBerechunung[i].id+'_ZP').innerHTML = i+1;
        }else {
            document.getElementById(punkteBerechunung[i].id+'_ZP').innerHTML = "";
        }
        if (punkteBerechunung[i].mannschaft === 'H') {
            if (datapointers[punkteBerechunung[i].id+'_LP'].getValue() != '') {
                wertungen += gast_spieler;
            }
        }else {
            if (datapointers[punkteBerechunung[i].id+'_LP'].getValue() != '') {
                gast_spieler++;
            }
        }
    }
    verlorene_wertungen = wertungen;
    var g_zp = verlorene_wertungen + (anzahl_spieler == 6 ? 1+2+3+4+5+6 : 1+2+3+4);
    document.getElementById('G_ZP').innerHTML = g_zp;
    var h_zp = -verlorene_wertungen + (anzahl_spieler == 6 ? 7+8+9+10+11+12 : 5+6+7+8);
    document.getElementById('H_ZP').innerHTML = h_zp;
    
    
    var gassenGesammt = anzahl_spieler * 8 * 2;
    var progressGassen = gespielte_gassen / gassenGesammt * 100;
    progressGassen = progressGassen < 100 ? progressGassen : 100;
    var element = document.getElementById('progressGassen');
    element.innerHTML = gespielte_gassen +'/' + gassenGesammt + ' Gassen';
    element.setAttribute('style','width: '+ progressGassen +"%");

    var wertungenZumPunkt = 10;
    if (anzahl_spieler ==4) {
        wertungenZumPunkt = 6;
    }
    var progressPunktverlusst = verlorene_wertungen / wertungenZumPunkt * 100;
    progressPunktverlusst = progressPunktverlusst < 100 ? progressPunktverlusst : 100;
    element = document.getElementById('progressPunktverlusst');
    element.innerHTML = verlorene_wertungen +'/' + wertungenZumPunkt + ' Wertungen';
    element.setAttribute('style','width: '+ progressPunktverlusst +"%");

    if (verlorene_wertungen >= wertungenZumPunkt) {
        g_punkte++;
    }
    
    document.getElementById('G_PUNKTE').innerHTML = g_punkte;
    document.getElementById('H_PUNKTE').innerHTML = 3 - g_punkte;

}};

skgmh.load_storage = function() {with(skgmh) {
    selected_app = loadOrInitStorage('last_selected_app','Spielbericht');
    selected_club = loadOrInitStorage('last_selected_club','KSC 71 Saarn');
    anzahl_spieler = loadOrInitStorage('anzahl_spieler','6');
    for (var i=0; i < 6; i++) {
        data.HEIM[i] = {};
        data.HEIM[i].name = loadOrInitStorage('H'+(i+1)+'_NAME','');
        data.HEIM[i].zp = loadOrInitStorage('H'+(i+1)+'_ZP','');
        data.HEIM[i].lp = loadOrInitStorage('H'+(i+1)+'_LP','');
        data.HEIM[i].tipp = loadOrInitStorage('H'+(i+1)+'_TIPP','');
        data.HEIM[i].gassen = new Array(8);

        data.GAST[i] = {};
        data.GAST[i].name = loadOrInitStorage('G'+(i+1)+'_NAME','');
        data.GAST[i].zp = loadOrInitStorage('G'+(i+1)+'_ZP','');
        data.GAST[i].lp = loadOrInitStorage('G'+(i+1)+'_LP','');
        data.GAST[i].tipp = loadOrInitStorage('G'+(i+1)+'_TIPP','');
        data.GAST[i].gassen = new Array(8);

        for (var j=0; j < 8; j++) {
            data.HEIM[i].gassen[j] = loadOrInitStorage('H'+(i+1)+'_GassenLP'+(j+1),'');
            data.GAST[i].gassen[j] = loadOrInitStorage('G'+(i+1)+'_GassenLP'+(j+1),'');
        }
    }
    data.HEIMMANNSCHAFT = loadOrInitStorage('HM_NAME','HEIM');
    data.GASTMANNSCHAFT = loadOrInitStorage('GM_NAME','GAST');
}};

skgmh.store_all = function() {with(skgmh) {
    for (var i=0; i < 6; i++) {
        store_value('H'+(i+1)+'_NAME',data.HEIM[i].name);
        store_value('H'+(i+1)+'_ZP',data.HEIM[i].zp);
        store_value('H'+(i+1)+'_LP',data.HEIM[i].lp);
        store_value('H'+(i+1)+'_TIPP',data.HEIM[i].tipp);
        store_value('G'+(i+1)+'_NAME',data.GAST[i].name);
        store_value('G'+(i+1)+'_ZP',data.GAST[i].zp);
        store_value('G'+(i+1)+'_LP',data.GAST[i].lp);
        store_value('G'+(i+1)+'_TIPP',data.GAST[i].tipp);
        for (var j=0; j < 8; j++) {
            if (data.HEIM[i].gassen[j] == -99) {
                alert('H'+i +" " + j);
            }
            if (data.GAST[i].gassen[j] == -99) {
                alert('G'+i +" " + j);
            }
            store_value('H'+(i+1)+'_GassenLP'+(j+1),data.HEIM[i].gassen[j]);
            store_value('G'+(i+1)+'_GassenLP'+(j+1),data.GAST[i].gassen[j]);
        }
    }
    store_value('HM_NAME',data.HEIMMANNSCHAFT);
    store_value('GM_NAME',data.GASTMANNSCHAFT);
    store_value('last_selected_app',selected_app);
    document.getElementById('downloadDataLink')['href'] = 'data:application/octet-stream;base64,'+Base64.encode(JSON.stringify(localStorage));
}};

skgmh.store_value = function (which,value) {
    if (value == -99) {
        alert('store-99:'+which);
    }
  localStorage.setItem(which,value);
};

skgmh.loadOrInitStorage = function (which,defaultValue) {
    var temp = localStorage.getItem(which);
    if (temp == null) {
        temp = defaultValue;
        localStorage.setItem(which,temp);
    }
    return temp;
};

skgmh.selectApp = function(which) {with(skgmh) {
    setInnerHtmlForId('SelectedApp',which);
    if (which == 'Spielbericht') {
        
    }else if (which == 'Hochrechnung') {
    }else if (which == 'Tippabgabe') {
        var elements = getElementsByAttribute(document,'popup','LP_Eingabe');
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var element = elements[i];
//            skgmh.inlineEdit.init(element,wrapValueTransfer(element,datapointers[element.id],recalculateValues));
        }


    }else {
        alert(which + " nicht bekannt");
    }
    fillDataIntoForm();
    recalculateValues();
}};

skgmh.selectClub = function(which) {with(skgmh) {
    setInnerHtmlForId('SelectedClub',which);
//    updateEditById('HM_NAME',which);
}};

skgmh.setInnerHtmlForId = function(id,value) {
    document.getElementById(id).innerHTML = value;
}

skgmh.test_storage = function() {with(skgmh) {
    return "test";
}};

skgmh.getElementsByClassName = function (node,classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}

skgmh.getElementsByAttribute = function (node,attribute,value) {
    return (function getElementsByClass(searchAttribute,value,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+value+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].getAttribute(searchAttribute) ) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(attribute, value,node);
}

skgmh.inlineEdit.init = function(element,onchange) {with(skgmh.inlineEdit){
    var icon = document.createElement('i');
    icon.setAttribute('id', element.id + '_pencil');
    icon.setAttribute('class','icon-pencil');
    icon.setAttribute('style','visibility: hidden');
//        icon.setAttribute('style','text-align: right');
    element.appendChild(icon);
    element.onmouseover = mouseover;
    element.onmouseout = mouseout;
    element.toModelCallback = onchange.toModel;
    element.fromModelCallback = onchange.fromModel;
}};

skgmh.inlineEdit.test = function(newValue) {
    alert(newValue);
}

skgmh.inlineEdit.mouseover = function (){ with(skgmh.inlineEdit){
    var pid = this.id+'_pencil';
    var pencil = document.getElementById(pid);
    pencil.setAttribute('style','visibility: visible');
    pencil.parentNode.onclick = edit;
}};


skgmh.inlineEdit.edit = function() { with(skgmh.inlineEdit) {
    if (this.getAttribute('popUp') && skgmh.selected_app != 'Tippabgabe') {
        var popUpName = this.getAttribute('popUp');
        var popUpParam = this.getAttribute('popUpParam');
        document.getElementById(popUpName).setAttribute('popUpParam',popUpParam);
        skgmh.updatePopup(popUpName);
        $('#'+popUpName).modal({
            keyboard: true
        });
    }else {
        var input_id = this.id+"_edit";
        var input = document.getElementById(input_id);
        if (!input) {
            var input = document.createElement('input');
            input.setAttribute('id', input_id);
            if (this.fromModelCallback) {
                input.setAttribute('value',this.fromModelCallback());
            }
            this.appendChild(input);
            input.onkeydown = keydown;
            var numEdit = this.getAttribute('numEdit');
            if (numEdit) {
               input.setAttribute('style','width: '+(numEdit*8)+'px');
            }
            input.focus();
            input.select();
            input.onblur = removeInput;
        }
    //    el = document.getElementById("overilay");
    //    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";    
    //    alert(this.id);
    }
}};

skgmh.updatePopup = function(popUpName) {with(skgmh) {
    var blockIndex = document.getElementById(popUpName).getAttribute('popUpParam') -1;

    var maxBahnInBlock = 3 + (blockIndex) * 4;
    var maxGasseInBlock = 1 + maxBahnInBlock * 2;
    
    var minBahnInBlock = maxBahnInBlock -3;
    var minGasseInBlock = (minBahnInBlock * 2);
    
    var dGassenWechselInBlock = skgmh.gespielte_gassen/4;
    var gassenWechselInBlock = parseInt(dGassenWechselInBlock) - minGasseInBlock;

    gassenWechselInBlock = gassenWechselInBlock < 7 ? gassenWechselInBlock : 7;
    gassenWechselInBlock = gassenWechselInBlock > 0 ? gassenWechselInBlock : 0;
    var dBahnWechselInBlock = gassenWechselInBlock / 2;

    var bahnWechselInBlock = parseInt(dBahnWechselInBlock);
    
    var ersterSpieler = blockIndex * 2;
    var letzterSpieler = ersterSpieler +1;

    var spielerH1 = skgmh.data.HEIM[ersterSpieler];
    var spielerH2 = skgmh.data.HEIM[letzterSpieler];
    var spielerG1 = skgmh.data.GAST[ersterSpieler];
    var spielerG2 = skgmh.data.GAST[letzterSpieler];
    
    var nameH1 = spielerH1.name;
    var nameH2 = spielerH2.name;
    var nameG1 = spielerG1.name;
    var nameG2 = spielerG2.name;
    
    var posG1 = ((0+bahnWechselInBlock) % 4) +1;
    var posH1 = ((1+bahnWechselInBlock) % 4) +1;
    var posG2 = ((2+bahnWechselInBlock) % 4) +1;
    var posH2 = ((3+bahnWechselInBlock) % 4) +1;
  
    var eleG1 = document.getElementById('NameSpielerBahn'+posG1);
    var eleH1 = document.getElementById('NameSpielerBahn'+posH1);
    var eleG2 = document.getElementById('NameSpielerBahn'+posG2);
    var eleH2 = document.getElementById('NameSpielerBahn'+posH2);
    eleG1.innerHTML = nameG1;
    eleH1.innerHTML = nameH1;
    eleG2.innerHTML = nameG2;
    eleH2.innerHTML = nameH2;

    var temp = null;
    for(var i = 0; i < 8; i++) {
        initPopUpEdit(ersterSpieler,posH1,i,skgmh.data.HEIM[ersterSpieler],'H');
        initPopUpEdit(letzterSpieler,posH2,i,skgmh.data.HEIM[letzterSpieler],'H');
        initPopUpEdit(ersterSpieler,posG1,i,skgmh.data.GAST[ersterSpieler],'G');
        initPopUpEdit(letzterSpieler,posG2,i,skgmh.data.GAST[letzterSpieler],'G');
    }
    
    updatePopupSum();
}}

skgmh.initPopUpEdit = function(spielerIndex,bahn,gassenIndex,dataReference,heimgast) {with(skgmh){
    var isRaeumen = (gassenIndex % 2) == 1;
    var feldid = 'SpielerBahn'+bahn+(isRaeumen?'R':'V')+((parseInt(gassenIndex/2))+1);
    var temp = document.getElementById(feldid);
    temp.innerHTML = '<span/>';
//    temp.innerHTML = dataReference.gassen[gassenIndex];
    var dataid = heimgast+(spielerIndex+1)+'_GassenLP_'+(gassenIndex+1);
    inlineEdit.init(temp,wrapValueTransfer(temp,datapointers[dataid],recalculateValues));
    updateEditByIdPopup(feldid,dataid);
}}

skgmh.inlineEdit.keydown = function(event) {
    switch (event.keyCode) {
        case 9:
        case 13:
            if (this.parentNode.toModelCallback) {
                this.parentNode.toModelCallback(this.value);
            }
            // fallthrough blur
        case 27:
            this.blur();        
            break;
    }
}

skgmh.inlineEdit.removeInput = function() {
    this.parentNode.removeChild(this);
}

skgmh.inlineEdit.mouseout = function (){
    var pid = this.id+'_pencil';
    var pencil = document.getElementById(pid);
    pencil.setAttribute('style','visibility: hidden');
};
