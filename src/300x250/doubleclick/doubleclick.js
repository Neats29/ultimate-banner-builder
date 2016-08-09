"use strict";
var Enabler;

// Check DoubleClick initializer
function initialize() {
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, checkPageLoaded);
  }
}

// When Enabler is initialized, check that the page has loaded
function checkPageLoaded() {
  Enabler.isPageLoaded() ? politeInit() :
    Enabler.addEventListener(
      studio.events.StudioEvent.PAGE_LOADED,
      politeInit
    );
}

// Attach exit url to bg-exit element
function exitHandler() {
  var dynamicContent = getContent();
  document.getElementById('bg-exit').addEventListener('click', function() {
    Enabler.exit("clickTag", dynamicContent.exit.Url);
  });
}

// politeInit will run after the page has loaded. Start animations inside this function.
function politeInit() {
  isVisible = false;
  setImages();
  exitHandler();

  if(Enabler.isVisible()){
    onVisible();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, onVisible);
  }
}


///
/*  Only edit code below this line */
///

function getContent() {

  /* If using Dynamic Content from DoubleClick Studio, replace this code with Generated Dynamic Code.
     Otherwise, edit the devDynamicContent object's properties with the relative paths to images. */

  var devDynamicContent = {};
  devDynamicContent.DoubleClick= [{}];
  devDynamicContent.DoubleClick[0]._id = 0;
  devDynamicContent.DoubleClick[0].main_image = {};
  devDynamicContent.DoubleClick[0].main_image.Type = "file";
  devDynamicContent.DoubleClick[0].main_image.Url = "http://www.nisbets.co.uk/asset/en/prodimage/medium/cg928-werzalit-square-table-top-dark-red-600mm.jpg";
  devDynamicContent.DoubleClick[0].image_url_1 = {};
  devDynamicContent.DoubleClick[0].image_url_1.Type = "file";
  devDynamicContent.DoubleClick[0].image_url_1.Url = "http://www.continentalsports.co.uk/documents/images/laminate/E17-52.jpg";
  devDynamicContent.DoubleClick[0].image_url_2 = {};
  devDynamicContent.DoubleClick[0].image_url_2.Type = "file";
  devDynamicContent.DoubleClick[0].image_url_2.Url = "http://test.adv-furniture.co.uk/wordpress/wp-content/uploads/2013/02/Green.jpg";
  devDynamicContent.DoubleClick[0].image_url_3 = {};
  devDynamicContent.DoubleClick[0].image_url_3.Type = "file";
  devDynamicContent.DoubleClick[0].image_url_3.Url = "http://www.ralcolours.co.uk/acatalog/ral1007.jpg";
  devDynamicContent.DoubleClick[0].exit = {};
  devDynamicContent.DoubleClick[0].exit.Url = "http://www.google.com/";
  Enabler.setDevDynamicContent(devDynamicContent);

  /* End of code to be replaced */

  // If using Dynamic Content from DoubleClick Studio, ensure that the below  variable matches the one in the code directly above.
  return devDynamicContent.DoubleClick[0];
}