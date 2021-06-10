const gulp = require("gulp");
const pkg = require("../../../package.json");
const $ = require('../lib/loadPlugins');

const copyFaviconTask = () => {
  const manifestFilter = $.filter(['**/manifest.json']);
  return gulp.src(pkg.globs.favicon).pipe(gulp.dest(pkg.paths.favicon.dest)).pipe(manifestFilter).pipe(gulp.dest(pkg.paths.dist.base));
};

gulp.task("copy:favicon", copyFaviconTask);
module.exports = copyFaviconTask;