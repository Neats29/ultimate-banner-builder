'use strict';

const _config    = require('./config/config.json'),
      data       = require('./sizes.json'),
      requireDir = require('require-dir'),

      tasks      = requireDir('./gulp'),
      gulp       = require('gulp'),
      watch      = require('gulp-watch'),
      guppy      = require('git-guppy')(gulp);

// Watch tasks
gulp.task('watch', () => {
  gulp.watch(_config.paths.html.src, ['html']);
  gulp.watch(_config.paths.scss.src, ['sass']);
  gulp.watch(_config.paths.js.src,   ['scripts']);
  gulp.watch(_config.paths.img.src,  ['img']);
});

gulp.task('default', ['connect', 'html', 'sass', 'img', 'scripts', 'watch']);
gulp.task('dev', ['html', 'sass', 'img', 'scripts']);
gulp.task('test', ['connect', 'ff', 'safari']);

// Linting task
gulp.task('linting', ['html-lint', 'js-lint', 'sass-lint']);

// Test code on commit
gulp.task('pre-commit', ['linting']);
