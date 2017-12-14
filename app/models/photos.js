// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Photo" model that matches up with DB
var Photos = sequelize.define("photos", {
  // the Photo's id gets saved as an integer
  id: Sequelize.INTEGER,
  // the name of the Photo (a string)
  name: Sequelize.STRING,
  // the Photo's file path (a string)
  path: Sequelize.STRING,
  // the Photo's URL aka web path (a string)
  webpath: Sequelize.STRING,
  // and the artist id (an integer)
  artistid: Sequelize.INTEGER
};

// Syncs with DB
Photos.sync();

// Makes the Photos Model available for other files (will also create a table)
module.exports = Photos;
