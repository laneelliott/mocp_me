var db = require("../models");


// Routes
module.exports = function(app) {

  // Search for Specific Photos (or all Photos) then provides JSON
  app.get("/api", function(req, res) {

      Photos.findOne({
        where: {
          id: 234
        }
        // WHERE routename = ?, [req.params.Photos]
      }).then(function(result) {
        console.log(result);
        return res.json(result);
      });
  });

};
