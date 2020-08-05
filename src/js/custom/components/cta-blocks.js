/**==========================================================================
 # Name: cta-blocks
 # Date: jan 2019
 # Author: sam
 ========================================================================== */
import Swiper from 'swiper';
import {sendGAEvent} from '../../analytics/analytics';

let swiperBlocks = {};
let swiperBlocksParams = {};
let ctaBlocks = document.querySelectorAll('.js-cta-blocks');
let destroyBreakpoint = 1024;

function watchBreakpoint(breakpoint) {
  return window.matchMedia('(min-width:' + breakpoint + 'px)').matches;
}

function destroySwiper(swiper) {
  let id = swiper.$el[0].getAttribute('data-swiper-id');

  // Destroy pagination
  if (document.querySelector(
    '.swiper-pagination[data-swiper-id="' + id + '"]')) {
    document.querySelector(
      '.swiper-pagination[data-swiper-id="' + id + '"]').style.display = 'none';
  }

  swiper.destroy(true, true);
}

ctaBlocks.forEach((el) => {
  let id = el.getAttribute('data-swiper-id');

  if (id) {
    swiperBlocks[id] = new Swiper('.js-cta-blocks[data-swiper-id="' + id + '"]',
      {
        pagination: {
          el: '.swiper-pagination[data-swiper-id="' + id + '"]',
          clickable: true,
        },
        slidesPerView: 'auto',
        spaceBetween: 10,
      });
    swiperBlocksParams[id] = swiperBlocks[id].params;

    swiperBlocks[id].on('slideChange', function() {
      const activeSwiper = this.activeIndex;

      let activeSwiperTitle = this.slides[activeSwiper].getAttribute(
        'data-title');
      if (!activeSwiperTitle.length > 0) {
        activeSwiperTitle = activeSwiper;
      }
      sendGAEvent(['Cta-blocks', 'click', activeSwiperTitle]);
    });

    if (watchBreakpoint(destroyBreakpoint)) {
      destroySwiper(swiperBlocks[id]);
    }
  }
});
(function() {
  window.onresize = () => {
    for (const id in swiperBlocks) {
      let swiper = swiperBlocks[id];

      if (watchBreakpoint(destroyBreakpoint)) {
        if (!swiper.destroyed) {
          destroySwiper(swiper);
        }
      } else if (swiper.destroyed) {
        swiperBlocks[id] = new Swiper(swiperBlocksParams[id].el,
          swiperBlocksParams[id]);
        document.querySelector('.swiper-pagination[data-swiper-id="' + id +
          '"]').style.display = 'flex';
      }
    }
  };
})();
