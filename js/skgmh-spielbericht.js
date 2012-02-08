var skgmh = skgmh || {};

skgmh.selected_app = null;
skgmh.selected_club = null;
skgmh.anzahl_spieler = 6;
skgmh.dritter_block = new Array();
skgmh.inlineEdit = {};
skgmh.data = {"HEIM" : new Array(6) , "GAST":new Array(6)};

skgmh.init_app = function() {with(skgmh) {
    skgmh.load_storage();
    bind();
    fillDataIntoForm();
}};

skgmh.fillDataIntoForm = function () {with(skgmh) {
    selectApp(selected_app);
    selectClub(selected_club);
    for (var i=0; i < 6; i++) {
        updateEditById('H'+(i+1)+'_NAME');
        updateEditById('G'+(i+1)+'_NAME');
    }
    updateEditById('HM_NAME');
    updateEditById('GM_NAME');
    if (anzahl_spieler == 4) {
        remove3Block();
    }
}};

skgmh.updateEditById = function(fieldid) {with(skgmh) {
    updateEdit(document.getElementById(fieldid),getDataPointerById(fieldid).getValue());
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
        skgmh.inlineEdit.init(element,wrapValueTransfer(element,getDataPointerById(element.id)));
    }
    
    document.getElementById('remove_P5_P6_button').onclick = remove3Block;
}};

skgmh.getDataPointerById = function (elementid) {with(skgmh) {
    var createSetFunc = function (dataPointer) {
        return function(value) {
            dataPointer.pointer[dataPointer.field_name] = value;
        }
    };
    var createGetFunc = function (dataPointer) {
        return function() {
            return dataPointer.pointer[dataPointer.field_name];
        }
    }
    var pointer = null;
    for (var i=0; i < 6 && pointer == null; i++) {
        if ('H'+(i+1)+'_NAME' === elementid) pointer = {'pointer':data.HEIM[i], field_name:'name'};
        if ('H'+(i+1)+'_ZP' === elementid) pointer = {'pointer':data.HEIM[i], field_name:'zp'};
        if ('H'+(i+1)+'_LP' === elementid) pointer = {'pointer':data.HEIM[i], field_name:'lp'};
        if ('G'+(i+1)+'_NAME' === elementid) pointer = {'pointer':data.GAST[i], field_name:'name'};
        if ('G'+(i+1)+'_ZP' === elementid) pointer = {'pointer':data.GAST[i], field_name:'zp'};
        if ('G'+(i+1)+'_LP' === elementid) pointer = {'pointer':data.GAST[i], field_name:'lp'};
    }
    if ('HM_NAME' === elementid) pointer = {'pointer':data, field_name:'HEIMMANNSCHAFT'};
    if ('GM_NAME' === elementid) pointer = {'pointer':data, field_name:'GASTMANNSCHAFT'};
    if (pointer != null) {
        pointer.setValue = createSetFunc(pointer);
        pointer.getValue = createGetFunc(pointer);
        return pointer;
    }
}}

skgmh.wrapValueTransfer = function(element,data_pointer) {
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
    }
    wrapper.fromModel =function() {
        if (data_pointer) {
            return data_pointer.getValue();
        }
    }
    return wrapper;
}

skgmh.remove3Block = function() {with(skgmh){
    var elements = getElementsByClassName(document,'dritterBlock');
    var n = elements.length;
    for (var i = n-1; i >= 0; i--) {
        dritter_block.push(elements[i].parentNode.removeChild(elements[i]));
    }
    var icon = document.createElement('i');
    icon.setAttribute('class','icon-plus');
    document.getElementById('insert_P5_P6_button').appendChild(icon);
    icon.onclick = insert3Block;
    store_value('anzahl_spieler',4);
}};

skgmh.insert3Block = function() {with(skgmh){
    var dom = document.getElementById('tablebody');
    var n = dritter_block.length;
    for (var i = n-1; i >= 0; i--) {
        dom.appendChild(dritter_block.pop());
    }
    document.getElementById('insert_P5_P6_button').innerHTML = '';
    store_value('anzahl_spieler',6);
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
        data.GAST[i] = {};
        data.GAST[i].name = loadOrInitStorage('G'+(i+1)+'_NAME','');
        data.GAST[i].zp = loadOrInitStorage('G'+(i+1)+'_ZP','');
        data.GAST[i].lp = loadOrInitStorage('G'+(i+1)+'_LP','');
    }
    data.HEIMMANNSCHAFT = loadOrInitStorage('HM_NAME','HEIM');
    data.GASTMANNSCHAFT = loadOrInitStorage('GM_NAME','GAST');
}};

skgmh.store_all = function() {with(skgmh) {
    for (var i=0; i < 6; i++) {
        store_value('H'+(i+1)+'_NAME',data.HEIM[i].name);
        store_value('H'+(i+1)+'_ZP',data.HEIM[i].zp);
        store_value('H'+(i+1)+'_LP',data.HEIM[i].lp);
        store_value('G'+(i+1)+'_NAME',data.GAST[i].name);
        store_value('G'+(i+1)+'_ZP',data.GAST[i].zp);
        store_value('G'+(i+1)+'_LP',data.GAST[i].lp);
    }
    store_value('HM_NAME',data.HEIMMANNSCHAFT);
    store_value('GM_NAME',data.GASTMANNSCHAFT);
}};

skgmh.store_value = function (which,value) {
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
}};

skgmh.selectClub = function(which) {with(skgmh) {
    setInnerHtmlForId('SelectedClub',which);
//    setInnerHtmlForId('HeimMannschaft_Name',which);
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
        input.focus();
        input.select();
        input.onblur = removeInput;
    }
//    el = document.getElementById("overlay");
//    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";    
//    alert(this.id);
}};

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


