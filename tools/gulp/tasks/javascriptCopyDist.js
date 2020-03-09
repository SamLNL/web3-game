const gulp = require("gulp");
const pkg = require("../../../package.json");
const errorHandler = require("../lib/errorHandler");
const $ = require("../lib/loadPlugins");

// Copy vendor distribution Javascript into the public js folder
const copyVendorJs = () => {
  return gulp
    .src(pkg.globs.copyVendorToDistJs)
    .pipe($.plumber({ errorHandler }))
    .pipe(
      $.if(
        ["*.js", "!*.min.js"],
        $.newer({ dest: pkg.paths.dist.js, ext: ".min.js" }),
        $.newer({ dest: pkg.paths.dist.js })
      )
    )
    .pipe($.if(["*.js", "!*.min.js"], $.uglify()))
    .pipe($.if(["*.js", "!*.min.js"], $.rename({ suffix: ".min" })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.dist.js))
    .pipe($.filter("**/*.js"))
    .pipe($.browserSync.reload({ stream: true }));
};

gulp.task("copy:vendor-javascript", copyVendorJs);
module.exports = copyVendorJs;
