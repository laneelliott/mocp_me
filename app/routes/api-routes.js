var db = require("../models");


// Routes
module.exports = function(app) {

  // Search for Specific Photos (or all Photos) then provides JSON
  app.get("/api", function(req, res) {
    db.Tags.findAll({}).then(function(dbTags) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTags);
    });

    // console.log(db.Tags)
    // db.Tags.findAll({
    //   where: {
    //     id: 234
    //   }
    // }).then(function(result) {
    //   console.log(result)
    //   return res.json(result)
    // });
      // Photos.findOne({
      //   where: {
      //     id: 234
      //   }
      //   // WHERE routename = ?, [req.params.Photos]
      // }).then(function(result) {
      //   console.log(result);
      //   return res.json(result);
      // });
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
