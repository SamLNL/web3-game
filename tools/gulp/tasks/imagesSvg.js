const gulp = require('gulp');

require('./imagesSvgCopy');

gulp.task('create:svg', gulp.parallel('copy:svg-single'));
