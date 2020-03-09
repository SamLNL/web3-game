// Hot Module Replacement config for webpack

// node modules
const merge = require("webpack-merge");

// config files
const pkg = require("../../package.json");
const dev = require("./webpack.dev.js");

module.exports = [
  merge(dev[0], {
    entry: [
      `./${pkg.paths.src.js}${pkg.vars.jsNameLegacy}`,
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client"
    ]
  }),
  merge(dev[1], {
    entry: [
      `./${pkg.paths.src.js}${pkg.vars.jsName}`,
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client"
    ]
  })
];
