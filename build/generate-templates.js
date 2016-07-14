'use strict';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
const appRoot = process.cwd();
const sourceDirectory = `${appRoot}/src/`;
const DoubleClick = "doubleclick";
const Dynamic = null;
const Static = "static";
const img = "img";
var versions;
let masterScss;


// Get folder names inside a given directory (dir)
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
  });
}



class GenerateTemplates {
	constructor() {
		this.loadSizes();
		this.setupSource();

    //TODO: look inside folder rather than array
		this.formatFiles = ['doubleclick.js', 'main.js', 'static.js', 'image-paths.js', 'overwrite.scss', 'index.html'];
	}

	loadSizes() {
		const sizesFile = fs.readFileSync(`${appRoot}/sizes.json`, `utf8`);
		let sizes = JSON.parse(sizesFile);
		this.sizes = sizes.dimensions;
		this.DoubleClick = sizes.DoubleClick;
		this.Master = sizes.Master;
		this.Static = sizes.Static;
    this.Dynamic = sizes.Dynamic;
    this.masterScssCopied = false;
		versions = sizes.versions;
		
		versions = this.Master === true ? [versions[0]] : versions;
		this.sizes = this.Master === true ? [this.sizes[0]] : this.sizes;
	}

  isStatic() {
    if (this.Master && this.Static && !this.DoubleClick ||
      !this.Master && this.Static) return true;
  }

	processSizes() {
		this.sizes.map((size) => {
			this.checkTemplate(`${sourceDirectory}${size.prefix}${size.width}x${size.height}`, size);
		});
	}

	setupSource() {
		let that = this;
		fs.access(sourceDirectory, fs.F_OK, function(err) {
			if (!err) {
				console.info(chalk.blue(`Source directory already exists`));
				that.processSizes();
			} else {
				that.createSource();
			}
		});
	}

	createSource() {
		let that = this;
		fs.mkdir(sourceDirectory, (err, folder) => {
			if (err) {
				console.log(err);
				console.error(chalk.red(`src could not be created`));
			} else {
				console.info(chalk.blue(`src has been created`));
				that.populateSrc();
			}
		});
	}

	populateSrc() {
		let globalSass = `${appRoot}/base-template/global.scss`;
		let normalizeSass = `${appRoot}/base-template/normalize.scss`;
		fs.createReadStream(globalSass).pipe(fs.createWriteStream(`${sourceDirectory}global.scss`));
		fs.createReadStream(normalizeSass).pipe(fs.createWriteStream(`${sourceDirectory}normalize.scss`));
		this.processSizes();
	}


	checkTemplate(dir, data) {
		let that = this;
		fs.access(dir, fs.F_OK, function(err) {
			if (!err) {
				console.info(chalk.blue(`${dir} Already exists`));
			} else {
				console.info(chalk.blue(`Creating ${dir}`));
				that.generateTemplate(dir, data);
			}
		});
	}

	// Build folders to house each ad by size name and their DoubleClick and Static subfolders
	generateTemplate(dir, data) {
		let that = this;


		fs.mkdir(dir, (err, folder) => {
			if (err) {
				console.log(err);
				console.error(chalk.red(`${dir} Could not be created`));
			} else {
				console.info(chalk.blue(`${dir} has been created`));


        if (this.DoubleClick) {
          fs.mkdir(`${dir}/${DoubleClick}`);
        }


				if (this.isStatic()) {
					var totalVersions = this.Master === true ? 1 : versions.length;
					var version = 0;

					// Make Static assets folder
					fs.mkdir(`${dir}/${Static}`, function (err) {
				    if (err) {
				        return console.log('failed to write directory', err);
				    }
				    makeVersionDirectory(version);
					});

					// Make a folder inside Static assets folder for a particular version
					function makeVersionDirectory (version) {
						fs.mkdir(`${dir}/${Static}/${versions[version]}`, function (err) {
					    if (err) {
					        return console.log('failed to write directory', err);
					    }
					    makeImgDirectory(version);
						});
					}

					// Make an image folder inside the Static assets folder for a particular version
					function makeImgDirectory (version) {
						fs.mkdir(`${dir}/${Static}/${versions[version]}/${img}`, function (err) {
					    if (err) {
                return console.log('failed to write directory', err);
					    }
					    copyImages(version); // Copy global images for this version before incrementing

					    version++;

					    if (version == totalVersions) {
					    	that.populateTemplate(dir, data); // Build files into folders when complete
					    } else {
					    	makeVersionDirectory(version); // Otherwise perform these tasks for each version
					    }
						});
					}

					// Copy global images into image directory
					// TODO: allow all images from inside this folder to be copied, regardless of name
					function copyImages (version) {
						var images = ['blue.jpg', 'green.jpg', 'orange.jpg', 'red.jpg'];

						fse.copy(`${appRoot}/base-template/global-images`, `${dir}/${Static}/${versions[version]}/${img}`, (err) => {
			      	if (err) return console.error("error:", err);
			      	console.info(chalk.green("static images folder copied successfully."));
			      });
					}

	      } else {
					that.populateTemplate(dir, data); // If static is false, build as normal
	      }

			}
		});
	}

