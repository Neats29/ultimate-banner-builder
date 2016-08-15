"use strict";

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
*  Sets the content of the advertisement - only run when DOM is ready.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function politeInit() {

  //////  Get Content  //////
  var adContent = getContent();
  var imgMap = imageMap(adContent);

  //////  Set Content  //////
  setStyleSheet(adContent);
  exitHandler(adContent);
  setText(adContent);
  setImages(imgMap);//required last function to be called.

  //////  Start Animations  //////
  /*
  *  setImages has a call back when ready to "onImagesLoaded" in "imgpreload(images, onImagesLoaded)" - found in main.js
  *  onImagesLoaded will run the last two functions required:
  *    - removeCover();
  *    - animate();
  */

}//end politeInit()


/*
*  Starts the advertisement aminations.
*  Called when all images are loaded.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function onImagesLoaded() {
    removeCover();
    animate();
}//end if


/*
*  Sets background images in the DOM. Iterates over Object returned from imageMap(adContent).
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
    loaded += 1;
    if ( loaded === imgs.length && callback ) {
      callback( images );
    }
  };
  for ( var i = 0; i < imgs.length; i++ ) {
    images[i] = new Image();
    images[i].onabort = inc;
    images[i].onerror = inc;
    images[i].onload = inc;
    images[i].src = imgs[i];
  }
}


/*
*  Injects plain text or HTML to be placed inside an HTML Element in the DOM.
*  
*  @param text:    The text/HTML (string) to be added.
*  @param element: The ID (string) of the element to be modified.
*  @return:        The action of setting DOM element content.
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



//////  //////  //////  //////  //////  //////  //////  //////
//////  //////  ANYTHING BELOW CAN BE EDITED    //////  //////
//////  //////  //////  //////  //////  //////  //////  //////


/*
*  Controller Function for the addition of HTML/Text into the DOM.
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*  EXAMPLE USE:
*  In setText(adContent) function: addText(adContent.price2Text, adContent.price2Element); - add as many of these lines as required.
*  In politeInit() function:     setText(adContent); - only needs to be called once, setText(adContent) needs to be populated.
*
*/
function setText(adContent){
  //addText(adContent.text, adContent.textID);
}//end setText(adContent)


/*
*  Sets the src attribute of a CSS File to allow control by dynamic content. Allows unique CSS Files to be served per creative variation.
*  If using this function, make sure the initial CSS file (which will be changed on loading the ad) is not too large as this is a waste of bandwidth.
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*  EXAMPLE USE:
*  In the HTML HEAD section:             <link id="cssSheet" rel="stylesheet" href="overwrite.css"> - placed above current JS file, use unique IDs per sheet declaration.
*  In politeInit() function:             setStyleSheet(adContent); - only needs to be declared once, add items to setStyleSheet(adContent) itself.
*  In setStyleSheet(adContent) function: document.getElementById(adContent.cssFileID).setAttribute('href', adContent.cssFile.Url); - cssFileID and cssFile.Url are both from the dynamic content so need entries in the spreadsheet/dev object.
*
*/
function setStyleSheet(adContent){
  //document.getElementById(adContent.cssFileID).setAttribute('href', adContent.cssFile.Url);
}//end setStyleSheet(adContent)


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
  //isAnimated = true;//required

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