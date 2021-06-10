import { S as Swiper } from './swiper.js';
import { sendGAEvent } from './analytics.js';
import './dom7.js';
import './ssr-window.js';
import './idlize.js';
import './autotrack.js';
import './dom-utils.js';

/**==========================================================================
 # Name: cta-blocks
 # Date: jan 2019
 # Author: sam
 ========================================================================== */
let swiperBlocks = {};
let ctaBlocks = document.querySelectorAll('.js-cta-blocks');

(function () {
  ctaBlocks.forEach(el => {
    let id = el.getAttribute('data-swiper-id');

    if (id) {
      swiperBlocks[id] = new Swiper('.js-cta-blocks[data-swiper-id="' + id + '"]', {
        pagination: {
          el: '.swiper-pagination[data-swiper-id="' + id + '"]',
          clickable: true
        },
        preloadImages: false,
        lazy: true,
        slidesPerView: 'auto',
        spaceBetween: 10
      });
      swiperBlocks[id].on('slideChange', function () {
        const activeSwiper = this.activeIndex;
        let activeSwiperTitle = this.slides[activeSwiper].getAttribute('data-title');

        if (!activeSwiperTitle.length > 0) {
          activeSwiperTitle = activeSwiper;
        }

        sendGAEvent(['Cta-blocks', 'click', activeSwiperTitle]);
      });
    }
  });
})();
