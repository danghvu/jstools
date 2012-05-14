chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.sendRequest(info.tabId, {req:'settab', tabid:info.tabId}, function(response) {
    });
});

if (localStorage.filter == "null"){
    localStorage.filter = ".+";
}

var DEBUG = true;

var libraries = {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
    prototype: 'https://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js',
    dojo: 'https://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.xd.js',
    mootools: 'https://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js',
    crypto: 'http://www.res.vudang.com/jsconsole_crypto/crypto.js',
};

function init_lib() {
    localStorage["lib"] = JSON.stringify(libraries);
    var load_lib = libraries;
    for (key in load_lib) 
        load_lib[key] = false;
    localStorage["load_lib"] = JSON.stringify(load_lib);
}

var settings = {
    get def_lib() {
        return libraries;
    },
    get lib() {
        if (!localStorage["lib"]) 
            init_lib();
        return localStorage["lib"];
    },
    set lib(val) {
        localStorage["lib"] = val;
    },
    set load_lib(lib) {
        if (localStorage["load_lib"])         
            var check_lib = JSON.parse(localStorage["load_lib"]);
       
        check_lib[lib] = true;
        localStorage["load_lib"] = JSON.stringify(check_lib);
    },
    get load_lib() {
        if (!localStorage["load_lib"])
            init_lib();
        return localStorage["load_lib"];
    }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (DEBUG) console.debug(request.query);

    switch( request.query ) {
        case "load_settings": 
            sendResponse({lib: settings.lib, load_lib:settings.load_lib});
            break;
        default:
            console.log("Invalid Response", request, sender);
    }
    
});
