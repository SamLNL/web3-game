/**==========================================================================
   # Name: main
   # Date: 303 Oct 2018
   # Author: peter
   ========================================================================== */

/**
 * Main js file for modern browsers
 *
 */

const main = async () => {
  const analytics = await import(/* webpackChunkName: "analytics" */ "./analytics/analytics");
  import ("./bootstrap/index");
  analytics.init();
};

// noinspection JSIgnoredPromiseFromCall
main();

// Enable Hot Module Replacement during development
// See for caveats: https://webpack.js.org/guides/hot-module-replacement/#gotchas
if (module.hot) {
  module.hot.accept();
}
