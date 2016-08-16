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
