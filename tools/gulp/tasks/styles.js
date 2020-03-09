const gulp = require("gulp");
const pkg = require("../../../package");
const fs = require("fs-extra");
const chalk = require("chalk");
const errorHandler = require("../lib/errorHandler");
const { isDevMode } = require("../lib/getEnv");
const { generateRevisionedAsset, generateAsset } = require("../lib/manifest");
const sass = require("sass");
const postcss = require("postcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const Fiber = require("fibers");
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");
const $ = require("../lib/loadPlugins");
const stylelint = require("stylelint");
const magicImporter = require("node-sass-magic-importer");

const getProcessors = () => {
  let postCSSProcessors = [$.autoprefixer()];

  if (isDevMode()) {
    postCSSProcessors = postCSSProcessors.concat([
      $.postcssReporter({
        clearMessages: true,
        throwError: false
      })
    ]);
  } else {
    postCSSProcessors = postCSSProcessors.concat([
      $.postcssReporter({
        clearMessages: true,
        throwError: true
      }),
      purgecss({
        whitelist: pkg.globs.purgecssWhitelist,
        content: pkg.globs.purgecss
      }),
      $.cssnano({
        preset: "default",
        discardComments: {
          removeAll: true
        },
        discardDuplicates: true,
        discardEmpty: true,
        minifyFontValues: true,
        minifySelectors: true
      })
    ]);
  }

  return postCSSProcessors;
};

const createSassCompiler = (from, outfile) => {
  return () => {
    return new Promise((resolve, reject) => {
      sass.render(
        {
          file: from,
          importer: magicImporter(),
          outFile: outfile,
          outputStyle: "expanded",
          sourceMap: isDevMode(),
          fiber: Fiber
        },
        (err, result) => {
          if (err) {
            // unset stack so we log useful info
            err.stack = undefined;
            return reject(err);
          }
          return resolve(result);
        }
      );
    });
  };
};

const compileCss = async (from, outfile) => {
  const sassCompiler = createSassCompiler(from, outfile);
  let result = await sassCompiler();

  result = await postcss(getProcessors()).process(result.css.toString(), {
    from: from,
    to: pkg.paths.dist.css,
    map: {
      inline: isDevMode(),
      prev: result.map ? result.map.toString() : false
    }
  });
  return result.css;
};

const lintStylesTask = async () => {
  const result = await stylelint.lint({
    files: pkg.paths.src.scss + "**/*.scss",
    formatter: "string"
  });

  if (result.errored) {
    throw new Error(result.output);
  }
};

const stylesTask = async done => {
  try {
    const css = await compileCss(
      pkg.paths.src.scss + pkg.vars.scssName,
      pkg.vars.siteCssName
    );
    // Generated rev'ed filename
    let filename = "";

    if (isDevMode()) {
      filename = await generateAsset(
        pkg.paths.dist.css + pkg.vars.siteCssName,
        css,
        pkg.vars.manifest.legacy
      );
      await generateAsset(
        pkg.paths.dist.css + pkg.vars.siteCssName,
        css,
        pkg.vars.manifest.modern
      );
    } else {
      filename = await generateRevisionedAsset(
        pkg.paths.dist.css + pkg.vars.siteCssName,
        css,
        pkg.vars.manifest.legacy
      );
      await generateRevisionedAsset(
        pkg.paths.dist.css + pkg.vars.siteCssName,
        css,
        pkg.vars.manifest.modern
      );
    }

    await fs.outputFile(filename, css);
    const stats = await fs.stat(filename);
    $.fancyLog(
      chalk`Generated: {magenta ${filename}} (${prettyBytes(
        stats.size
      )}, Gzipped: ${prettyBytes(gzipSize.sync(css))})`
    );
  } catch (e) {
    done();
    errorHandler(e);
  }
};

gulp.task("lint:styles", lintStylesTask);
gulp.task(
  "compile:styles",
  gulp.series(gulp.parallel(stylesTask))
);

module.exports = stylesTask;
