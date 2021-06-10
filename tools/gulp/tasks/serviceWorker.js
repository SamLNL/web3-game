const gulp = require('gulp');
const workbox = require('workbox-build');
const pkg = require('../../../package');
const errorHandler = require('../lib/errorHandler');
const { promisify } = require('util');
const glob = require('glob');
const files = promisify(glob);
const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const terserRollupPlugin = require('rollup-plugin-terser').terser;
const replace = require('@rollup/plugin-replace');
const { getEnv } = require('../lib/getEnv');

const terserConfig = {
  mangle: {
    toplevel: true,
    // properties: {
    //   regex: /(^_|_$)/,
    // },
    safari10: true,
  },
};

let swBundleCache;

const compileServiceWorkerBundle = async () => {
  const plugins = [
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs(),
  ];

  if (getEnv() !== 'development') {
    plugins.push(terserRollupPlugin(terserConfig));
  }

  const bundle = await rollup({
    input: {
      sw: `./${pkg.paths.dist.base}/sw.js`,
    },
    cache: swBundleCache,
    plugins,
    preserveSymlinks: true, // Needed for `file:` entries in package.json.
    inlineDynamicImports: true, // Need for a single output bundle.
  });

  await bundle.write({
    dir: `${pkg.paths.dist.base}`,
    format: 'iife',
    entryFileNames: '[name].js',
  });
};

const generateServiceWorker = async (cb) => {
  try {
    const globs = ['assets/**/*.css', 'assets/**/!(*.es5).js'];

    // Workbox stops pre-caching if a glob doesn't return files, so we check first what we
    // need to include
    const bitmapGlob = 'assets/images/bitmap/**/*.{png,jpeg,jpg,gif,webp}';
    const bitmaps = await files(`${pkg.paths.dist.base}${bitmapGlob}`);
    if (bitmaps.length) {
      globs.push(bitmapGlob);
    }

    const svgGlob = 'assets/images/svg/**/*.svg';
    const svgs = await files(`${pkg.paths.dist.base}${svgGlob}`);
    if (svgs.length) {
      globs.push(svgGlob);
    }

    await workbox.injectManifest({
      globDirectory: pkg.paths.dist.base,
      globPatterns: globs,
      swSrc: `${pkg.paths.src.sw}sw-base.js`,
      swDest: `${pkg.paths.dist.base}sw.js`,
      templatedURLs: {
        '/offline': 'offline-page',
        '/': 'home',
      },
    });

    await compileServiceWorkerBundle();
  } catch (e) {
    errorHandler(e, cb);
  }
};

gulp.task('create:serviceworker', generateServiceWorker);

module.exports = generateServiceWorker;
