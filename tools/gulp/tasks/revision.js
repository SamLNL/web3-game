// node modules
const gulp = require('gulp');
const pkg = require('../../../package.json');
const $ = require('../lib/loadPlugins');

const revisionTask = () => {
  return gulp
    .src(pkg.globs.revision.files, { base: './public_html' })
    .pipe($.rev())
    .pipe(gulp.dest('dist'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('.tmp/'));
};

const revisionRenameTask = () => {
  const manifest = gulp.src('.tmp/rev-manifest.json', { allowEmpty: true });
  return gulp
    .src(pkg.globs.revision.replace, { base: '.' })
    .pipe(
      $.revRewrite({
        manifest: manifest,
        replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.twig', '.json'],
      })
    )
    .pipe(gulp.dest('dist'));
};

const revisionRenameTemplatesTask = () => {
  const manifest = gulp.src('.tmp/rev-manifest.json', { allowEmpty: true });
  return gulp
  .src(pkg.globs.revision.replaceTemplates, { base: './' })
  .pipe(
    $.revRewrite({
      manifest: manifest,
      replaceInExtensions: ['.html', '.hbs', '.twig', '.json'],
    })
  )
  .pipe(gulp.dest('dist'));
};

const moveResults = () => {
  return gulp.src('dist/public_html/assets/**').pipe(gulp.dest('dist/assets/'));
};

gulp.task('revision:assets', gulp.series(revisionTask, revisionRenameTask, revisionRenameTemplatesTask, moveResults));
