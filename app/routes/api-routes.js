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

  app.get("/api/return-all-tags-from-id/:photo_id", function(req, res) {
    db.Tags.findAll({
      where: {
        photo_id: req.params.photo_id
      }
    }).then(function(dbTags) {
      res.json(dbTags);
    });
  });

  app.get("/api/get-tags/:array_string", function(req, res) {
    console.log("\n------------------------------------------")

    var array = req.params.array_string;
    array = array.split(',');
    console.log(array);

    db.Tags.findAll({
      where: {
        tag_name: array
      }
    }).then(function(Tags) {
      // Creates an array of all the photo_id
      var photoArray = [];
      for (let i = 0; i < Tags.length; i++){
        photoArray.push(Tags[i].photo_id)
      }
      // Finds the function that was returned the most.
      function mode(array) {
          if(array.length == 0)
              return null;
          var modeMap = {};
          var maxEl = array[0], maxCount = 1;
          for(var i = 0; i < array.length; i++)
          {
              var el = array[i];
              if(modeMap[el] == null)
                  modeMap[el] = 1;
              else
                  modeMap[el]++;  
              if(modeMap[el] > maxCount)
              {
                  maxEl = el;
                  maxCount = modeMap[el];
              }
          }
          return maxEl;
      }
      db.Photos.findAll({
        where: {
          id: mode(photoArray)
        }
      }).then(function(photoId){
        res.json(photoId);
      });
      //console.log(mode(photoArray))
    })
    
  });

// ~~~~~~~~~~~~~~~~~~~~ Dont worry about this - Amanda ~~~~~~~~~~~~~~~~~~~~~
  // app.get("/api/new-hashtags", function(req, res) {
  //   console.log(req.body);
   
  // });


  // app.post("/api/new", function(req, res) {
  //   // console.log(req);
  //   // console.log(res);
  //   // Take the request...
  //   var tags = req.body;

  //   // Create a routeName
  //   var routeName = tags.name.replace(/\s+/g, "").toLowerCase();

  //   // Then add the hashtags to the database using sequelize
  //   Hashtags.create({
  //     routeName: routeName,
  //     tag_name: tags.tag_name,
  //   });

  // });
// ~~~~~~~~~~~~~~~~~~~~ Dont worry about this - Amanda ~~~~~~~~~~~~~~~~~~~~~

};
