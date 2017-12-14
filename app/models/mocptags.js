// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Photo" model that matches up with DB
var Tags = sequelize.define("tags", {
  // the tag's id gets saved as an integer
  id: Sequelize.INTEGER,
  // the name of the tag (a string)
  tag_name: Sequelize.STRING,
  // and the photo id (an integer)
  photo_id: Sequelize.INTEGER
};

// Syncs with DB
Tags.sync();

// Makes the Tags Model available for other files (will also create a table)
module.exports = Tags;