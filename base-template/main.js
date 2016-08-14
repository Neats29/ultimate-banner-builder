"use strict";

//////  GLOBAL VARS  //////
//var isAdLoaded = false;//not found in current main
var isAnimated = false;
var isVisible = false;
var isImagesLoaded = false;

//Sets initialize() to run so Script can start.
//initialize() is found in both doubleClick.js and static.js
if('onload' in window){
  window.onload = initialize();
}//end if
else{
  //if onload not found wait 1000ms for DOM to load.
  setTimeout(function() { 
    initialize();
  }, 1000);
}//end if


/*
*  Starts the advertisement when it is loaded and no aminations have been run yet.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
// Called when the ad is visibile in the browser
function onVisible() {
  isVisible = true;
  if (isImagesLoaded && !isAnimated) {
    removeCover();
    animate();
  }
}


/*
*  Starts the advertisement when it is visible and no aminations have been run yet.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function onImagesLoaded() {//not needed? Called after setImages have assigned images and is callback of imgpreload check
  isImagesLoaded = true;
  if (isVisible && !isAnimated) {
    removeCover();
    animate();
  }//end if
}//end if


/*
*  Sets background images in the DOM. Iterates over retrun from imageMap(adContent).
*  
*  @param imageAssignments: imageMap object with key:value pairs from imageMap(adContent) function.
*  @return:                 This function does not return anything.
*
*/
function setImages(imageAssignments) {
  var images = [];

  for (var image in imageAssignments) {
    document.getElementById(image).style.background = 'url(' + imageAssignments[image] + ')';
    images.push(imageAssignments[image]);
  }
  imgpreload(images, onImagesLoaded);
}//end


/*
*  Checks all images are loaded and when confirmed runs callback.
*  Taken from https://gist.github.com/eikes/3925183
*  
*  @param imgs:      Array of images added.
*  @param callback:  Callback function to be run once amount of images to be loaded are found.
*  @return:          This function does not return anything.
*
*/
function imgpreload(imgs, callback) {
  var loaded = 0;
  var images = [];
  imgs = Object.prototype.toString.apply( imgs ) === '[object Array]' ? imgs : [imgs];
  var inc = function() {
    loaded += 1;//adds 1 to the count each time inc function is run
    if ( loaded === imgs.length && callback ) {//checks if number of total images === those that are loaded.
      callback( images );
    }
  };
  for ( var i = 0; i < imgs.length; i++ ) {//runs 'inc' function according to state of images[i]
    images[i] = new Image();
    images[i].onabort = inc;//if this happens still run 'inc'
    images[i].onerror = inc;//if this happens still run 'inc'
    images[i].onload = inc;//when it loads run 'inc'
    images[i].src = imgs[i];//set source of 
  }
}


/*
*  Controller function for the additions of HTML/Text into the DOM.
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*  EXAMPLE USE:
*  In setText(adContent) function: addText(adContent.price2Text, adContent.price2Element); - add as many of these lines as required.
*  In onPageLoaded() function:     setText(adContent); - only needs to be called once, calls to 'addText' function in setText(adContent) will then be run.
*
*/
function setText(adContent){
  //addText(adContent.text, adContent.textID);
}//end setText(adContent)


/*
*  Allows plain text or HTML to be placed inside of a Tag in the DOM.
*  
*  @param text:    The text/HTML (string) to be added.
*  @param element: The ID (string) of the element to be modified.
*  @return:        This action of setting DOM element content.
*
*/
function addText(text, element) {//move out of this function
  return document.getElementById(element).innerHTML = text;
}//end addText(text, element)


/*
*  Removes the advert cover for advert content to be shown. Hides initial processing that could cause sudden 'flash' of content.
*  
*  @param:  This function does not take any arguments.
*  @return: The action of setting DOM element 'covering-div' to a hidden state.
*
*/
function removeCover() {
  return document.getElementById('covering-div').className = 'hide';
}//end removeCover()


