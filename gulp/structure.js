import { getFolders, checkSettingsAndRun, isStatic, getSubDirectories, connectOptions } from 'functions';

const gulp         = require('gulp'),
      ff           = require('gulp-connect-multi')(),
      safari       = require('gulp-connect-multi')(),
      connect      = require('gulp-connect-multi')(),
      zip          = require('gulp-zip'),
      rename       = require('gulp-rename'),
      cache        = require('gulp-cache'),

      del          = require('del'),
      merge2       = require('merge2'),
      runSequence  = require('run-sequence'),
      chalk        = require('chalk'),
      path         = require('path'),

const appRoot      = process.cwd();
const sizesFile    = fs.readFileSync(`${appRoot}/sizes.json`, `utf8`);

var sizes          = JSON.parse(sizesFile);
var DoubleClick    = sizes.DoubleClick;
var Dynamic        = sizes.Dynamic;
var Master         = sizes.Master;
var Static         = sizes.Static;


// Setup localhost server to view production files.
gulp.task('connect', connect.server(connectOptions('Google Chrome', 8000, 35729))); //default
gulp.task('ff', ff.server(connectOptions('firefox', 1337, 35727)));
gulp.task('safari', safari.server(connectOptions('safari', 8080, 35722)));


//
gulp.task('clear', () => {
  cache.clearAll();
});


// Zip the static folder and zip all individual static banners
gulp.task('zip', () => {
  var folders = getFolders('prod/static');
  function applyZip(source, name) {
    return gulp.src(source)
      .pipe(zip(name + '.zip'))
      .pipe(gulp.dest('zipped-banners'));
  }
  applyZip('prod/static/**', 'static');
  for (var folder in folders) {
    console.log(folders[folder]);
    applyZip('prod/static/' + folders[folder] + '/**',folders[folder].toString());
  }
});


// Overwrite base-template files with approved Master adjustments
gulp.task('overwrite', () => {
  var sources = [
    'src/**/index.html',
    'src/**/main.js',
    'src/global.scss',
    'src/normalize.scss',
    'src/variables.scss'
  ];
  DoubleClick === true ?  sources.push('src/**/doubleclick.js') : sources.push('src/**/image-paths.js');

  function copyScripts(source) {
    //css might be specific to the size of the master banner size, so keep a copy of it when overwriting base-template files in gulp master
    var name = `${sizes.dimensions[0].width}x${sizes.dimensions[0].height}-overwrite.scss`;
    return merge2(
      gulp.src(source),
      gulp.src(`src/${sizes.dimensions[0].width}x${sizes.dimensions[0].height}/doubleclick/overwrite.scss`)
        .pipe(rename(name))
    )
      .pipe(rename(function (path) {path.dirname = "/";}))
      .pipe(gulp.dest('./base-template'));
  }
  return copyScripts(sources);
});


//
gulp.task('del', () => {
  return del(['src', 'prod']);
});


//
gulp.task('master', (callback) => {
  if (Master) {
    runSequence('overwrite', 'del', callback);
    console.info(chalk.green("'src' and 'prod' are successfully deleted. Now change 'Master' to false and run 'npm run generate' and 'gulp'"));
  } else {
    console.info(chalk.yellow("Unable to run this command as 'Master' is false"));
  }
});
