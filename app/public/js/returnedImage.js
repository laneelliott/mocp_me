
var returnedImageURL = null; 

function getURL() {
    $.get("/...", function(data) {
      returnedImageURL = data;
      $("#mocp-image-one").attr('src', returnedImageURL);
    });
}