var api_key = 'AIzaSyBY93fja8yxM9not6Nrd2v6NsRgNpJ4ZvM';
// $(document).ready(function() {
  //Grab the file and asynchronously convert to base64.
  function sendUploadedImage(image) {
  var file = image[0].files[0];
  var reader = new FileReader()
  reader.onloadend = processFile
  reader.readAsDataURL(file);
  console.log(reader); 
}

//Encodes the new base 64img
function processFile(event) {
  var encodedFile = event.target.result;
  // console.log(encodedFile);
  sendFiletoCloudVision(encodedFile);
}



// function showImage(base64){
//   // var image = $('<img style="height:100vh" src="data:image/jpeg;base64, '+ base64 +'" />');
//   // console.log(base64);
//   var imageSource = '"data:image/jpeg;base64, '+ base64 +'"';
//   $("#uploaded-image").attr("src", imageSource);
// }



function sendFiletoCloudVision(file){
  var type = 'LABEL_DETECTION';
  //This will currently only allow jpeg images
  var fileType = file.split(',');
  fileType = fileType[0] + ",";
  console.log(fileType)
  var content = file.replace(fileType, "");
    // Strip out the file prefix when you convert to json.
    var json = {
     "requests": [
     { 
       "image": {
         "content": content 
       },
       "features": [
       {
         "type": type,
         "maxResults": 10
       }
       ]
     }
     ]
   }
    //console.log(JSON.stringify(json));
    json = JSON.stringify(json)

  //Vision AJAX Request
  $.ajax({
    type: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + api_key,
    dataType: 'json',
    data: json,
      //Include headers, otherwise you get an odd 400 error.
      headers: {
        "Content-Type": "application/json",
      },
      success: function(data, textStatus, jqXHR) {

        var tagsArray = [];
        for (var i = 0; i < data.responses[0].labelAnnotations.length; i++){
          //console.log(data.responses[0].labelAnnotations[i].description);
          tagsArray.push(data.responses[0].labelAnnotations[i].description);
        }


        // Prints the top three uploaded image tags to the html
        for (var i=0;i<3;i++){
          if (data.responses[0].labelAnnotations[i] !== undefined){
            //console.log(data.responses[0].labelAnnotations[i].description);
            $('#vision-tags').append("<h5>" + data.responses[0].labelAnnotations[i].description + "</h5>");
          }
        }
        //Gets the image for the top tag.
        //getURL(data.responses[0].labelAnnotations[0].description);
        getURL(tagsArray)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
}

// //Encodes the new base 64img
// function postBASE64(encodedFile){
//     //Post information to route.
//     $.post("/api/new", encodedFile)
//       .then();
// }


