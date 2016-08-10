import { getFolders, checkSettingsAndRun, isStatic, getSubDirectories, connectOptions } from 'functions';

const gulp         = require('gulp'),
      jshint       = require('gulp-jshint'),
      sourcemaps   = require('gulp-sourcemaps'),
      concat       = require('gulp-concat'),
      uglify       = require('gulp-uglify'),
      rename       = require('gulp-rename');


// Combine various javascript files and minimise them before copying into relevant production folders.
gulp.task('scripts', () => {

  var copyAndPipe = (gulpSrc, gulpDest) => {
    return gulp.src(gulpSrc)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(sourcemaps.init())
      .pipe(concat(sizeFolder + '.js'))
      .pipe(uglify())
      .pipe(rename('ad.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(gulpDest));
  };

  var runJS = (ad_type) => {
    if (isStatic(ad_type)) {
      return getSubDirectories('js', copyAndPipe, true);
    } else if (ad_type === "doubleclick") {
      return getSubDirectories('js', copyAndPipe, false);
    }
  };

  checkSettingsAndRun (Static, runJS, 'static');
  checkSettingsAndRun (DoubleClick, runJS, 'doubleclick');
});
