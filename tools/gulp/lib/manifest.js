/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const revHash = require('rev-hash');
const revPath = require('rev-path');
const pkg = require('../../../package');

let revisionedAssetManifest;

const getManifest = (manifestFileName) => {
  revisionedAssetManifest =
    fs.readJsonSync(path.join(pkg.paths.dist.manifest, manifestFileName), {
      throws: false,
    }) || {};
  return revisionedAssetManifest;
};

const saveManifest = (manifestFileName) => {
  fs.outputJsonSync(
    path.join(pkg.paths.dist.manifest, manifestFileName),
    revisionedAssetManifest,
    { spaces: 2 }
  );
};

const resetManifest = () => {
  revisionedAssetManifest = {};
  saveManifest(pkg.vars.manifest.modern);
  saveManifest(pkg.vars.manifest.legacy);
};

const getAsset = (filename, manifestFileName) => {
  getManifest(manifestFileName);

  if (!revisionedAssetManifest[filename]) {
    console.error(
      `Revisioned file for '${filename}' in ${manifestFileName} doesn't exist`
    );
  }

  return revisionedAssetManifest[filename];
};

const addAsset = async (filename, revisionedFilename, manifestFileName) => {
  getManifest(manifestFileName);
  revisionedAssetManifest[filename] = revisionedFilename;
  saveManifest(manifestFileName);
};

const getRevisionedAssetUrl = (filename, manifestFileName) => {
  return path.join(pkg.paths.dist.base, getAsset(filename, manifestFileName));
};

const generateRevisionedAsset = async (file, content, manifestFileName) => {
  const hash = revHash(content);
  const filename = path.basename(file);
  const pathInfo = path.parse(file);
  const revisionedFilename = revPath(filename, hash);

  // Updates the internal revision map so it can be referenced later.
  await addAsset(
    filename,
    '/' + path.relative(pkg.paths.dist.base, pathInfo.dir + '/' + revisionedFilename),
    manifestFileName
  );
  return path.join(pathInfo.dir, revisionedFilename);
};

const generateAsset = async (file, content, manifestFileName) => {
  const filename = path.basename(file);
  const pathInfo = path.parse(file);

  // Updates the internal revision map so it can be referenced later.
  await addAsset(
    filename,
    '/' + path.relative(pkg.paths.dist.base, pathInfo.dir + '/' + filename),
    manifestFileName
  );
  return path.join(pathInfo.dir, filename);
};

/**
 * Removes all keys from the manifest where the extension equals the given value. Handy for clearing all
 * js files for example
 * @param manifestFileNames The manifest files
 * @param extensions The extensions to remove
 */
const clearManifestOfExt = (manifestFileNames, ...extensions) => {
  manifestFileNames.forEach((manifestFileName) => {
    revisionedAssetManifest =
      fs.readJsonSync(path.join(pkg.paths.dist.manifest, manifestFileName), {
        throws: false,
      }) || {};

    extensions.forEach((ext) => {
      for (let key in revisionedAssetManifest) {
        if (
          revisionedAssetManifest.hasOwnProperty(key) &&
          key.slice(-ext.length) === ext
        ) {
          delete revisionedAssetManifest[key];
        }
      }
    });

    saveManifest(manifestFileName);
  });
};

module.exports = {
  getManifest,
  saveManifest,
  resetManifest,
  getAsset,
  addAsset,
  getRevisionedAssetUrl,
  clearManifestOfExt,
  generateRevisionedAsset,
  generateAsset,
};
