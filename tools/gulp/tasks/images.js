const gulp = require('gulp');
const pkg = require('../../../package.json');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegTran = require('imagemin-jpegtran');
const $ = require('../lib/loadPlugins');

const optimizeImagesTask = () => {
  $.fancyLog('Copying images in ' + pkg.paths.src.img);
  return gulp
  .src(
    `${pkg.paths.src.images.bitmap.base}**/*.{png,jpeg,jpg,gif,webp,ico,xml,json,webapp}`
  )
  .pipe($.size())
  .pipe(
    $.imagemin(
      [
        //png
        imageminPngquant({
          strip: true,
          speed: 1,
        }),
        imageminZopfli({
          more: true,
          // iterations: 50 // very slow but more effective
        }),
        imageminGifsicle({
          optimizationLevel: 3,
          interlaced: true,
        }),
        //jpg lossless
        imageminJpegTran({
          progressive: true,
        }),
        //jpg very light lossy, use vs jpegtran
        imageminMozjpeg({
          quality: 80,
          progressive: true,
        }),
      ],
      {
        verbose: true,
      }
    )
  )
  .pipe($.size())
  .pipe(gulp.dest(pkg.paths.dist.images.bitmap.base));
};

gulp.task('optimize:images', optimizeImagesTask);
module.exports = optimizeImagesTask;
