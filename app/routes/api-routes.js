var db = require("../models");


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


  // If a user sends data to add a new Photo...
  app.post("/api/new", function(req, res) {

    // console.log(req);
    // console.log(res);
    // // Take the request...
    // var Photos = req.body;

    // // Create a routeName
    // var routeName = Photos.name.replace(/\s+/g, "").toLowerCase();

    // // Then add the Photos to the database using sequelize
    // Photos.create({
    //   routeName: routeName,
    //   name: Photos.name,
    //   path: Photos.path,
    //   web_path: Photos.web_path,
    //   artist_id: Photos.artist_id
    // });

  });

};
