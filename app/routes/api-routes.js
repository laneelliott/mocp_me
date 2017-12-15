// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Photos = require("../models/Photos.js");
//var Tags = require("../models/Tags.js")

// Routes
// =============================================================
module.exports = function(app) {

  // Search for Specific Photos (or all Photos) then provides JSON
  app.get("/api/:Photos?", function(req, res) {

    // If the user provides a specific Photos in the URL...
    if (req.params.Photos) {

      // Then display the JSON for ONLY that Photo.
      // (Note how we're using the ORM here to run our searches)
      Photos.findOne({
        where: {
          routeName: req.params.Photos
        }
        // WHERE routename = ?, [req.params.Photos]
      }).then(function(result) {
        console.log(result);
        return res.json(result);
      });
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the Photos.
      // (Note how we're using Sequelize here to run our searches)
      Photos.findAll({})
        .then(function(result) {
          return res.json(result);
        });
    }

  });

  // If a user sends data to add a new Photo...
  app.post("/api/new", function(req, res) {

    // Take the request...
    var Photos = req.body;

    // Create a routeName
    var routeName = Photos.name.replace(/\s+/g, "").toLowerCase();

    // Then add the Photos to the database using sequelize
    Photos.create({
      routeName: routeName,
      name: Photos.name,
      path: Photos.path,
      web_path: Photos.web_path,
      artist_id: Photos.artist_id
    });

  });
};
