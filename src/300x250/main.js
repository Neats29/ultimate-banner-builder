window.onload = initialize();

// Set the content needed to create the banner
var adContent = getContent();

// These variables will later be checked to see if animation can begin.
var isVisible = false;
var isImagesLoaded = false;
var isAnimated = false;

// Set the background images in index.html to those in adContent
function setImages() {
  var images = [];

  for (var image in imageAssignments) {
    document.getElementById(image).style.background = 'url(' + imageAssignments[image] + ')';
    images.push(imageAssignments[image]);
  }
  imgpreload(images, onImagesLoaded); 
}

// Ensure that all images have been downloaded before the animation begins
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

// Remobe covering div to reveal ad (called when ready to animate)
function removeCover() {
  document.getElementById('covering-div').className = 'hide';
}

// Called when the ad is visibile in the browser
function onVisible() {
  isVisible = true;
  if (isImagesLoaded && !isAnimated) {
    removeCover();
    animate();
  }
}

// Called when all images have been downloaded
function onImagesLoaded() {
  isImagesLoaded = true;
  if (isVisible && !isAnimated) {
    removeCover();
    animate();
  }
}

///
///* ONLY EDIT THE CODE BELOW THIS LINE *///
///

// 1. Update the imageAssignments object below
//       Keys:    ids corresponding to elements in index.html
//       Values:  properties of adContent from getContent() in doubleclick.js (doubleclick banners) 
//               or image-paths.js (static banners) 

var imageAssignments = {
  'banner' : adContent.main_image.Url,
  'frame1' : adContent.image_url_1.Url,
  'frame2' : adContent.image_url_2.Url,
  'frame3' : adContent.image_url_3.Url
};


// 1. All banner animations should be set in the animate function. Using TweenLite is recommended.
//       TweenLite Documentation: https://www.greensock.com/asdocs/com/greensock/TweenLite.html

function animate() {
  // For 5 seconds, show frame 1
  TweenLite.to(document.getElementById('frame1'), 0.4, { delay: 5, ease: 'easeInOut', opacity: 0 });
  // After 5 seconds, show frame 2
  TweenLite.to(document.getElementById('frame2'), 0.4, { delay: 5, ease: 'easeInOut', opacity: 1 });
  // After 5 seconds, hide frame 2 and show frame 3
  TweenLite.to(document.getElementById('frame2'), 0.4, { delay: 10, ease: 'easeInOut', opacity: 0 });
  TweenLite.to(document.getElementById('frame3'), 0.4, { delay: 10, ease: 'easeInOut', opacity: 1 });
}
