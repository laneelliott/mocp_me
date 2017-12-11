//Require Dependencies
var fs = require('file-system');
var mysql = require('mysql');
var log = require('fs')
var logger = log.createWriteStream('photos.sql', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

// ====================================
// Global Variables
var photoNumber = 0;
// ====================================

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
	readDB();
	connection.end();
});

function readDB(){
	fs.recurseSync('/Volumes/MOCP_AI', ['**/*.jpg'], function(filepath, absolute, filename) {  
		if (filename) {
		  	photoParse(filename, filepath);
		} else {
			// Do Nothing
		}
	});
	console.log(photoNumber + " | images found");
}

function photoParse(filename, filepath) {
	if ( validPhoto(filepath) ) {
		console.log('photo parse')
		writeQuery(filename, filepath, 'photos');
	}
};


function writeQuery(name, fpath, table) {
	console.log(name + '\n' + fpath);
	var query = connection.query(
		"INSERT INTO "+table+" SET ?",
		{
			name: name,
			path: fpath
		},
		function(err, res) {
		}
		);
	console.log(query.sql);
};

function validPhoto(filepath) {
	var paths = filepath.split('/');
	for (var i = 1; i < paths.length-1; i++ ){	
	var query = connection.query("SELECT * FROM artists WHERE ?",
		{
			name: paths[i]
		},
		function(err, res){
			if( res.length !== 0 ){
				photoNumber++;
				console.log('matched_id:'+res[0].id + ' | number: '+ photoNumber);
				logger.write("INSERT INTO `mocp_db`.`photos` (`name`, `path`, `artist_id`) VALUES ('"+paths[paths.length-1]+"', '"+filepath+"', '"+res[0].id+"');\n");
				return true;
			} else {
				//return false;
			}
			//console.log(res.length);
		});
	}
}












