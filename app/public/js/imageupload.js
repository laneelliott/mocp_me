// $(document).ready(function() {
  //Grab the file and asynchronously convert to base64.
  function sendUploadedImage(image) {
  var file = image[0].files[0];
  var reader = new FileReader()
  // reader.onloadend = processFile
  reader.readAsDataURL(file);
  console.log(reader);
}

// //Encodes the new base 64img
function postBASE64(encodedFile){
    //Post information to route.
    $.post("/api/new", encodedFile)
      .then();
}


