const fs = require("fs-extra");
const gulp = require("gulp");
const pkg = require("../../../package");

gulp.task("clean", async () => {
  await fs.remove(pkg.paths.dist.js);
  await fs.remove(pkg.paths.dist.manifest);
  await fs.remove(pkg.paths.dist.css);
  await fs.remove(pkg.paths.dist.fonts);
  await fs.remove(pkg.paths.dist.images.base);
});
