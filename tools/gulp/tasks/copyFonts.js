const gulp = require("gulp");
const pkg = require("../../../package.json");

const copyFontsTask = () => {
  return gulp.src(pkg.globs.fonts).pipe(gulp.dest(pkg.paths.dist.fonts));
};

gulp.task("copy:fonts", copyFontsTask);
module.exports = copyFontsTask;
