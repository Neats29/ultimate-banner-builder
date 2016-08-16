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
