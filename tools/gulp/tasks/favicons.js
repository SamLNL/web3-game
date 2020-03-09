const gulp = require("gulp");
const pkg = require("../../../package.json");

const copyFaviconTask = () => {
  return gulp.src(pkg.globs.favicon).pipe(gulp.dest(pkg.paths.dist.favicon));
};

gulp.task("copy:favicon", copyFaviconTask);
module.exports = copyFaviconTask;
