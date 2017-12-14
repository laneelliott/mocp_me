// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

//Other Dependencies
//Require Dependencies
var fs = require('file-system');
var mysql = require('mysql');
var log = require('fs')
var logger = log.createWriteStream('tags.sql', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

// Connect to Database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "mocp_db"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('\n******************************************\nConnected to server as ' + connection.threadId + '\n*****************************************');
	queryPhotos();
	connection.end();
});

// GLOBAL VARIABLES
var i = 0;
var globalObj;


// === Functions ===
// query for selecting groups  WHERE id BETWEEN 2 AND 3
function queryPhotos(){
	var query = connection.query("SELECT * FROM photos",{},
		function(err, res){
			globalObj = res;
			generateTags();
		});
};

function generateTags(){
	console.log(globalObj[i].web_path+" | "+globalObj[i].id);
	visionCall(globalObj[i].web_path, globalObj[i].id);
}

function visionCall(url, id) {
	// Performs label detection on the image file
	client
	  .labelDetection(url)
	  .then(function(results) {
	    const labels = results[0].labelAnnotations;
	    console.log(id);
	    // Log to SQL
	    labels.forEach(function(label){
	    	logger.write("INSERT INTO `mocp_db`.`tags` (`tag_name`, `photo_id`) VALUES ('"+label.description+"', '"+id+"');\n");
	    	//console.log(label.description + ' | Percentage: %' + label.score * 100)
	    });
	    if(i < 22062){
	    	i++;
	    	generateTags()
	    } else {
	    	console.log('Done')
	    }
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	    if(i < 22062){
	    	i++;
	    	generateTags()
	    } else {
	    	console.log('Done')
	    }
	  });
}


// Old Code
// function generateTags(){
// 	var query = connection.query("SELECT * FROM photos WHERE id BETWEEN 1 AND 100",{},
// 		function(err, res){
// 			for (var i = 0; i < res.length; i++){
// 				console.log(res[i].web_path+" | "+res[i].id);
// 				visionCall(res[i].web_path, res[i].id);
// 			}
// 		});
// };





