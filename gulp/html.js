import { getFolders, checkSettingsAndRun, isStatic, getSubDirectories, connectOptions } from 'functions';

const gulp       = require('gulp'),
      removeCode = require('gulp-remove-code'),
      htmlmin    = require('gulp-htmlmin');


// Minimise html files and copy into appropriate folders. Also removes enabler script tag for GDN versions.
gulp.task('html', () => {

  var copyAndPipe = (gulpSrc, gulpDest, Static) => {
    if (return Static) {
      gulp.src(gulpSrc)
        .pipe(removeCode({ Static: true }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(gulpDest));
    } else {
      gulp.src(gulpSrc)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(gulpDest));
    }
  };

  var runHtml = (ad_type) => {
    if (isStatic(ad_type)) {
      return getSubDirectories('html', copyAndPipe, true);
    } else if (ad_type === "doubleclick") {
      return getSubDirectories('html', copyAndPipe, false);
    }
  };

  checkSettingsAndRun (Static, runHtml, 'static');
  checkSettingsAndRun (DoubleClick, runHtml, 'doubleclick');
});
