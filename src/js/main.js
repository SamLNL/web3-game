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

  // components blocks
  if(document.querySelectorAll('.js-typeform').length > 0) {
    await import(/* webpackChunkName: "typeform" */ "./custom/components/typeform");
  }
  if(document.querySelectorAll('.js-load-more-button').length > 0) {
    await import(/* webpackChunkName: "load-more" */ "./custom/load-more");
  }
  if(document.querySelectorAll('.js-calendar').length > 0) {
    await import(/* webpackChunkName: "load-more" */ "./custom/components/calendar");
  }

  if(document.querySelectorAll('.js-slider').length > 0) {
    await import(/* webpackChunkName: "swiper" */ "./custom/components/slider");
  }

  if(document.querySelectorAll('.js-cta-blocks').length > 0) {
    await import(/* webpackChunkName: "swiper" */ "./custom/components/cta-blocks");
  }

  if(document.querySelectorAll('.js-select-href').length > 0) {
    await import(/* webpackChunkName: "select" */ "./custom/select-href");
  }

  if(document.querySelector('.js-sidebar-sticky')) {
    await import(/* webpackChunkName: "select" */ "./custom/components/sidebar-sticky");
  }

  if(document.querySelector('.js-calendar-datepicker')) {
    await import(/* webpackChunkName: "select" */ "./custom/date-input-polyfill.dist");
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
