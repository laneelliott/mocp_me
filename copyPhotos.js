// /Volumes/MOCP_AI/van Houtryve_T/2015_283.jpg
// /Volumes/MOCP_AI/Yun_S/2011_1.jpg

// /Volumes/MOCP_AI/zzz_All_Photos

//REQUIRE DEPENDENCIES
var file = require('file-system');
var fs = require('fs');
var mysql = require('mysql');
var fsex = require('fs-extra');


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
	//copyFiles();
	copyFilesExtra();
	//queryAllPhotos()
	connection.end();
});

//======================================

function copyFiles(){

	connection.query("SELECT * FROM photos", function(err, res) {
	    for (var i = 0; i < 100; i++) {
			file.copyFile(res[i].path, '/Volumes/MOCP_AI/zzz_All_Photos/'+res[i].name, {
			  done: function(err) {
			    console.log(i + 'copied');
			  }
			});

	    }
	 });	
}

//======================================

function copyFilesExtra(){

	connection.query("SELECT * FROM photos", function(err, res) {
	    for (var i = 0; i < res.length; i++) {
			fsex.copy(res[i].path, '/Volumes/MOCP_AI/zzz_All_Photos/'+res[i].name, err => {
				if (err) return console.error(err)
  				console.log(i + " images copied")
			});
	    }
	 });	
}

//======================================

function queryAllPhotos() {
  connection.query("SELECT * FROM photos", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].name + " | " + res[i].path + " | " + res[i].artist_id);
    }
    console.log("-----------------------------------");
  });
}