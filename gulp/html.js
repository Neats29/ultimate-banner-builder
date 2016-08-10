'use strict';

const _functions = require('./functions.js'),
      _config    = require('../config/config.json'),
      fs         = require('fs'),

      gulp       = require('gulp'),
      removeCode = require('gulp-remove-code'),
      htmlmin    = require('gulp-htmlmin'),
      htmllint   = require('gulp-htmllint'),
      gutil      = require('gulp-util'),
      newer      = require('gulp-newer');


// Minimise html files and copy into appropriate folders. Also removes enabler script tag for GDN versions.
gulp.task('html', function () {

  var copyAndPipe = function copyAndPipe(gulpSrc, gulpDest, Static) {
    return Static ?
    gulp.src(gulpSrc)
      .pipe(removeCode({ Static: true }))
      .pipe(newer(gulpDest))
      .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(gulpDest)) :

    gulp.src(gulpSrc)
      .pipe(newer(gulpDest))
      .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(gulpDest));
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


// HTML Lint
gulp.task('html-lint', function() {
  return gulp.src(_config.paths.html.src)
    .pipe(htmllint({
      config: _config.paths.html.config
    }, htmllintReporter))
});


// HTML Lint Reporter
function htmllintReporter(filepath, issues) {

  var filepathSplit = filepath.split('/');
  var fileName = filepathSplit[filepathSplit.length - 1];

  gutil.log(gutil.colors.yellow("Linting '") + gutil.colors.cyan(fileName) + gutil.colors.yellow("'"));

  if (issues.length > 0) {

      issues.forEach(function (issue) {
          gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
      });

      process.exitCode = 1;

  } else {

    gutil.log(gutil.colors.cyan(fileName) + gutil.colors.yellow(" has passed linting!"));

  }
}
