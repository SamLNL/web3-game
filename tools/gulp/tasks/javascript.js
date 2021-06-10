const chalk = require('chalk');
const fs = require('fs-extra');
const gulp = require('gulp');
const gzipSize = require('gzip-size');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { addAsset } = require('../lib/manifest');
const { getEnv, isDevMode } = require('../lib/getEnv');
const terserRollupPlugin = require('rollup-plugin-terser').terser;
const $ = require('../lib/loadPlugins');
const pkg = require('../../../package.json');

/**
 * A Rollup plugin that adds each chunk to the asset manifest, keyed by
 * the chunk name and the output extension, mapping to the file name.
 * @return {Object}
 */
const manifestPlugin = (manifest) => {
  return {
    name: 'manifest',
    generateBundle(options, bundle) {
      const ext = path.extname(options.entryFileNames);

      for (const [fileName, chunkInfo] of Object.entries(bundle)) {
        addAsset(chunkInfo.name + ext, pkg.paths.abs.js + fileName, manifest);
      }
    },
  };
};

/**
 * A Rollup plugin to generate a list of import dependencies for each entry
 * point in the module graph. This is then used by the template to generate
 * the necessary `<link rel="modulepreload">` tags.
 * @return {Object}
 */
const modulepreloadPlugin = () => {
  return {
    name: 'modulepreload',
    generateBundle(options, bundle) {
      // A mapping of entry chunk names to their full dependency list.
      const modulepreloadMap = {};

      // Loop through all the chunks to detect entries.
      for (const [fileName, chunkInfo] of Object.entries(bundle)) {
        if (chunkInfo.isEntry || chunkInfo.isDynamicEntry) {
          modulepreloadMap[chunkInfo.name] = [fileName, ...chunkInfo.imports];
        }
      }

      fs.outputJsonSync(
        path.join(pkg.paths.dist.manifest, 'modulepreload.json'),
        modulepreloadMap,
        { spaces: 2 }
      );
    },
  };
};

const reportBundleSizePlugin = () => {
  let entryNames;
  return {
    name: 'bundle-size-plugin',
    buildStart: (inputOptions) => {
      entryNames = Object.keys(inputOptions.input);
    },
    generateBundle: (options, bundle) => {
      let bundleSize = 0;
      for (const [filename, chunkInfo] of Object.entries(bundle)) {
        const chunkSize = gzipSize.sync(chunkInfo.code);
        bundleSize += chunkSize;
        console.log(chalk.magenta(String(chunkSize).padStart(6)), chalk.gray(filename));
      }
      console.log(
        chalk.yellow(String(bundleSize).padStart(6)),
        chalk.white(`(total '${entryNames.join('/')}' bundle size)`)
      );
    },
  };
};

const terserConfig = {
  mangle: {
    toplevel: true,
    // properties: {
    //   regex: /(^_|_$)/,
    // },
    safari10: true,
  },
  compress: {
    toplevel: true,
    passes: 4,
  },
};

const manualChunks = (id) => {
  if (id.includes('node_modules')) {
    // The directory name following the last `node_modules`.
    // Usually this is the package, but it could also be the scope.
    const directories = id.split(path.sep);
    return directories[directories.lastIndexOf('node_modules') + 1];
  }
};

let moduleBundleCache;

const compileModuleBundle = async () => {
  const plugins = [
    resolve(),
    commonjs(),
    babel({
      exclude: /\bcore-js\b/,
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { esmodules: true },
            bugfixes: true,
          },
        ],
      ],
    }),
    reportBundleSizePlugin(),
    manifestPlugin(pkg.vars.manifest.modern),
  ];
  if (getEnv() !== 'development') {
    plugins.push(terserRollupPlugin(terserConfig));
  }

  const bundle = await rollup({
    input: {
      'main-module': `./${pkg.paths.src.js}main-module.js`,
    },
    cache: moduleBundleCache,
    plugins,
    manualChunks,
    preserveSymlinks: true, // Needed for `file:` entries in package.json.
    treeshake: {
      moduleSideEffects: 'no-external',
    },
  });

  moduleBundleCache = bundle.cache;

  await bundle.write({
    dir: pkg.paths.dist.js,
    format: 'esm',
    chunkFileNames: '[name].js',
    entryFileNames: '[name].js',

    // Don't rewrite dynamic import when developing (for easier debugging).
    dynamicImportFunction: getEnv === 'development' ? undefined : '__import__',
  });
};

let nomoduleBundleCache;

const compileClassicBundle = async () => {
  const plugins = [
    resolve(),
    commonjs(),
    babel({
      exclude: /\bcore-js\b/,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { browsers: Object.values(pkg.browserslist) },
            useBuiltIns: 'usage',
            loose: true,
            corejs: 3,
          },
        ],
      ],
      plugins: ['@babel/plugin-syntax-dynamic-import'],
    }),
    // checkDuplicatesPlugin(),
    reportBundleSizePlugin(),
    manifestPlugin(pkg.vars.manifest.modern),
  ];
  if (getEnv() !== 'development') {
    plugins.push(terserRollupPlugin(terserConfig));
  }

  const bundle = await rollup({
    input: {
      'main-es5': `./${pkg.paths.src.js}${pkg.vars.jsNameLegacy}`,
    },
    cache: nomoduleBundleCache,
    plugins,
    inlineDynamicImports: true, // Need for a single output bundle.
    preserveSymlinks: true, // Needed for `file:` entries in package.json.
  });

  nomoduleBundleCache = bundle.cache;

  await bundle.write({
    dir: pkg.paths.dist.js,
    format: 'iife',
    entryFileNames: '[name]-[hash]-es5.js',
  });
};

// Lint our js files
const lintJavascriptTask = () => {
  return gulp
    .src(pkg.globs.lintJs)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!isDevMode(), $.eslint.failAfterError()));
};

const compileJavascriptTask = async () => {
  try {
    await fs.remove(pkg.paths.abs.js);
    await compileModuleBundle();

    if (getEnv() !== 'development') {
      await compileClassicBundle();
    }
  } catch (err) {
    // Beep!
    process.stdout.write('\x07');

    // Log but don't throw so watching still works.
    console.error(err);
  }
};

gulp.task('lint:javascript', lintJavascriptTask);
gulp.task('compile:javascript', gulp.series(lintJavascriptTask, compileJavascriptTask));
