var filter ='';

$( function() {
    chrome.extension.sendRequest({req: "load_filter"}, function (response){
	    filter = response;
	    $('#filter').val(filter);
    });

    console.debug($('#settings'));    
    $('#settings').submit( function(event) {
        console.debug("here");
        chrome.extension.sendRequest({req:"save_filter", data:$('#filter').val()}); 
    });
});





