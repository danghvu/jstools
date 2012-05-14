$(function() {	

var libraries = {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
        prototype: 'https://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js',
        dojo: 'https://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.xd.js',
        mootools: 'https://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js',
        crypto: 'https://www.res.vudang.com/jsconsole_crypto/crypto.js',
};

create_placeholder = function() {
    $("body").append("<div id='jstools_libraries'> </div>");
};

load_js = function(jsid) {
    var ph = $("#jstools_libraries");
    if (ph.length == 0) {
        create_placeholder();
        ph = $("#jstools_libraries");
    }

    ph.append("<scri"+"pt src='"+libraries[jsid]+"'></sc"+"ript>");
    //ph.append(url);
    
};

unload_js = function(jsid) {
};

refresh_js = function(list_jsid) {

    for (var i=0; i<list_jsid.length; i++ ){
        load_js(list_jsid[i]);
    }

};

chrome.extension.onRequest.addListener(
    function get(request, sender, sendResponse) {
        if (request.cmd == 'refresh') {
            refresh_js( request.data.list_jsid );
        }
        if (request.cmd == 'load'){
            load_js( request.data.jsid );
        }
        if (request.cmd == 'unload') {
            unload_js( request.data.jsid ); 
        }
    }
);

load_js("jquery");

});
