function load_js ( lib ) {
    console.log("add " + lib);
}

function unload_js ( lib ) {
    console.log("remove " + lib);
}

function update_state( e ) {
    var lib = e.data.lib;
    var load_lib = e.data.load_lib;
    if ($(this).is(":checked")) 
        load_js(lib[load_lib]);
    else
        unload_js(lib[load_lib]);
}

$( function() {
    chrome.extension.sendRequest({query:"load_settings"}, function (response){
        lib = JSON.parse(response.lib);
        load_lib = JSON.parse(response.load_lib);

        for (var key in lib) {
            console.log(key,lib[key], load_lib[key]);
            var checked="";
            if (load_lib[key])
                checked="checked"; 

            $("#options").append("<input type=\"checkbox\" id=\"item_"+ key +"\" value=\"" + key +" " + checked + "\"/>" + key + "<br/>");
            $("#item_"+key).change( { lib:lib, load_lib :key} , update_state );
        }
    });
});





