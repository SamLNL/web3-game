/**==========================================================================
 # Name: Teaser
 # Date: jan 2019
 # Author: sam
 ========================================================================== */

import Swiper from 'swiper';

let teasers = document.querySelectorAll('.js-teaser');
const breakpoint = window.matchMedia('(min-width: 1024px)');
let swipers = [];

const enableSwipers = function() {
  teasers.forEach((el, i) => {
    teasers[i].querySelector('.swiper-wrapper').classList.remove('d-block');
    teasers[i].querySelector('.swiper-pagination').classList.remove('d-none');
    teasers[i].querySelector('.swiper-prev').classList.remove('d-none');
    teasers[i].querySelector('.swiper-next').classList.remove('d-none');
    teasers[i].querySelector('.swiper-container').classList.remove('overflow-visible');
    let swiperEl = el.querySelector('.swiper-container');
    let prevEl = el.querySelector('.swiper-prev');
    let nextEl = el.querySelector('.swiper-next');
    let pagEl = el.querySelector('.swiper-pagination');


    swipers[i] = new Swiper(swiperEl, {
      navigation: {
        prevEl: prevEl,
        nextEl: nextEl,
      },
      pagination: {
        el: pagEl,
        clickable: true
      },
      slidesPerView: 1,
      spaceBetween: 10,
    });
  });
};

const destroySwipers = function() {
  if(swipers.length > 0) {
    swipers.forEach((value, i) => {
      swipers[i].destroy(true, true);
    });
  }
  teasers.forEach((value, i) => {
    teasers[i].querySelector('.swiper-wrapper').classList.add('d-block');
    teasers[i].querySelector('.swiper-pagination').classList.add('d-none');
    teasers[i].querySelector('.swiper-prev').classList.add('d-none');
    teasers[i].querySelector('.swiper-next').classList.add('d-none');
    teasers[i].querySelector('.swiper-container').classList.add('overflow-visible');
  });
}

const breakpointChecker = function() {
  if(breakpoint.matches === true) {
    destroySwipers();
  } else if(breakpoint.matches === false) {
    enableSwipers();
  }
};

(function(){
  breakpointChecker();

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
})();
