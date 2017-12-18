
var returnedImageURL = null; 

function getURL() {
    $.get("/api/tags/test-one", function(data) {
      var returnedImageURL = JSON.stringify(data[0].web_path);
      console.log(returnedImageURL);
      $("#mocp-image-one").attr('src', returnedImageURL);
    });
}