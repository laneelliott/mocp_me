// html-routes.js - this file offers a set of routes for sending users to the various html pages
//Dependencies
var path = require("path");
//Routes
module.exports = function(app) {
  //Each of the below routes handles the HTML page that the user gets sent to.
  
  // index route loads main page
  app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // saving this code in case we want to add additional pages
  // app.get("/uploadimg", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/add.html"));
  // });
  // // blog route loads page with match image from MoCP
  // app.get("/itsamatch", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/all.html"));
  // });
  // // authors route loads user crowdsourced tagging
  // app.get("/giveitatag", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/view.html"));
  // });
};