/*
*  Sets the src attribute of a CSS File to allow control by dynamic content. Allows unique CSS Files to be served per creative variation.
*  If using this function, make sure the initial CSS file (which will be changed on loading the ad) is not too large as this is a waste of bandwidth.
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*  EXAMPLE USE:
*  In the HTML HEAD section:      <link id="cssSheet" rel="stylesheet" href="overwrite.css"> - placed above current JS file, use unique IDs per sheet declaration.
*  In onPageLoaded() function:    setCSS(adContent); - only needs to be declared once, add items to setCSS(adContent) itself.
*  In setCSS(adContent) function: document.getElementById(adContent.cssFileID).setAttribute('href', adContent.cssFile.Url); - cssFileID and cssFile.Url are both from the dynamic content so need entries in the spreadsheet/dev object.
*
*/
function setCSS(adContent){
  //document.getElementById(adContent.cssFileID).setAttribute('href', adContent.cssFile.Url);
}//end setCSS(adContent)


/*
*  Contatins key:value map of images such that "Element ID : Dynamic Content Address"
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          The key:value object.
*
*/
function imageMap(adContent){
  //console.log(adContent)
  return {
  'banner' : adContent.main_image.Url,
  'frame1' : adContent.image_url_1.Url,
  'frame2' : adContent.image_url_2.Url,
  'frame3' : adContent.image_url_3.Url
  };
}//end imageMap


/*
*  Contains the animations for advertisement.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function animate() {  
  isAnimated = true;//required

  // For 5 seconds, show frame 1
  TweenLite.to(document.getElementById('frame1'), 0.4, { delay: 5, ease: 'easeInOut', opacity: 0 });
  // After 5 seconds, show frame 2
  TweenLite.to(document.getElementById('frame2'), 0.4, { delay: 5, ease: 'easeInOut', opacity: 1 });
  // After 5 seconds, hide frame 2 and show frame 3
  TweenLite.to(document.getElementById('frame2'), 0.4, { delay: 10, ease: 'easeInOut', opacity: 0 });
  TweenLite.to(document.getElementById('frame3'), 0.4, { delay: 10, ease: 'easeInOut', opacity: 1 });

}//end animate()


/*
*  Returns Dynamic Content from the Enabler object or the devDynamicContent object.
*  
*  @param:  This function does not take any arguments.
*  @return: The devDynamicContent Object or the DoubleClick Enabler Dynamic Content object.
*
*/
function getContent() {

  /* If using Dynamic Content from DoubleClick Studio, replace this code with Generated Dynamic Code.
     Otherwise, edit the devDynamicContent object's properties with the relative paths to images. */

  var devDynamicContent = {};
  devDynamicContent.dynContent= [{}];
  devDynamicContent.dynContent[0]._id = 0;
  devDynamicContent.dynContent[0].main_image = {};
  devDynamicContent.dynContent[0].main_image.Type = "file";
  devDynamicContent.dynContent[0].main_image.Url = "http://www.nisbets.co.uk/asset/en/prodimage/medium/cg928-werzalit-square-table-top-dark-red-600mm.jpg";
  devDynamicContent.dynContent[0].image_url_1 = {};
  devDynamicContent.dynContent[0].image_url_1.Type = "file";
  devDynamicContent.dynContent[0].image_url_1.Url = "http://www.continentalsports.co.uk/documents/images/laminate/E17-52.jpg";
  devDynamicContent.dynContent[0].image_url_2 = {};
  devDynamicContent.dynContent[0].image_url_2.Type = "file";
  devDynamicContent.dynContent[0].image_url_2.Url = "http://test.adv-furniture.co.uk/wordpress/wp-content/uploads/2013/02/Green.jpg";
  devDynamicContent.dynContent[0].image_url_3 = {};
  devDynamicContent.dynContent[0].image_url_3.Type = "file";
  devDynamicContent.dynContent[0].image_url_3.Url = "http://www.ralcolours.co.uk/acatalog/ral1007.jpg";
  devDynamicContent.dynContent[0].exit = {};
  devDynamicContent.dynContent[0].exit.Url = "http://www.google.com/";

  /* End of code to be replaced */

  if(Enabler.setProfileId){
    Enabler.setDevDynamicContent(devDynamicContent);
    //replace below according to information found in DoubleClick Dynamic Profile code generation.
    //leave two lines below commented out for local testing
    // Enabler.setProfileId(xxxxxx);
    // return dynamicContent.DynamicContentPath[0];
  }//end if

  //return devDynamicContent if there is no Enabler Object
  return devDynamicContent.dynContent[0];
  
}//end getContent()