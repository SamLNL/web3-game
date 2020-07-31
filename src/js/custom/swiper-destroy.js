/*
Used for destroying swiper
 */

import Swiper from 'swiper';

let defaultBreakpoint = 975;
let destroySwipers = document.querySelectorAll('.js-swiper-destroy');
let breakpointWatcher;

function mustDestroy(breakpoint) {
  breakpointWatcher = window.matchMedia('(min-width:' + breakpoint + 'px)');

  return breakpointWatcher.matches;
}

function destroySwiper(swiper) {
  let el = swiper.el;
  el.querySelector('.swiper-pagination').style.display = 'none';

  swiper.destroy(true, true);
}

function initDestroySwipers() {
  [].forEach.call(destroySwipers, function(e, i) {
    let breakpoint;

    let swiper = destroySwipers[i].swiper;

    if (swiper) {
      let swiperParams = swiper.params;
      breakpoint = destroySwipers[i].getAttribute('data-destroy-breakpoint');
      if (!breakpoint.length > 0) {
        breakpoint = defaultBreakpoint;
      }

      if (mustDestroy(breakpoint)) {
        destroySwiper(swiper);
      }

      window.onresize = () => {
        if(mustDestroy(breakpoint)) {
          if(!swiper.destroyed) {
            destroySwiper(swiper);
          }
        } else if(swiper.destroyed) {
          new Swiper(destroySwipers[i], swiperParams);
          destroySwipers[i].querySelector('.swiper-pagination').style.display = 'flex';
          initDestroySwipers();
        }
      }
    }
  });
}

(function() {
  initDestroySwipers();
})();
