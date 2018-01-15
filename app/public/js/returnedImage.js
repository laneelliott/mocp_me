

function getURL(tag) {
    $.get("/api/get-tags/"+tag, function(data) {
    	// console.log(data[0].web_path);
    	// var photoName = data[0].name;
    	// var artistName = data[0].artist_id;
    	var allTagsFromID = data[0].id;
    	$("#mocp-image-one").attr("src", data[0].web_path);
    	$("#photo-name").append(data[0].name);
    	$("#artist-name").append(data[0].artist_id);

    	$.get("/api/return-all-tags-from-id/"+allTagsFromID, function(data) {
	    	for (i = 0; i< data.length; i++){
	    		//console.log(data[i].tag_name);
	    		$("#tags-one").append("#" +data[i].tag_name + "  ");
	    	}
	    });
    });
}

function allTags(arrayString) {
    console.log("All Tags");
    console.log(arrayString);

    $.get("/api/get-tags/"+arrayString, function(data) {
        // var allTagsFromID = data[0].id;
        // $("#mocp-image-one").attr("src", data[0].web_path);
        // $("#photo-name").append(data[0].name);
        // $("#artist-name").append(data[0].artist_id);
    });
}
// ~~~~~~~~~~~~~~~~~~~~ Dont worry about this - Amanda ~~~~~~~~~~~~~~~~~~~~~
// function submitPost(post) {
// 	$.post("/api/new-hashtags", post, function() {
//   		db.Hashtags.create(req.body).then(function(dbHashtags) {
//     	  res.json(dbHashtags);
//     	});
// 	});
// }

// submitPost("hello world");
// ~~~~~~~~~~~~~~~~~~~~ Dont worry about this - Amanda ~~~~~~~~~~~~~~~~~~~~~


