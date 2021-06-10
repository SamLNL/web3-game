const gulp = require('gulp');
const pkg = require('../../../package.json');
const errorHandler = require('../lib/errorHandler');
const $ = require('../lib/loadPlugins');

const inlineJsTask = () => {
  $.fancyLog('-> Copying inline js');

  return gulp
    .src(pkg.globs.inlineJs)
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe(
      $.if(
        ['*.js', '!*.min.js'],
        $.newer({ dest: pkg.paths.templates.inlineJs, ext: '.min.js' }),
        $.newer({ dest: pkg.paths.templates.inlineJs + '_inlinejs' })
      )
    )
    .pipe($.if(['*.js', '!*.min.js'], $.uglify()))
    .pipe($.if(['*.js', '!*.min.js'], $.rename({ suffix: '.min' })))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.templates.inlineJs))
    .pipe($.filter('**/*.js'))
    .pipe($.browserSync.reload({ stream: true }));
};

gulp.task('create:inlineJS', inlineJsTask);

module.export = inlineJsTask;
