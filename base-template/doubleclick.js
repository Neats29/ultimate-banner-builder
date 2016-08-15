/*
*  Initializer - action when Enabler Object is ready.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function initialize() {
  if (Enabler.isInitialized()) {
    onInitialized();
  }//end if
  else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, onInitialized);
  }//end else
}//end initialize()


/*
*  Program flow for when the Enabler Object is ready.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function onInitialized() {

  if (Enabler.isPageLoaded()) {
    politeInit();
  }//end if
  else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
  }//end else

}//end onInitialized()


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

}//end exitHandler(adContent)