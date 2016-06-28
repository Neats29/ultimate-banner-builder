# ultimate-banner-builder
This is a banner building application for creating any combination of DoubleClick banners, Dynamic DoubleClick banners, and/or non-DoubleClick banners containing one or many different versions for each size. 

## Setup your local environment:
- clone the repo
- navigate to the project's root directory which contains the file *Gulpfile.js*.
- run `sudo npm install gulp -g` to ensure you have Gulp installed.
- run `npm i` to install all necessary packages locally

# Workflow for building the banners
## 1. Create the Master banner
### Configure the *sizes.json* file
- `dimensions` (array of objects): include an item in the array for each ad size required in the brief. Ensure that the ad size which is declared as the 'Master' in the brief is the 0th item in the array.
- `versions` (array of strings): for non-DoubleClick banners, if there are to be multiple versions of each size (e.g. brand names, differing messages etc.) include an item in the array as a label for each required version.
- `DoubleClick` (boolean): set to true if the ad is to be served through DoubleClick Studio
- `Dynamic` (boolean): set to true if the ad is to be serverd using Dynamic Content from DoubleClick Studio
- `Static` (boolean): set to true if the ad is to be served outside of DoubleClick Studio
- `Master` (boolean): set to true when building the initial Master banner size
- Once complete, save the *sizes.json* file.

### Build the Master template
- Run `npm run generate` (This creates the *src* folder structure where you will build the Master version)
- Run `gulp` (This creates the *prod* output folder structure where the final ad files will be automatically served)
- Edit the banner in the *src* folder to create the final working version of the Master banner size.

## 2. Create all required banner sizes and types 
- Once the client is satisfied that the Master banner matches the brief, ensure that `gulp` is no longer running.
- Run `gulp master` (This overwrites the global base-template files with the Master src and then deletes *src* & *prod* folders)
- Set the `Master` property in sizes.json to `false` and save the file.
- Run `npm run generate` (This creates the 'src' folder structure for all required ad types and sizes)
- Run `gulp` again 
- Make adjustments in the src code as required in order to match the brief for each size. 

#### If non-DoubleClick banners are required:
- run `gulp zip` to compress each static production banner size and version into a zip file and create a global zip file containing all version.

### General Notes & Tips
- The global-images folder inside base-template contains example images to show working versions of static banners which use local images. Remove these images when ready to build to prevent them from being copied into the src and prod folders.
- If all ad sizes make use of a particular image, place the image inside global-images to serve it to all sizes.
- If new ad sizes are added to the specifications after you have completed the Master banner and have started building all size variations, simply add these additional banner sizes to the `dimensions` array in the sizes.json file and run `npm run generate` again to add them to the src folder.
- The `prefix` property in the `dimensions` array is optional. This will add an identifying prefix of your choice to each banner's size folder.
- When `gulp master` is run, the Master files which are copied over into base-template are: 
  - index.html
  - main.js
  - global.scss
  - normalise.scss
  - doubleclick.js (if DoubleClick is true)
  - image-paths.js (if Static is true)


# Banner builder features
- Create any combination of static or dynamic banners to be served through DoubleClick Studio or elsewhere.
- Create a Master banner version and apply these global changes to all required banner dimensions once completed.
- Use gulp to copy all changes in html, js, scss, jpg, and png source files into optimised versions in their relative production folders.
- Automatically serve the production banners to a localhost in your browser
- Create ability to make DoubleClick js versions with Enabler and GDN js versions with pure JS
- Use linting tools to check for code quality.
- Auto zip non-DoubleClick banners according banner size.

## To Do
- Make final improvements on base level banner build template
- Refactor and add further clarity to code
- Add error checking to gulp del to see if folders exist first.
