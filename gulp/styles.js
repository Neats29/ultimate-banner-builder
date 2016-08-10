'use strict';

var _functions = require('./functions.js');

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');

var Static = (0, _functions.Static);
var Master = (0, _functions.Master);
var DoubleClick = (0, _functions.DoubleClick);
var Dynamic = (0, _functions.Dynamic);


// Convert scss to css, minimise and copy into appropriate production folders
gulp.task('sass', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc).pipe(autoprefixer({
      browsers: ['IE >= 10', 'last 2 Firefox versions', 'Safari >= 6', 'last 2 Chrome versions']
    })).pipe(sassLint({
      configFile: './sass-lint.yml'
    })).pipe(sassLint.format()).pipe(sassLint.failOnError())
    //.pipe(uncss({ html: 'index.html' })) //to be uncommented in production
    .pipe(sourcemaps.init()).pipe(sass({ includePaths: ['src'] }).on('error', sass.logError)).pipe(cleanCSS()).pipe(sourcemaps.write()).pipe(gulp.dest(gulpDest));
  };

  var runSass = function runSass(ad_type) {
    if ((0, _functions.isStatic)(ad_type)) {
      return (0, _functions.getSubDirectories)('scss', copyAndPipe, true);
    } else if (ad_type === "doubleclick") {
      return (0, _functions.getSubDirectories)('scss', copyAndPipe, false);
    }
  };

  (0, _functions.checkSettingsAndRun)(Static, runSass, 'static');
  (0, _functions.checkSettingsAndRun)(DoubleClick, runSass, 'doubleclick');
});

// Optimise and copy images across into production static folders
gulp.task('img', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc).pipe(imagemin({
      // jpg
      progressive: true,

      // gif
      interlaced: true,

      // png
      optimizationLevel: 3,

      // svg
      multipass: true
    })).pipe(gulp.dest(gulpDest));
  };

  if (Master && Static && !DoubleClick || !Master && Static) {
    (0, _functions.getSubDirectories)('img', copyAndPipe, true);
  }

  if (DoubleClick === true && Dynamic === false) {
    (0, _functions.getSubDirectories)('img', copyAndPipe, false);
  }
});
