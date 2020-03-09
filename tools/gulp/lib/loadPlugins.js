const $ = require("gulp-load-plugins")({
  pattern: ["fancy-log", "autoprefixer", "postcss*", "browser-sync", "cssnano"],
  overridePattern: false,
  scope: ["devDependencies"]
});

module.exports = $;
