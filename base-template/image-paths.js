function getContent() {
  /* Create your own version of the below object with local references */

  var devDynamicContent = {};
  devDynamicContent.Static = [{}];
  devDynamicContent.Static[0].main_image = {};
  devDynamicContent.Static[0].main_image.Url = "img/red.jpg";
  devDynamicContent.Static[0].image_url_1 = {};
  devDynamicContent.Static[0].image_url_1.Url = "img/blue.jpg";
  devDynamicContent.Static[0].image_url_2 = {};
  devDynamicContent.Static[0].image_url_2.Url = "img/green.jpg";
  devDynamicContent.Static[0].image_url_3 = {};
  devDynamicContent.Static[0].image_url_3.Url = "img/orange.jpg";
  devDynamicContent.Static[0].exit = {};
  devDynamicContent.Static[0].exit.Url = "http://www.google.com/";

  return devDynamicContent.Static[0];
}

// TODO: Refactor the above to retain structure but add simplicity.
