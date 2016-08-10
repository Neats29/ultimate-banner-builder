'use strict';

const fs          = require('fs'),
      src         = 'src',
      path        = require('path'),
      folders     = getFolders(src),
      gulp        = require('gulp'),
      filter      = require('gulp-filter'),

      appRoot     = exports.appRoot = process.cwd(),
      sizesFile   = exports.sizesFile = fs.readFileSync(appRoot + '/sizes.json', 'utf8'),
      sizes       = exports.sizes = JSON.parse(sizesFile),
      DoubleClick = exports.DoubleClick = sizes.DoubleClick,
      Dynamic     = exports.Dynamic = sizes.Dynamic,
      Master      = exports.Master = sizes.Master,
      Static      = exports.Static = sizes.Static,
      sizeFolder  = exports.sizeFolder = sizes.sizeFolder;

Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolders = getFolders;
exports.checkSettingsAndRun = checkSettingsAndRun;
exports.isStatic = isStatic;
exports.getSubDirectories = getSubDirectories;
exports.connectOptions = connectOptions;


//
function checkSettingsAndRun(setting, execute, usingPath) {
  if (setting) {
    execute(usingPath);
  }
}


// Open in browsers.
function connectOptions(browser, port, live) {
  return {
    root: ['./prod/'],
    port: port,
    livereload: {
      port: live
    },
    open: {
      browser: browser
    }
  };
}


// Get folder names inside a given directory (dir).
function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}


//
function isStatic(ad) {
  if (ad === 'static' && Master && Static && !DoubleClick || ad === 'static' && !Master && Static) return true;
}


// Loop through the folders to get to the right sub-directories and apply their custom copy tasks to them.
function getSubDirectories(fileType, copyFunc, Static) {
  return folders.map(function (sizeFolder) {
    var ad;
    if (Static) {
      ad = 'static';
      var srcSizeAd = src + '/' + sizeFolder + '/' + ad;
      var typeFolder = getFolders(srcSizeAd); // Static or Dynamic
      return typeFolder.map(function (versionFolder) {
        var srcSizeAdVersion = src + '/' + sizeFolder + '/' + ad + '/' + versionFolder;
        var dest = 'prod/' + ad + '/' + sizeFolder + '-' + versionFolder;
        var source = fileType === 'scss' ? [srcSizeAdVersion + '/*.' + fileType, '!src/*.scss'] : fileType === 'html' ? srcSizeAdVersion + '/*.' + fileType : fileType === 'img' ? [srcSizeAdVersion + '/**/*', '!' + srcSizeAdVersion + '/*.js', '!' + srcSizeAdVersion + '/*.html', '!' + srcSizeAdVersion + '/*.scss'] : fileType === 'js' ? [src + '/' + sizeFolder + '/*.' + fileType, srcSizeAd + '/*.' + fileType, srcSizeAdVersion + '/*.' + fileType] : false;
        return copyFunc(source, dest, path);
      });
    } else {
      ad = 'doubleclick';
      var dest = 'prod/' + ad + '/' + sizeFolder;
      var source = fileType === 'js' ? [path.join(src, sizeFolder, '/**/' + ad + '.js'), path.join(src, sizeFolder, '/**/main.js')] : fileType === 'img' ? [path.join(src, sizeFolder, ad, '/**/img/*'), path.join(src, sizeFolder, ad, '/**/img/*')] : fileType === 'scss' ? [src + '/' + sizeFolder + '/' + ad + '/*.scss', '!' + src + '/*.scss'] : fileType === 'html' ? src + '/' + sizeFolder + '/' + ad + '/*.html' : false;
      return copyFunc(source, dest);
    }
  });
}
