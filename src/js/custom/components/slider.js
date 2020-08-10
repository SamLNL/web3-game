/**==========================================================================
 # Name: Slider
 # Date: jan 2019
 # Author: sam
 ========================================================================== */

import Swiper from 'swiper';

let sliders = document.querySelectorAll('.js-slider');

[].forEach.call(sliders, function(el) {
  let id = el.getAttribute('data-swiper-id');
  let prevEl = document.querySelector('.carousel-control-prev[data-swiper-id="' + id + '"]');
  let nextEl = document.querySelector('.carousel-control-next[data-swiper-id="' + id + '"]');
  let pagEl = document.querySelector('.swiper-pagination[data-swiper-id="' + id + '"]');

  new Swiper(el, {
    slidesPerView: 1,
    navigation: {
      prevEl: prevEl,
      nextEl: nextEl,
    },
    pagination: {
      el: pagEl,
      clickable: true
    },

  });
});
