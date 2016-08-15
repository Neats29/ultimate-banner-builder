// Initialise variables
//var clickTag = "";

// Main function. This initiates everything for Static Builds
// Wait for the DOM to load before initialising banner
function initialize() {
  if (document.addEventListener) {// For all major browsers, except IE 8 and earlier
    document.addEventListener("DOMContentLoaded", politeInit);
  } else {
    politeInit();
  }
}


// Begin animation after a time delay to allow for loading
function politeInit() {

  //////  Get Content  //////
  var adContent = getContent();
  var imgMap = imageMap(adContent);

  //////  Set Content  //////
  setTimeout(function() { 
    exitHandler( adContent );
    setText( adContent );
    setImages( imgMap );
  }, 500);

  //////  Start Animation  //////
  setTimeout(function() { 
    removeCover();
    animate();
  }, 1000);
}


// Attach exit url to bg-exit element
function exitHandler(adContent) {
  document.getElementById('bg-exit').addEventListener('click', function() {
    window.open(adContent.exit.Url, '_blank');
  });
}//end exitHandler()