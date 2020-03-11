const gulp = require("gulp");
const pkg = require("../../../package.json");
const errorHandler = require("../lib/errorHandler");
const $ = require("../lib/loadPlugins");
const rename = require("gulp-rename");

const vectorSource = `${pkg.paths.src.images.svg.single}**/*.svg`;
const vectorDist = pkg.paths.dist.images.svg.single;

const copyVectors = () => {
  return gulp
    .src(vectorSource)
    .pipe(
      $.imagemin({
        svgoPlugins: [
          { cleanupIDs: false },
          { removeComments: true },
          { removeViewBox: false },
          { removeDesc: true },
          { removeTitle: true },
          { removeUselessDefs: false },
          { removeDoctype: true },
          { removeEmptyText: true },
          { removeUnknownsAndDefaults: false },
          { cleanupAttrs: false },
          { removeEmptyContainers: true },
          { collapseGroups: true },
          { sortAttrs: true },
          { removeUselessStrokeAndFill: true },
          { convertStyleToAttrs: true }
        ],
        verbose: true
      })
    )
    .on("error", errorHandler)
    .pipe(gulp.dest(vectorDist))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(rename(function (path) {
    path.extname = ".twig";
    }))
    .pipe(gulp.dest(pkg.paths.templates.inlineSvg));
};

gulp.task("copy:svg-single", copyVectors);
module.exports = copyVectors;
