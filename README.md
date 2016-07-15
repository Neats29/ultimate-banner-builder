# ultimate-banner-builder

# Features
- Create any combination of DoubleClick banners, Dynamic DoubleClick banners, and/or non-DoubleClick banners with multiple versions for each ad size. 
- Create a Master banner version and apply these global changes to all required banner dimensions once completed.
- Use Gulp to copy all changes in html, js, scss, jpg, and png source files into optimised versions in their relative production folders.
- Automatically serve the production banners to a localhost in your browser
- Create javascript files for use in DoubleClick with Enabler and/or static non-DoubleClick versions with pure javascript.
- Use linting tools to check for code quality.
- Auto zip non-DoubleClick banners according to the banner size.


# Workflow for building the banners

## 1. Setup your local environment:
- clone the repo
- navigate to the project's root directory which contains the file *Gulpfile.js*.
- run `sudo npm install gulp -g` to ensure you have Gulp installed.
- run `npm i` to install all necessary packages locally
- install the [EditorConfig](http://editorconfig.org/) package in your text editor.   

## 2. Create the Master banner
### Configure the *sizes.json* file
- `"dimensions"` (array of objects): include an item in the array for each ad size required in the brief. Ensure that the ad size which is declared as the 'Master' in the brief is the 0th item in the array.
- `"versions"` (array of strings): for non-DoubleClick banners, if there are to be multiple versions of each size (e.g. brand names, differing messages etc.) include an item in the array as a label for each required version.
- `"DoubleClick"` (boolean): set to true if the ad is to be served through DoubleClick Studio
- `"Dynamic"` (boolean): set to true if the ad is to be serverd using Dynamic Content from DoubleClick Studio
- `"Static"` (boolean): set to true if the ad is to be served outside of DoubleClick Studio
- `"Master"` (boolean): set to true when building the initial Master banner size
- Once complete, save the *sizes.json* file.

### Build the Master template
- Run `npm run generate` (This creates the *src* folder structure where you will build the Master version)
- Run `gulp` (This creates the *prod* output folder structure where the final ad files will be automatically served)
- Edit the banner in the *src* folder to create the final working version of the Master banner size in *prod*. 

##### For DoubleClickbanners the only files which require editing are:
  - *doubleclick.js*
  - *index.html*
  - *main.js*
  - *global.scss* 
  - *overwrite.scss*

##### For Static banners the only files which require editing are:
  - *image-paths.js*
  - *index.html*
  - *main.js*
  - *global.scss* 
  - *overwrite.scss*

## 3. Create all required banner sizes, versions, and types 
- Once the client is satisfied that the Master banner matches the brief, ensure that `gulp` is no longer running. 
- Make a copy of your overwrite.scss file in *src* if you have added styling specific to your Master banner so as not to lose it. 
- Run `gulp master` (This overwrites the global base-template files with the Master files in *src* and then deletes *src* & *prod* folders)
- Set the `"Master"` property in sizes.json to `false` and save the file.
- Run `npm run generate` (This creates the *src* folder structure for all required ad types and sizes)
- Run `gulp` again 
- Make adjustments in the *src* code as required in order to match the brief for each banner size, version, or type. 

##### If non-DoubleClick banners are required:
- When the banners are finished, run `gulp zip` to compress each static production banner size and version into a zip file and create a global zip file containing all versions.

### General Notes & Tips
- The *global-images* folder inside *base-template* contains example images to show working versions of static banners which use local images. Remove these images when ready to build to prevent them from being copied into the *src* and *prod* folders.
- If all ad sizes make use of a particular image, place the image inside *global-images* to serve it to all sizes.
- If new ad sizes are added to the specifications after you have completed the Master banner and have started building all size variations, add these additional banner sizes to the `"dimensions"` array in the *sizes.json* file and run `npm run generate` again to add them to the *src* folder.
- The `"prefix"` property in the `"dimensions"` array is optional. This will add an identifying prefix of your choice to each banner's size folder.
- When `gulp master` is run, the Master files which are copied over into *base-template* are: 
  - *index.html*
  - *main.js*
  - *global.scss*
  - *normalise.scss*
  - *doubleclick.js* (if DoubleClick is true)
  - *image-paths.js* (if Static is true)

### General error handling

- If you get the following error: `no such file or directory, scandir 'src'` it means that you are missing the src directory, run `npm run generate` to create the src folder.
- If you generate the zip files and clicking on the zip file, generates a file with the `.cpgz` extension, then download this app [Unarchiver](https://itunes.apple.com/us/app/the-unarchiver/id425424353?mt=12) and it should fix it. This seems to be a mac bug.

### Testing in the browser

In order to run the ad in the browser, we use the 'connect gulp task'.
If you need to test it in other browsers, either run `gulp test` which will open up all 3 browsers, or run each browser task individually as follows:
- Chrome: `gulp` or `gulp connect`
- Firefox: `gulp ff` 
- Safari: `gulp safari`

### Script and gulp task development

If you need to tweak the scripts in the future, see the following files:

_build/generate-template.js_: edit this file, if you need to make changes to the way the src folder is generated
_Gulpfile.js: edit this file if you need to tweak the way the prod folder is generated
However, the two scripts are somewhat dependent on eachother, so if you change the paths in one file, you will probably need to change in the other file.

TODO: Watch only updates file additions not deletions, so this would be a good feature to implement.
TODO: When the gulp master task is run, the overwrite.scss file is copied from the src and temporarily pasted into the base_template folder, this then gets copied over to the right folder in the src folder generate after sizes.json/Master is turned to false. But the file should then be deleted from the base_template folder.
