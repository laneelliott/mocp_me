// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./app/models")

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory to be served
app.use(express.static("app/public"));

// Routes
require("./app/routes/api-routes.js")(app);

// Here we introduce HTML routing to serve different HTML files
//require("./app/routes/html-routes.js")(app);

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~* 
// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');
 
// Creates a client
// const client = new vision.ImageAnnotatorClient();
 
// Performs label detection on the image file
  
// client
//   .labelDetection('https://static.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg')
//   .then(results => {
//     const labels = results[0].labelAnnotations;
 
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
    // Imports the Google Cloud client library
    // const vision = require('@google-cloud/vision');
     
    // Creates a client
    // const client = new vision.ImageAnnotatorClient();
     
    // Performs label detection on the image file
    // client
    //   .labelDetection('https://static.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg')
    //   .then(results => {
    //     const labels = results[0].labelAnnotations;
     
    //     console.log('Labels:');
    //     labels.forEach(label => console.log(label.description));
    //   })
    //   .catch(err => {
    //     console.error('ERROR:', err);
    //   });
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

    // ========== Returning image from database ==========
    var returnedVisionTag = "tree";   // this is a placeholder
    
    var returnedImageName = null;
    var returnedImagePath = null;

    // var returnedVisionTag = "test-one";   // this is a placeholder

      //searching "Tags" for our returned vision tag
      db.Tags.findAll({
        where: {
          tag_name: returnedVisionTag
        }
      })
      .then(function(dbTags) {
        // return the image ID of that tag
        var returnedImageID = JSON.stringify(dbTags[0].photo_id);
        db.Photos.findAll({
          where: {
            id: returnedImageID
          }
        })
        .then(function(dbPhoto){
          // search "Photos" for that image ID and return the web path and name
          returnedImageName = JSON.stringify(dbPhoto[0].name);
          returnedImagePath = JSON.stringify(dbPhoto[0].web_path);
          console.log(returnedImageName);
          console.log(returnedImagePath);
        })
      });

  });
});

