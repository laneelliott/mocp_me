// $(document).ready(function() {
//   //Grab the file and asynchronously convert to base64.
//   var file = $("#fileInput")[0].files[0];
//   console.log(file);
//   var reader = new FileReader()
//   reader.onloadend = processFile
//   reader.readAsDataURL(file);
//   console.log(reader);


//Encodes the new base 64img
function processFile(event) {
  // var encodedFile = event.target.result;
  
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
 
// Creates a client
const client = new vision.ImageAnnotatorClient();
 
// Performs label detection on the image file
client
  .labelDetection('http://is4.mzstatic.com/image/thumb/Purple127/v4/74/47/31/7447317e-9844-3ee0-d189-661a55c94abe/source/1200x630bb.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;
 
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}

processFile();


