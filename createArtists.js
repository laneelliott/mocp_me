//Require Dependencies
var fs = require('file-system');
var mysql = require('mysql');

// ====================================
// Global Variables
var artistNumber = 0;
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
	fs.recurseSync('/Volumes/MOCP_AI', function(filepath, absolute, filename) {  
		if (filename) {
		  	// Do Nothing
		  } else {
		  	artistParse(filepath);
		  }
		});
	console.log(artistNumber + " | artists found");
}

function artistParse(filepath) {
	var artist = filepath;
	artist = artist.split('/')
	artist = artist[artist.length-1];
	writeQuery(artist, filepath, 'artists');
};

function writeQuery(name, fpath, table) {
	if (name !== 'high-res' && name !== 'Thumbs.db' && name !== 'high_res' && name !== 'high res' && name !== '$RECYCLE.BIN') {
		console.log('name: ' + name + '\n path: '+fpath);
		artistNumber++;
		var query = connection.query(
			"INSERT INTO "+table+" SET ?",
			{
				name: name,
				path: fpath
			},
			function(err, res) {

			});
		console.log(query.sql);
	}
}







