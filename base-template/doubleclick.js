/*
*  Initializer - wait for Enabler Object to be ready.
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
    onPageLoaded();
  }//end if
  else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, onPageLoaded);
  }//end else
  
  if(Enabler.isVisible()){
    onVisible();
  }//end if
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, onVisible);
  }//end else

}//end onInitialized()


/*
*  Sets the content of the advertisement. Only run when Enabler object is initialised.
*  
*  @param:  This function does not take any arguments.
*  @return: This function does not return anything.
*
*/
function onPageLoaded() {
  
  //////  Get Dynamic Content  //////
  var adContent = getContent();
  var imgMap = imageMap(adContent);

  //////  Set Content  //////
  exitHandler( adContent );
  setText( adContent );
  setImages( imgMap );//last function in list, sets isAdLoaded to true
  
}//end onPageLoaded()


/*
*  Creates Exit link handlers
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*/
// Attach exit url to bg-exit element
function exitHandler(adContent) {
  document.getElementById('bg-exit').addEventListener('click', function() {Enabler.exit('clickTag', adContent.exit.Url);});
}//end exitHandler(adContent)