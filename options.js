// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("color");
    var color = select.children[select.selectedIndex].value;
    localStorage["favorite_color"] = color;

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
            status.innerHTML = "";
            }, 750);
}

var libraries = {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
    prototype: 'https://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js',
    dojo: 'https://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.xd.js',
    mootools: 'https://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js',
    crypto: 'https://www.res.vudang.com/jsconsole_crypto/crypto.js',
};

function remove_lib(e) {
    console.log(e.data);
    $("#item_"+e.data).empty();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    lib = localStorage["lib"];

    if (!lib) lib = libraries;
    
    var options = $("#lib");

    for (var key in lib){
        options.append("<div id='item_"+key+"'></div>");
        var item = $("#item_"+key);
        item.append("<label for='"+key+"'>"+key+"</label><input id='"+key+"' name='"+key+"'type='text' value='"+ lib[key] +"' size='100' />");
        item.append("<button id='remove_"+key+"'> Remove </botton>");
        $("#remove_"+key).click( key, remove_lib );
    }
}

$(function() {
    restore_options();

    $("#save").click( save_options );
});
