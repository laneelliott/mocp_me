// $(document).ready(function() {
  //Grab the file and asynchronously convert to base64.
  function sendUploadedImage(image) {
  var file = image[0].files[0];
  var reader = new FileReader()
  reader.onloadend = processFile
  reader.readAsDataURL(file);
  console.log(reader);
}

// //Encodes the new base 64img
function processFile(event) {
  var encodedFile = event.target.result;
  //console.log(encodedFile);
  postBASE64(encodedFile);
}

function postBASE64(encodedFile){
    //Post information to route.
    $.post("/api/new", encodedFile)
      .then();
}

// // Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');
 
// // Creates a client
// const client = new vision.ImageAnnotatorClient();
 
// // Performs label detection on the image file
// client
//   .labelDetection('./resources/wakeupcat.jpg')
//   .then(results => {
//     const labels = results[0].labelAnnotations;
 
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });


