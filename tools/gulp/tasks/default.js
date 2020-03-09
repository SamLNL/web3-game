const gulp = require("gulp");

require("./setEnv");
require("./javascript");
require("./styles");
require("./clean");
require("./watch");
require("./javascriptInline");
require("./javascriptCopyDist");
require("./server");
require("./watch");
require("./favicons");
require("./imagesSvg");
require("./images");

const defaultTask = gulp.series(
  "clean",
  "system:env-dev",
  gulp.parallel("copy:fonts", "copy:favicon", "create:svg", "optimize:images"),
  "create:inlineJS",
  "copy:vendor-javascript",
  "compile:javascript",
  "compile:styles",
  "watch"
);

gulp.task("default", defaultTask);
module.exports = defaultTask;
