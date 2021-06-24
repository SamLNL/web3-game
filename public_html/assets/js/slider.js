import { S as Swiper } from './swiper.js';
import { sendGAEvent } from './analytics.js';
import './dom7.js';
import './ssr-window.js';
import './idlize.js';
import './autotrack.js';
import './dom-utils.js';

/**==========================================================================
 # Name: Slider
 # Date: jan 2019
 # Author: sam
 ========================================================================== */
let sliders = document.querySelectorAll('.js-slider');
let swipers = {};
[].forEach.call(sliders, function (el, i) {
  let id = el.getAttribute('data-swiper-id');
  let prevEl = document.querySelector('.carousel-control-prev[data-swiper-id="' + id + '"]');
  let nextEl = document.querySelector('.carousel-control-next[data-swiper-id="' + id + '"]');
  let pagEl = document.querySelector('.swiper-pagination[data-swiper-id="' + id + '"]');
  swipers[i] = new Swiper(el, {
    slidesPerView: 1,
    preloadImages: false,
    watchSlidesVisibility: true,
    lazy: {
      loadPrevNext: true
    },
    navigation: {
      prevEl: prevEl,
      nextEl: nextEl
    },
    pagination: {
      el: pagEl,
      clickable: true
    }
  });
  swipers[i].on('slideChange', function () {
    const activeSwiper = swipers[i].activeIndex;
    sendGAEvent(['Slider ' + i, 'swipe', activeSwiper]);
  });
});