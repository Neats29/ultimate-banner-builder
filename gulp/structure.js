'use strict';

const _functions  = require('./functions.js'),
      Master      = (0, _functions.Master),
      DoubleClick = (0, _functions.DoubleClick),
      sizes       = (0, _functions.sizes),
      chalk       = require('chalk'),
      del         = require('del'),
      fs          = require('fs'),
      merge       = require('merge-stream'),
      merge2      = require('merge2'),
      path        = require('path'),
      runSequence = require('run-sequence'),

      gulp        = require('gulp'),
      zip         = require('gulp-zip'),
      rename      = require('gulp-rename'),
      cache       = require('gulp-cache');


gulp.task('clear', function () {
  cache.clearAll();
});


gulp.task('del', function () {
  return del(['src', 'prod']);
});


gulp.task('master', function (callback) {
  if (Master) {
    runSequence('overwrite', 'del', callback);
    console.info(chalk.green("'src' and 'prod' are successfully deleted. Now change 'Master' to false and run 'npm run generate' and 'gulp'"));
  } else {
    console.info(chalk.yellow("Unable to run this command as 'Master' is false"));
  }
});


// Overwrite base-template files with approved Master adjustments.
gulp.task('overwrite', function () {
  var sources = ['src/**/index.html', 'src/**/main.js', 'src/global.scss', 'src/normalize.scss', 'src/variables.scss'];
  DoubleClick === true ? sources.push('src/**/doubleclick.js') : sources.push('src/**/image-paths.js');

  function copyScripts(source) {
    //css might be specific to the size of the master banner size, so keep a copy of it when overwriting base-template files in gulp master.
    var name = sizes.dimensions[0].width + 'x' + sizes.dimensions[0].height + '-overwrite.scss';
    return merge2(
      gulp.src(source),
      gulp.src('src/' + sizes.dimensions[0].width + 'x' + sizes.dimensions[0].height + '/doubleclick/overwrite.scss')
      .pipe(rename(name)))
      .pipe(rename(function (path) {
        path.dirname = "/";
      }))
      .pipe(gulp.dest('./base-template'));
  }

  return copyScripts(sources);
});


// Zip the static folder and zip all individual static banners.
gulp.task('zip', function () {
  var folders = (0, _functions.getFolders)('prod/static');

  function applyZip(source, name) {
    return gulp.src(source)
      .pipe(zip(name + '.zip'))
    .pipe(gulp.dest('zipped-banners'));
  }

  applyZip('prod/static/**', 'static');
  for (var folder in folders) {
    if(folders.hasOwnProperty(folder)) {
      console.log(folders[folder]);
      applyZip('prod/static/' + folders[folder] + '/**', folders[folder].toString());
    }
  }
});
