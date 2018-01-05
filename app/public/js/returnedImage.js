
// function getTags(allTagsFromID) {
//     $.get("/api/return-all-tags-from-id/"+allTagsFromID, function(data) {
//     	for (i = 0; i< data.length; i++){
//     		console.log("success" + data[i].tag_name);
//     		$("#tags-one").append("# " +data[i].tag_name + " ");
//     	}
//     });
// }

function getURL(tag) {
    $.get("/api/tags/"+tag, function(data) {
    	// console.log(data[0].web_path);
    	// var photoName = data[0].name;
    	// var artistName = data[0].artist_id;
    	var allTagsFromID = data[0].id;
    	$("#mocp-image-one").attr("src", data[0].web_path);
    	$("#photo-name").append(data[0].name);
    	$("#artist-name").append(data[0].artist_id);

    	$.get("/api/return-all-tags-from-id/"+allTagsFromID, function(data) {
	    	for (i = 0; i< data.length; i++){
	    		console.log(data[i].tag_name);
	    		$("#tags-one").append("#" +data[i].tag_name + "  ");
	    	}
	    });
    });

}

getURL("tag-one");
// getTags("1");

// Uncomment this to run the function on page load for testing.
//getURL();