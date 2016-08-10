'use strict';

const _functions = require('./functions.js'),
      fs         = require('fs'),

      gulp       = require('gulp'),
      removeCode = require('gulp-remove-code'),
      htmlmin    = require('gulp-htmlmin');

// Minimise html files and copy into appropriate folders. Also removes enabler script tag for GDN versions.
gulp.task('html', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest, Static) {
    return Static ? gulp.src(gulpSrc).pipe(removeCode({ Static: true })).pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest(gulpDest)) : gulp.src(gulpSrc).pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest(gulpDest));
  };

  var runHtml = function runHtml(ad_type) {
    if ((0, _functions.isStatic)(ad_type)) {
      return (0, _functions.getSubDirectories)('html', copyAndPipe, true);
    } else if (ad_type === "doubleclick") {
      return (0, _functions.getSubDirectories)('html', copyAndPipe, false);
    }
  };

  (0, _functions.checkSettingsAndRun)((0, _functions.Static), runHtml, 'static');
  (0, _functions.checkSettingsAndRun)((0, _functions.DoubleClick), runHtml, 'doubleclick');
});
