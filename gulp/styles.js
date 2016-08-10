'use strict';

const _functions    = require('./functions.js'),
      _config       = require('../config/config.json'),
      DoubleClick   = (0, _functions.DoubleClick),
      Dynamic       = (0, _functions.Dynamic),
      Master        = (0, _functions.Master),
      Static        = (0, _functions.Static),

      gulp          = require('gulp'),
      autoprefixer  = require('gulp-autoprefixer'),
      cleanCSS      = require('gulp-clean-css'),
      imagemin      = require('gulp-imagemin'),
      sass          = require('gulp-sass'),
      sassLint      = require('gulp-sass-lint'),
      sourcemaps    = require('gulp-sourcemaps');


// Optimise and copy images across into production static folders
gulp.task('img', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc)
      .pipe(imagemin({

        progressive: true,    // jpg
        interlaced: true,     // gif
        optimizationLevel: 3, // png
        multipass: true       // svg

      }))
    .pipe(gulp.dest(gulpDest));
  };

  if (Master && Static && !DoubleClick || !Master && Static) {
    (0, _functions.getSubDirectories)('img', copyAndPipe, true);
  }

  if (DoubleClick === true && Dynamic === false) {
    (0, _functions.getSubDirectories)('img', copyAndPipe, false);
  }
});


// Convert scss to css, minimise and copy into appropriate production folders.
// Uncss pipe to be uncommented in production.
gulp.task('sass', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc)
      .pipe(autoprefixer({
        browsers: ['IE >= 10', 'last 2 Firefox versions', 'Safari >= 6', 'last 2 Chrome versions']
      }))
      .pipe(sassLint({
        configFile: './sass-lint.yml'
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      //.pipe(uncss({ html: 'index.html' }))
      .pipe(sourcemaps.init())
      .pipe(sass({ includePaths: ['src'] }).on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulpDest));
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


// Scss Linting
gulp.task('sass-lint', function () {
  return gulp.src(_config.paths.scss.src)
    .pipe(sassLint({
      configFile: _config.paths.scss.config
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

