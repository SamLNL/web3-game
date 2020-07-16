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
  import ("./custom/nav");

  if(document.querySelectorAll('.js-scroll').length > 0) {
    await import(/* webpackChunkName: "scroll" */ "./custom/scroll");
  }

  if(document.querySelectorAll('.js-tab-click').length > 0) {
    await import(/* webpackChunkName: "tab-click" */ "./custom/tab-click");
  }

  if(document.querySelectorAll('.js-faq').length > 0) {
    await import(/* webpackChunkName: "faq" */ "./custom/faq");
  }

  if(document.querySelectorAll('.js-swiper-preview').length > 0) {
    await import(/* webpackChunkName: "swiper" */ "./custom/swiper-preview");
  }

  if(document.querySelectorAll('.js-swiper-services').length > 0) {
    await import(/* webpackChunkName: "swiper" */ "./custom/swiper-services");
  }

  // Common blocks
  if(document.querySelectorAll('.js-gallery').length > 0) {
    await import(/* webpackChunkName: "gallery" */ "./custom/components/gallery");
  }
  if(document.querySelectorAll('.js-slider').length > 0) {
    await import(/* webpackChunkName: "slider" */ "./custom/components/slider");
  }
  if(document.querySelectorAll('.js-teaser').length > 0) {
    await import(/* webpackChunkName: "teaser" */ "./custom/components/teaser");
  }
  if(document.querySelectorAll('.js-typeform').length > 0) {
    await import(/* webpackChunkName: "typeform" */ "./custom/components/typeform");
  }

  analytics.init();
};

// noinspection JSIgnoredPromiseFromCall
main();

// Enable Hot Module Replacement during development
// See for caveats: https://webpack.js.org/guides/hot-module-replacement/#gotchas
if (module.hot) {
  module.hot.accept();
}
