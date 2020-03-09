const gulp = require("gulp");
const workbox = require("workbox-build");
const pkg = require("../../../package");
const errorHandler = require("../lib/errorHandler");
const { promisify } = require("util");
const glob = require("glob");
const files = promisify(glob);

const generateServiceWorker = async cb => {
  try {
    const globs = ["assets/**/*.css", "assets/**/!(*.es5).js"];

    // Workbox stops pre-caching if a glob doesn't return files, so we check first what we
    // need to include
    const bitmapGlob = "assets/images/bitmap/**/*.{png,jpeg,jpg,gif,webp}";
    const bitmaps = await files(`${pkg.paths.dist.base}${bitmapGlob}`);
    if (bitmaps.length) {
      globs.push(bitmapGlob);
    }

    const svgGlob = "assets/images/svg/**/*.svg";
    const svgs = await files(`${pkg.paths.dist.base}${svgGlob}`);
    if (svgs.length) {
      globs.push(svgGlob);
    }

    await workbox.injectManifest({
      globDirectory: pkg.paths.dist.base,
      globPatterns: globs,
      swSrc: `${pkg.paths.src.sw}sw-base.js`,
      swDest: `${pkg.paths.dist.base}sw.js`,
      templatedUrls: {
        "/offline": "offline-page",
        "/": "home"
      }
    });
  } catch (e) {
    errorHandler(e, cb);
  }
};

gulp.task("create:serviceworker", generateServiceWorker);

module.exports = generateServiceWorker;
