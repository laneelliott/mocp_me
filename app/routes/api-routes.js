var db = require("../models");
// ***ADDED BY HOLLY****
var Hashtags = require("../models/mocptags.js");


// Routes
module.exports = function(app) {

  // Search for Specific Photos (or all Photos) then provides JSON
  app.get("/api-all", function(req, res) {
    db.Tags.findAll({}).then(function(dbTags) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTags);
    });
  });

  // Get the images of a particular keyword
  app.get("/api/tags/:tag_name", function(req, res) {
    db.Tags.findAll({
      where: {
        tag_name: req.params.tag_name
      }
    }).then(function(dbTags) {
      db.Photos.findAll({
        where: {
          id: dbTags[0].photo_id
        }
      }).then(function(photoId){
        res.json(photoId);
      });
    });
  });

  app.get("/api/return-all-tags-from-id/:photo_id", function(req, res) {
    db.Tags.findAll({
      where: {
        photo_id: req.params.photo_id
      }
    }).then(function(dbTags) {
      res.json(dbTags);
    });
  });



// *****STUFF HOLLY ADDED STARTS HERE****** //
  // If a user sends data to add a new hashtag...
  app.post("/api/new", function(req, res) {

    // console.log(req);
    // console.log(res);
    // Take the request...
    var tags = req.body;

    // Create a routeName
    var routeName = tags.name.replace(/\s+/g, "").toLowerCase();

    // Then add the hashtags to the database using sequelize
    Hashtags.create({
      routeName: routeName,
      tag_name: tags.tag_name,
    });
// ****STUFF HOLLY ADDED ENDS HERE ****** //
  });

};
