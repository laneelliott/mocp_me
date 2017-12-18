
function getURL(tag) {
    $.get("/api/tags/"+tag, function(data) {
    	console.log(data[0].web_path)
    	$("#mocp-image-one").attr("src", data[0].web_path);
    });
}


// Uncomment this to run the function on page load for testing.
//getURL();