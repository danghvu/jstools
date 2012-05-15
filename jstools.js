$(function() {	

create_placeholder = function() {
    $("body").append("<div id='jstools_libraries'> </div>");
};

load_js = function(url, jsid) {
    var ph = $("#jstools_libraries");
    if (ph.length == 0) {
        create_placeholder();
        ph = $("#jstools_libraries");
    }

    ph.append("<scri"+"pt src='"+url+"' id='"+jsid+"'></sc"+"ript>");
};

unload_js = function(jsid) {
    $("id="+jsid).remove();
};

chrome.extension.sendRequest({query:"load_settings"}, function (response) {
    lib = response.lib;
    checked = response.load_lib;

    for (var key in lib) {
        if (checked[key] === true) {
            load_js(lib[key], key);
        }
    }
});

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
//        console.log(request);
        switch( request.query ) {
            case "load_js":
                load_js( request.data.url, request.data.id);
                console.log("loadjs", request);
                break;
            case "unload_js":
                unload_js(request.data.id); 
                console.log("unloadjs", request);
                break;
            default:
                console.log("Invalid request", request, sender);
        }
    }
);

});
