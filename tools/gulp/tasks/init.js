const gulp = require("gulp");

require("./setEnv");
require("./javascript");
require("./styles");
require("./clean");
require("./watch");

const initTask = gulp.series(
  "clean",
  "system:env-dev",
  gulp.parallel("copy:fonts", "copy:favicon", "create:svg", "optimize:images"),
  "compile:javascript",
  "compile:styles"
);

gulp.task("init", initTask);
module.exports = initTask;
