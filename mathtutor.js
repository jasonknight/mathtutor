var plugins = [];

function randomInteger() {
    return Math.floor(Math.random(1000) * 10000);
}
function registerPlugin(name,cb) {
    for (var i = 0; i < plugins.length;i++) {
        var cp = plugins[i];
        if ( cp && cp.name == name) {
            return;
        }
    }
    plugins.push({ name: name, callback: cb});
}

function get(el) {
    var res = $(el).data("settings");
    if ( ! res ) {
        return {};
    }
    return res;
}
function set(el,v) {
    $(el).data("settings",v);
}

function row(id) {
    if ( !id ) {
        id = "row_" + randomInteger();
    }
    return $('<tr id="' + id + '"></tr>');
}
function col(content,id) {
    if ( !id ) {
        id = "row_" + randomInteger();
    }
    if ( typeof content == 'string') {
        return $('<td id="' + id + '">' + content + '</td>');
    } else {
        var el = $('<td id="' + id + '"></td>');
        el.append(content);
        return el;
    }
    
}
function createControlInput(lbl,fn) {
    var inp = $('<input type="text" />');
    var label = col(lbl)
    var icol = col(inp);
    inp.on('keyup',fn);
    return [inp,label,icol];
}
function createControlSelect(lbl,opts,fn) {
    var inp = $('<select></select>');
    var label = col(lbl)
    var icol = col(inp);
    for (var i = 0; i < opts.length; i++) {
        if ( i == 0 ) {
            inp.append('<option selected=selected>' + opts[i] + '</option>');
        } else {
            inp.append('<option>' + opts[i] + '</option>');
        }
        
    }
    inp.on('change',fn);
    return [inp,label,icol];
}
function button(lbl,fn) {
    var btn = $('<button></button>');
    btn.html(lbl);
    btn.on('click',fn);
    return btn;
}
$(function () {

    for ( var i = 0; i < plugins.length; i++) {
        var cp = plugins[i];
        if ( cp ) {
            cp.callback();
        }
    }
    $('ul.control-list li').each(function (i,el) {
        $(el).on('click',function () {
            var t = $(this).attr('data-target');
            $('.control-tab').hide();
            $(t).show();
        });
    });
});