/*
*  Initializer - actions when DOM is ready.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function initialize() {

    if (document.addEventListener) {//For all major browsers, except IE 8 and earlier
        document.addEventListener("DOMContentLoaded", politeInit);
    }//end if
    else if (document.attachEvent) {//For IE 8 and earlier versions
        document.attachEvent("onload", politeInit);
    }//end else
    else{
        //in any other instance, run politeInit() with 1000ms delay to allow for loading
        setTimeout(function() { 
          politeInit();
        }, 1000);
    }//end else

}//end initialize()


/*
*  Sets the content of the advertisement - only run when DOM is ready.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
// function politeInit() {
//   //isVisible = true;//required for onImagesLoaded

//   //////  Get Content  //////
//   var adContent = getContent();
//   var imgMap = imageMap(adContent);

//   //////  Set Content  //////
//   exitHandler( adContent );
//   setText( adContent );
//   setImages( imgMap );//required last function to be called.

//   //////  Start Animations  //////
//   /*
//   *  setImages has a call back when ready to "onImagesLoaded" in "imgpreload(images, onImagesLoaded)" - found in main.js
//   *  onImagesLoaded will run the last two functions required:
//   *    - removeCover();
//   *    - animate();
//   */

// }//end politeInit()


/*
*  Creates Exit link handlers
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*/
function exitHandler(adContent) {

  var element = document.getElementById('bg-exit');

  if (element.addEventListener) {//For all major browsers, except IE 8 and earlier
      element.addEventListener("click", function() { window.open(adContent.exit.Url, '_blank'); });
  }//end if
  else if (element.attachEvent) {//For IE 8 and earlier versions
      element.attachEvent("onclick", function() { window.open(adContent.exit.Url, '_blank'); });
  }//end else

}//end exitHandler()
