const gulp = require("gulp");

require("./setEnv");
require("./download");
require("./javascript");
require("./styles");
require("./clean");
require("./watch");
require("./server");
require("./watch");
require("./favicons");
require("./imagesSvg");
require("./images");
require("./serviceWorker");
require("./copyFonts");
require("./revision");

const buildTask = gulp.series(
  "clean",
  "system:env-prod",
  gulp.parallel(
    "download",
    "copy:fonts",
    "copy:favicon",
    "create:svg",
    "optimize:images"
  ),
  "compile:javascript",
  "compile:styles",
  "create:serviceworker",
  "revision:assets"
);

gulp.task("build", buildTask);
module.exports = buildTask;
