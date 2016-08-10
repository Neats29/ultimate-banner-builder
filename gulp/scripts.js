'use strict';

var _functions = require('./functions.js');

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var Static = (0, _functions.Static);
var DoubleClick = (0, _functions.DoubleClick);
var sizeFolder = (0, _functions.sizeFolder);

// Combine various javascript files and minimise them before copying into relevant production folders.
gulp.task('scripts', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest) {
    return gulp.src(gulpSrc).pipe(jshint()).pipe(jshint.reporter('jshint-stylish')).pipe(sourcemaps.init()).pipe(concat(sizeFolder + '.js')).pipe(uglify()).pipe(rename('ad.js')).pipe(sourcemaps.write()).pipe(gulp.dest(gulpDest));
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
