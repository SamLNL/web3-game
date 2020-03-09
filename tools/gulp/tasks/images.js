const gulp = require("gulp");
const pkg = require("../../../package.json");
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGiflossy = require("imagemin-giflossy");
const $ = require("../lib/loadPlugins");

const optimizeImagesTask = () => {
  $.fancyLog("Copying images in " + pkg.paths.src.img);
  return gulp
    .src(
      `${
        pkg.paths.src.images.bitmap.base
      }**/*.{png,jpeg,jpg,svg,gif,webp,ico,xml,json,webapp}`
    )
    .pipe($.size())
    .pipe(
      $.imagemin(
        [
          //png
          imageminPngquant({
            strip: true,
            speed: 1
          }),
          imageminZopfli({
            more: true
            // iterations: 50 // very slow but more effective
          }),
          imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3, //keep-empty: Preserve empty transparent frames
            lossy: 2
          }),
          //jpg lossless
          $.imagemin.jpegtran({
            progressive: true
          }),
          //jpg very light lossy, use vs jpegtran
          imageminMozjpeg({
            quality: 80,
            progressive: true
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe($.size())
    .pipe(gulp.dest(pkg.paths.dist.images.bitmap.base));
};

gulp.task("optimize:images", optimizeImagesTask);
module.exports = optimizeImagesTask;
