const gulp = require('gulp');
const pkg = require('../../../package.json');
const $ = require('../lib/loadPlugins');

// tasks
require('./server');
const browserSync = require('browser-sync').create();

function reload(done) {
  browserSync.reload();
  done();
}

const watchTask = () => {
  $.fancyLog('👀 watching files for changes');

  // watch css
  gulp.watch([pkg.paths.src.scss + '**/*.scss'], gulp.series('compile:styles'));

  // watch images/svgs
  gulp.watch(
    `${pkg.paths.src.images.bitmap.base}**/*.{png,jpeg,jpg,gif,webp}`,
    gulp.series('optimize:images')
  );
  gulp.watch(`${pkg.paths.src.images.svg.single}**/*`, gulp.series('create:svg'));

  // watch js
  gulp.watch([pkg.paths.src.js + '**/*.js', pkg.paths.src.components + '**/*.js'], gulp.series('compile:javascript'));

  // watch templates
  gulp.watch(pkg.paths.dist.base + '*.html', gulp.series('compile:styles'));
};

gulp.task('watch', gulp.series('server', watchTask));
module.exports = watchTask;
