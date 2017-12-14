// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection('https://storage.googleapis.com/mocp_images/MOCP_IMAGES/2011_145_64_lg.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description + ' | Percentage: %' + label.score * 100));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });