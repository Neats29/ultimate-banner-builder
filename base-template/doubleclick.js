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
function politeInit() {
  
  //////  Get Dynamic Content  //////
  var adContent = getContent();
  var imgMap = imageMap(adContent);

  //////  Set Content  //////
  exitHandler( adContent );
  setText( adContent );
  setImages( imgMap );
  
}//end politeInit()


/*
*  Creates Exit link handlers
*  
*  @param adContent: The Enabler object with dynamic content that is passed in.
*  @return:          This function does not return anything.
*
*/
function exitHandler(adContent) {
  document.getElementById('bg-exit').addEventListener('click', function() {Enabler.exit('clickTag', adContent.exit.Url);});
}//end exitHandler(adContent)