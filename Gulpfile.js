'use strict';

const gulp       = require('gulp'),
      watch      = require('gulp-watch'),

      requireDir = require('require-dir'),
      tasks      = requireDir('./gulp'),
      data       = require('./sizes.json');

// Setup watch tasks
gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch(['src/**/img', 'src/**/img/*'], ['img']);
});

gulp.task('default', ['connect', 'html', 'sass', 'img', 'scripts', 'watch']);
gulp.task('dev', ['html', 'sass', 'img', 'scripts']);
gulp.task('test', ['connect', 'ff', 'safari']);

// Testing task
// gulp.task('test', ['html-lint', 'js-lint', 'scss-lint']);

// Test code on commit
// gulp.task('pre-commit', ['test']);
