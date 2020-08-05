/*
Used for destroying swiper
 */

import Swiper from 'swiper';

let defaultBreakpoint = 1024;
let destroySwipers = document.querySelectorAll('.js-swiper-destroy');
let destroySwipersParams = [];
let breakpointWatcher;

function mustDestroy(breakpoint) {
  breakpointWatcher = window.matchMedia('(min-width:' + breakpoint + 'px)');

  return breakpointWatcher.matches;
}

const letsSwipe = {
  init: () => {
    [].forEach.call(destroySwipers, function(e) {
      let id = e.getAttribute('data-swiper-id');
      if(e.swiper){
        destroySwipersParams[id] = e.swiper.params;
      }

      letsSwipe.checkSwiper(e);
    });

    window.onresize = () => {
      [].forEach.call(destroySwipers, function(e, i) {
        letsSwipe.checkSwiper(destroySwipers[i]);
      });
    };
  },
  destroySwiper: (swiper) => {
    let el = swiper.el;
    let id = el.getAttribute('data-swiper-id');
    if (document.querySelector('.swiper-pagination[data-swiper-id="' + id + '"]')) {
      document.querySelector('.swiper-pagination[data-swiper-id="' + id + '"]').style.display = 'none';
    }

    swiper.destroy(true, true);
  },
  buildSwiper: (el) => {
    let id = el.getAttribute('data-swiper-id');
    new Swiper(el, destroySwipersParams[id]);
    if (document.querySelector(
      '.swiper-pagination[data-swiper-id="' + id + '"]')) {
      document.querySelector(
        '.swiper-pagination[data-swiper-id="' + id +
        '"]').style.display = 'flex';
    }
  },
  checkSwiper: (el) => {
    let id = el.getAttribute('data-swiper-id');
    let swiperEl = document.querySelector('[data-swiper-id="' + id + '"]').swiper;

    console.log(swiperEl);
    if (swiperEl) {
      let swiper = swiperEl;
      let breakpoint;

      destroySwipersParams[id] = swiper.params;
      breakpoint = el.getAttribute('data-destroy-breakpoint');
      if (!breakpoint) {
        breakpoint = defaultBreakpoint;
      }

      if (mustDestroy(breakpoint)) {
        letsSwipe.destroySwiper(swiper);
      } else if (swiper.destroyed) {
        letsSwipe.buildSwiper(el);
      }
    } else {
      letsSwipe.buildSwiper(el);
    }
  }
};

(function() {
    letsSwipe.init();
})();
