const gulp = require('gulp');
const pkg = require('../../../package.json');
const errorHandler = require('../lib/errorHandler');
const $ = require('../lib/loadPlugins');

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
          { removeUnknownsAndDefaults: true },
          { removeEmptyContainers: true },
          { collapseGroups: true },
          { sortAttrs: true },
          { removeUselessStrokeAndFill: true },
          { convertStyleToAttrs: true },
        ],
        verbose: true,
      })
    )
    .on('error', errorHandler)
    .pipe(gulp.dest(vectorDist))
};

gulp.task('copy:svg-single', copyVectors);
module.exports = copyVectors;
