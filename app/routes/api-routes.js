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

  // Search for Specific Photos (or all Photoss) then provides JSON
  app.get("/api/:Photos?", function(req, res) {

    // If the user provides a specific Photos in the URL...
    if (req.params.Photoss) {

      // Then display the JSON for ONLY that Photos.
      // (Note how we're using the ORM here to run our searches)
      Photos.findOne({
        where: {
          routeName: req.params.Photoss
        }
        // WHERE routename = ?, [req.params.Photoss]
      }).then(function(result) {
        console.log(result);
        return res.json(result);
      });
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the Photoss.
      // (Note how we're using Sequelize here to run our searches)
      Photos.findAll({})
        .then(function(result) {
          return res.json(result);
        });
    }

  });

  // If a user sends data to add a new Photos...
  app.post("/api/new", function(req, res) {

    // Take the request...
    var Photos = req.body;

    // Create a routeName
    var routeName = Photos.name.replace(/\s+/g, "").toLowerCase();

    // Then add the Photos to the database using sequelize
    Photos.create({
      routeName: routeName,
      name: Photos.name,
      role: Photos.role,
      age: Photos.age,
      forcePoints: Photos.forcePoints
    });

  });
};
