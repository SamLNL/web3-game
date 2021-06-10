const gulp = require('gulp');

require('./imagesSvgCopy');
require('./imagesSvgSprite');

gulp.task('create:svg', gulp.parallel('copy:svg-single', 'create:svg-sprite'));
