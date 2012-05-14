chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.sendRequest(info.tabId, {req:'settab', tabid:info.tabId}, function(response) {
    });
});

if (localStorage.filter == "null"){
    localStorage.filter = ".+";
}

var DEBUG = true;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (DEBUG) console.debug(request.req);
    
    if(request.req == "save_filter") {
        localStorage.filter = request.data;
    }
    
    if(request.req == "load_filter") {
        if (localStorage.filter == "null"){
            localStorage.filter = ".+";
        }
        //console.debug(localStorage.filter);
        sendResponse(localStorage.filter);
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (DEBUG) {
            console.debug("resource", details);
            console.debug("filter",filter);
        }
        
        var filter = new RegExp(localStorage.filter, "g");

        if (!details.url.match(filter))  {
            if (DEBUG) console.debug("FALSE" + details.url);
            return;
        }

        chrome.tabs.getSelected(null, function(tab) {	  
            chrome.tabs.sendRequest(tab.id, {req:'web', data: details, tabId:tab.id}, function(response) {
            });
        });
    },
    {urls: ["<all_urls>"]}
);