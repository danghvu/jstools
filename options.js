var bg = chrome.extension.getBackgroundPage();
var libraries = bg.settings.def_lib;

function populate() {
    bg.settings["lib"] = libraries;
}

function remove_lib(e) {
    $("#item_"+e.data).empty();
}

function report(msg, class_name) {
    var status = $("#status");
    status.html(msg); status.css("display", "inline");
    if (class_name) {
        status.attr("class", class_name);
    }
    setTimeout( function() {status.fadeOut('slow');}, 3000);
}

// Restores select box state to saved value from localStorage.
function restore_options(displaylib) {

    if (!displaylib) {
        lib = localStorage["lib"];
        if (!lib) lib = libraries;
        else lib = JSON.parse(localStorage["lib"]);
    } else 
        lib = displaylib;
    
    var options = $("#lib");
    options.empty();

    for (var key in lib){
        options.append("<div id='item_"+key+"'></div>");
        var item = $("#item_"+key);
        item.append("<label for='"+key+"'>"+key+"</label><input id='"+key+"' name='"+key+"'type='text' value='"+ lib[key] +"' size=100 />");
        item.append("<button id='remove_"+key+"'> Remove </botton>");
        $("#remove_"+key).click( key, remove_lib );
    }
}

// Saves options to localStorage.
function save_options() {

    var settings = {};

    $("[id^=item_]").each( function() {
        var input = $(this).find("input");
        if (input.length == 0) return;
        else input = input[0];

        settings[input.id] = input.value;
    });

    localStorage["lib"] = JSON.stringify( settings );
    report("Options Saved", "green");
    populate();
}

function isUrl(value) {
    //simple check TODO: more comprehensive
    return (value.substring(0,4) == "http");
}

function insert_lib() {
    var current = JSON.parse(localStorage["lib"]);

    var key = $("#new_key");
    if (key.length == 0 || !key.val() || key.val().length == 0) {
        report("Error: Empty or Incorrect value for key", "red");
        return;
    }
    var val = $("#new_val");
    if (val.length == 0 || !val.val() || val.val().length == 0 || !isUrl(val.val()) )  {
        report("Error: Empty or Incorrect value for url", "red");
        return;
    }

    current[key.val()] = val.val();

    localStorage["lib"] = JSON.stringify(current);
    restore_options();
    report("Option Saved", "green");
    populate();
}

function res_default() {
    restore_options(libraries);
}

function request_handler(request, sender, sendResponse) {
    switch (request.query) {
        case "load_options":
            var opt = JSON.parse(localStorage["lib"]);
            sendResponse(opt);
        default:
            console.log("Invalid request", request, sender);
    }
}


$(function() {
    restore_options();

    $("#save").click( save_options );
    $("#restore").click( res_default );
    $("#new_button").click( insert_lib ); 

});
