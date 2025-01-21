// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
			  window.setTimeout(callback, 1000 / 60);
			};
  })();



// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/


animate();


var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame( animate );
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
	  mLastFrameTime = currentTime;
  }


  if ((currentTime - mLastFrameTime) > mWaitTime) {
	  swapPhoto();
	  mLastFrameTime = currentTime;
  }
}


/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/




// Counter for the mImages array
var mCurrentIndex = 0;


// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();


// Array holding GalleryImage objects (see below).
var mImages = [];


// Holds the retrived JSON information
var mJson;
var mJson;
// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
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
//   $('.details').eq(0).hide();
  fetchJSON();
});


window.addEventListener('load', function() {
 
  console.log('window loaded');


}, false);


function GalleryImage(location, description, date, img) {
  //implement me as an object to hold the following data about an image:
  //1. location where photo was taken
  //2. description of photo
  //3. the date when the photo was taken
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
this.location = location;
this.description = description;
this.date = date;
this.img = img;




}


function iterateJSON() {
  mJson.images.forEach(imageData => {
	  let galleryImage = new GalleryImage(
		  imageData.imgLocation,
		  imageData.description,  
		  imageData.date,          
		  imageData.imgPath                      
	  );


	  mImages.push(galleryImage);
  });


}

function swapPhoto() {
 
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