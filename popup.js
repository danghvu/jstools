function sendquery_selectedtab( query , data ) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {query: query, data:data }, function(response) {});
    });
}

function update_state( e ) {
    var lib = e.data.lib;
    var load_lib = e.data.load_lib;
    if ($(this).is(":checked")) {
        sendquery_selectedtab( "load_js", {url:lib[load_lib], id:load_lib} );
        chrome.extension.sendRequest({query:"settings_loadlib", data:{id:load_lib}}, function(response){});
    }
    else {
        sendquery_selectedtab( "unload_js", {url:lib[load_lib], id:load_lib} ); 
        chrome.extension.sendRequest({query:"settings_unloadlib", data:{id:load_lib}}, function(response){});
    }
}

$( function() {
    chrome.extension.sendRequest({query:"load_settings"}, function (response){
        lib = response.lib;
        load_lib = response.load_lib;

        for (var key in lib) {
            var checked="";
            if (load_lib[key])
                checked="checked"; 
            console.log( key, load_lib[key] );

            $("#options").append("<input type=\"checkbox\" id=\"item_"+ key +"\" value=\"" + key +"\" " + checked + "/>" + key + "<br/>");
            $("#item_"+key).change( { lib:lib, load_lib :key} , update_state );
        }
    });
});





