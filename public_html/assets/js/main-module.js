import { i as initialize } from './dynamic-import-polyfill.js';

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
  const analytics = await __import__(
  /* webpackChunkName: "analytics" */
  './analytics.js');
  __import__('./index.js');
  __import__('./nav.js');

  if (document.querySelectorAll('.js-scroll').length > 0) {
    __import__(
    /* webpackChunkName: "scroll" */
    './scroll.js');
  }

  if (document.querySelectorAll('.js-tab-click').length > 0) {
    __import__(
    /* webpackChunkName: "tab-click" */
    './tab-click.js');
  }

  if (document.querySelectorAll('.js-faq').length > 0) {
    __import__(
    /* webpackChunkName: "faq" */
    './faq.js');
  }

  if (document.querySelectorAll('.js-swiper-preview').length > 0) {
    __import__(
    /* webpackChunkName: "swiper" */
    './swiper-preview.js');
  }

  if (document.querySelectorAll('.js-swiper-services').length > 0) {
    __import__(
    /* webpackChunkName: "swiper" */
    './swiper-services.js');
  } // components blocks


  if (document.querySelectorAll('.js-typeform').length > 0) {
    __import__(
    /* webpackChunkName: "typeform" */
    './typeform.js');
  }

  if (document.querySelectorAll('.js-load-more-button').length > 0) {
    __import__(
    /* webpackChunkName: "load-more" */
    './load-more.js');
  }

  if (document.querySelectorAll('.js-calendar').length > 0) {
    __import__(
    /* webpackChunkName: "load-more" */
    './calendar.js');
  }

  if (document.querySelectorAll('.js-slider').length > 0) {
    __import__(
    /* webpackChunkName: "swiper" */
    './slider.js');
  }

  if (document.querySelectorAll('.js-cta-blocks').length > 0) {
    await __import__(
    /* webpackChunkName: "swiper" */
    './cta-blocks.js');
  }

  if (document.querySelectorAll('.js-select-href').length > 0) {
    await __import__(
    /* webpackChunkName: "select" */
    './select-href.js');
  }

  if (document.querySelector('.js-sidebar-sticky')) {
    __import__(
    /* webpackChunkName: "select" */
    './sidebar-sticky.js');
  }

  if (document.querySelector('.js-calendar-datepicker')) {
    __import__(
    /* webpackChunkName: "select" */
    './date-input-polyfill.dist.js');
  }

  if (document.querySelector('.js-youtube-gdpr-form')) {
    __import__(
    /* webpackChunkName: "youtube" */
    './youtube.js');
  }

  analytics.init();
};

/**==========================================================================
   # Name: main-module
   # Date: 23 Apr 2020
   # Author: almeric
   ========================================================================== */
// If your modules are hosted in a sub-directory, it must be specified here.

initialize({
  modulePath: '/assets/js/'
}); // Start the app.
// noinspection JSIgnoredPromiseFromCall

main();
