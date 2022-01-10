const gulp = require('gulp');
const pkg = require('../../../package');
const postcss = require('gulp-postcss');
const stylelint = require('stylelint');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const lintStylesTask = async () => {
  const result = await stylelint.lint({
    files: pkg.paths.src.scss + '**/*.scss',
    formatter: 'string',
  });

  if (result.errored) {
    throw new Error(result.output);
  }
};

const stylesTask = () => {
  return gulp.src(pkg.paths.src.scss + '*.scss')
  .pipe(postcss())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(pkg.paths.dist.css))
  .pipe(reload({stream: true}));
};

gulp.task('lint:styles', lintStylesTask);
gulp.task(
  'compile:styles',
  gulp.series(lintStylesTask, stylesTask)
);

module.exports = stylesTask;
