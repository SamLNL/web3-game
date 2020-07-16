/**==========================================================================
 # Name: Slider
 # Date: jan 2019
 # Author: sam
 ========================================================================== */

import Swiper from 'swiper';

let sliders = document.querySelectorAll('.js-slider');

[].forEach.call(sliders, function(el) {
  let swiperEl = el.querySelector('.swiper-container');
  let prevEl = el.querySelector('.swiper-prev');
  let nextEl = el.querySelector('.swiper-next');
  let pagEl = el.querySelector('.swiper-pagination');

  new Swiper(swiperEl, {
    navigation: {
      prevEl: prevEl,
      nextEl: nextEl,
    },
    pagination: {
      el: pagEl,
      clickable: true
    },
    slidesPerView: 'auto'
  });
});