  // check for numberxnumber-overwite.scss, match the number and overwite the scss 
  //in that folder, then replace it with the default overwrite.scss in that folder - then delete from base template
  findEditedMasterScss() {
    var masterScssRegx = /([0-9]+x[0-9]+)-overwrite\.scss/; 
    var test = fs.readdirSync('base-template').filter((file) => {
      if (masterScssRegx.test(file)) {
        masterScss = file;
      }
      return masterScssRegx.test(file);
    });

    if (test.length) {

      var dash = test[0].indexOf('-');
      //find out which size folder the edited overwrite.scss file belonged to
      var masterScssSize = test[0].slice(0, dash);
      getFolders('src').map((sizeFolder) => {
        if (sizeFolder === masterScssSize) {
          return fs.readdirSync(`src/${sizeFolder}/doubleclick`).map((file) => {
            if (file === 'overwrite.scss') {
              var stream = fs.createReadStream(`base-template/${masterScss}`);
              stream.pipe(fs.createWriteStream(`src/${sizeFolder}/doubleclick/${file}`));
              //var had_error = false;
              //writeStream.on('error', function(err){
                //had_error = true;
              //});
              //writeStream.on('close', function(){
                //if (!had_error) fs.unlink(`base-template/${masterScss}`);
              //});
            }
          });
        }
      });
    }
    //TODO: comment back in once work out how to do the copy and deletion synchronoudly. at the mo, it deltes before it's finished copying sometimes
    //fs.unlinkSync(`base-template/${masterScss}`); //delete the edited overwrite.scss file afterwards
  }


  findAndDelMasterScss(){
    this.findEditedMasterScss();
  }


	populateTemplate(dir, data) {

    if (!this.Dynamic && this.DoubleClick) {
      fse.copy(`${appRoot}/base-template/global-images`, `${dir}/${DoubleClick}/img`, (err) => {
       if (err) return console.error("error:", err);
       console.info(chalk.green("images folder copied successfully."));
      });
    }

		this.formatFiles.map((file) => {
			this.formatPopulate(file, data, dir);
		});


    if (!this.Master) {
      this.findAndDelMasterScss(data);
    }

	}

	format(str, obj) {
		return str.toString().replace(/\{{([^}]+)\}}/g, function(match, group) {
			return obj[group];
		});
	}


	// Copy files and their contents into their correct subfolders
	formatPopulate(file, data, dir) {

		let fileData = fs.readFileSync(`${appRoot}/base-template/${file}`, 'utf8');
		let processedData = this.format(fileData, data);


		// Create individual folders for specific js files.
    if (this.isStatic()) {
      switch(file) {
        case 'static.js':
            fs.writeFileSync(`${dir}/${Static}/${file}`, processedData, 'utf8');
          break;
        case 'index.html':
        case 'overwrite.scss':
        case 'image-paths.js': 
          for (var version in versions) {
            fs.writeFileSync(`${dir}/${Static}/${versions[version]}/${file}`, processedData, 'utf8');
          }
          break;
        case 'main.js':
            fs.writeFileSync(`${dir}/${file}`, processedData, 'utf8');
          break;
        default:
          //console.log("Unknown file");
      }
    }
    if (this.DoubleClick) {
      switch(file) {
        case 'index.html':
        case 'overwrite.scss':
        case 'doubleclick.js':
            fs.writeFileSync(`${dir}/${DoubleClick}/${file}`, processedData, 'utf8');
          break;
        case 'main.js':
            fs.writeFileSync(`${dir}/${file}`, processedData, 'utf8');
          break;
        default:
          //console.log("Unknown file");
      }
    }
	}
}

new GenerateTemplates();
