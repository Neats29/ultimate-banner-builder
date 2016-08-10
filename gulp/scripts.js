'use strict';

const _functions  = require('./functions.js'),
      _config     = require('../config/config.json'),
      Static      = (0, _functions.Static),
      DoubleClick = (0, _functions.DoubleClick),
      sizeFolder  = (0, _functions.sizeFolder),

      gulp        = require('gulp'),
      concat      = require('gulp-concat'),
      jshint      = require('gulp-jshint'),
      rename      = require('gulp-rename'),
      sourcemaps  = require('gulp-sourcemaps'),
      uglify      = require('gulp-uglify');


// Combine various javascript files and minimise them before copying into relevant production folders.
gulp.task('scripts', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc)
    .pipe(sourcemaps.init()).pipe(concat(sizeFolder + '.js'))
    .pipe(uglify())
    .pipe(rename('ad.js'))
    .pipe(sourcemaps.write()).pipe(gulp.dest(gulpDest));
  };

  var runJS = function runJS(ad_type) {
    if ((0, _functions.isStatic)(ad_type)) {
      return (0, _functions.getSubDirectories)('js', copyAndPipe, true);
    } else if (ad_type === "doubleclick") {
      return (0, _functions.getSubDirectories)('js', copyAndPipe, false);
    }
  };

  (0, _functions.checkSettingsAndRun)(Static, runJS, 'static');
  (0, _functions.checkSettingsAndRun)(DoubleClick, runJS, 'doubleclick');
});


gulp.task('js-lint', function () {
  return gulp.src(_config.paths.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

