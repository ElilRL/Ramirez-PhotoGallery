  //_____________________________________________//
  // WHEN YOU REACH THE END OF THE ARRAY, START OVER AGAIN
  //_____________________________________________//
  if(mCurrentIndex >= mImages.length)
    {
      mCurrentIndex = 0;
    }
   
    console.log('swap photo');
 
  //_____________________________________________//
  // FIND THE <img> INSIDE THE div#slideShow
  // SWAP THE src FOR THE NEW src FROM mImages
  //_____________________________________________//
  $("#photo").attr('src', mImages[mCurrentIndex].img);
  //_____________________________________________//
  // UPDATE .details SECTION WITH mImages INFO
  //_____________________________________________//
  $(".location").text("Location: " + mImages[mCurrentIndex].location);
  $(".description").text("Description: " + mImages[mCurrentIndex].description);
  $(".date").text("Date: " + mImages[mCurrentIndex].date);
 
  //_____________________________________________//
  // USE A COUNTER CALLED mCurrentIndex TO LOOP THROUGH
  // ALL THE GalleryImage OBJECTS IN THE mImages ARRAY
  //_____________________________________________//
  mCurrentIndex++;

}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
//_____________________________________________//
// AN XMLHttpRequest OBJECT IS ALREADY CREATED CALLED mRequest.
//_____________________________________________//
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
//_____________________________________________//
// UPDATE mUrl VARIABLE TO POINT TO images.json
//_____________________________________________//
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
return function(e) {
galleryImage.img = e.target;
mImages.push(galleryImage);
}
}

$(document).ready( function() {

// This initially hides the photos' metadata information
// $('.details').eq(0).hide();

//_____________________________________________//
// CALL fetchJSON() AT THE END OF ready() FUNCTION
//_____________________________________________//
fetchJSON();
});

window.addEventListener('load', function() {

//console.log('window loaded');

}, false);
//_____________________________________________//
// COMPLETE THE CONSTRUCTOR GalleryImage()
//_____________________________________________//
function GalleryImage(location, description, date, img) {
  //_____________________________________________//
  // CREATE PARAMETERS AND PROPERTIES
  // INITIALIZE THE VARIABLES USING THE this KEYWORD
  //_____________________________________________//
  //1. location where photo was taken
  this.location = location;
  //2. description of photo
  this.description = description;
  //3. the date when the photo was taken
  this.date = date;
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  this.img = img;
}
//_____________________________________________//
// DECLARE A FUNCTION CALLED fetchJSON()
//_____________________________________________//
function fetchJSON(){
//_____________________________________________//
// IN THE fetchJSON() USE mRequest TO CHECK/USE:
// onreadystatechange, readyState and status, responseText, Open and Send the request
//_____________________________________________//
  mRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //_____________________________________________//
      //  PARSE THE responseText AND SAVE THE RESULT IN A VARIABLE CALLED mJson
      //_____________________________________________//
       mJson = JSON.parse(mRequest.responseText);
      //_____________________________________________//
      //  CALL iterateJSON() AFTER PARSING mJson
      //_____________________________________________//
       iterateJSON();
    }
};
mRequest.open("GET", mUrl, true);
mRequest.send();
}

//_____________________________________________//
// CREATE A FUNCTION CALLED iterateJSON()
//_____________________________________________//
function iterateJSON(){
  //_____________________________________________//
  // Loop through the mJson object.
  //_____________________________________________//
  mJson.images.forEach(element => {
  //_____________________________________________//
  // CREATE GalleryImage OBJECTS
  //_____________________________________________//
  let newObj = new GalleryImage(
  //_____________________________________________//
  // INITIALIZE EACH VARIABLE
  //_____________________________________________//
    element.imgLocation,
    element.description,
    element.date,
    element.imgPath
  );

  //_____________________________________________//
  // PUT EACH OF THESE NEW GalleryImage OBJECTS INTO AN ARRAY CALLED mImages[].
  //_____________________________________________//
  mImages.push(newObj);
});

}