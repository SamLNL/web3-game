const gulp = require('gulp');
const fs = require('fs-extra');
const pkg = require('../../../package.json');
const errorHandler = require('../lib/errorHandler');
const $ = require('../lib/loadPlugins');

const vectorSource = `${pkg.paths.src.images.svg.sprite}**/*.svg`;
const vectorDist = pkg.paths.dist.images.svg.sprite;

gulp.task('moveSassFile', async () => {
  try {
    await fs.rename(
      `${vectorDist}css/_o-sprite.scss`,
      `${pkg.paths.src.scss}objects/_o-sprite.scss`
    );
    await fs.remove(`${vectorDist}css/`);
  } catch (e) {}
});

const svgSprite = () => {
  return gulp
    .src(vectorSource, { passthrough: true })
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
      })
    )
    .pipe(
      $.svgSprite({
        shape: {
          dimension: {
            maxWidth: 40,
            maxHeight: 40,
          },
          spacing: {
            padding: 0,
          },
          dest: './single/',
        },
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg',
            inline: false,
          },
          css: {
            prefix: '.o-',
            render: {
              scss: {
                dest: '_o-sprite.scss',
                template: 'tools/gulp/tasks/sprite.mustache',
              },
            },
          },
        },
      })
    )
    .on('error', errorHandler)
    .pipe($.size())
    .pipe(gulp.dest(vectorDist));
};

gulp.task('create:svg-sprite', gulp.series(svgSprite, 'moveSassFile'));
module.exports = svgSprite;
