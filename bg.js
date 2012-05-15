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

var settings = {
    get lib() {
        if (!this._lib)
            this._lib = libraries;
        return this._lib;
    },
    set lib(val) {
        lib = val;
    },
    get checked() {
        if (!this._checked)
            this._checked = {};
        return this._checked;
    },
}

settings.save = function() {
    localStorage["load_lib"] = JSON.stringify(this._checked);
    localStorage["lib"] = JSON.stringify(this._lib);
}

settings.load = function() {
    this._checked = JSON.parse(localStorage["load_lib"]);
    this._lib = JSON.parse(localStorage["lib"]);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (DEBUG) console.debug(request.query);
    settings.load();

    switch( request.query ) {
        case "load_settings": 
            sendResponse({lib: settings.lib, load_lib:settings.checked});
            break;
        case "settings_loadlib":
            settings._checked[request.data.id] = true;
            settings.save();
            break;
        case "settings_unloadlib":
            settings._checked[request.data.id] = false;
            settings.save();
            break;
        default:
            console.log("Invalid Response", request, sender);
    }
    
});
