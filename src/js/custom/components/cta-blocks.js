/**==========================================================================
 # Name: cta-blocks
 # Date: jan 2019
 # Author: sam
 ========================================================================== */
import Swiper from 'swiper';
import {sendGAEvent} from '../../analytics/analytics-utils';

let swiperBlocks = {};
let ctaBlocks = document.querySelectorAll('.js-cta-blocks');

(function() {
  ctaBlocks.forEach((el) => {
    let id = el.getAttribute('data-swiper-id');

    if (id) {
      swiperBlocks[id] = new Swiper('.js-cta-blocks[data-swiper-id="' + id + '"]',
        {
          pagination: {
            el: '.swiper-pagination[data-swiper-id="' + id + '"]',
            clickable: true,
          },
          preloadImages: false,
          lazy: true,
          slidesPerView: 'auto',
          spaceBetween: 10,
        });

      swiperBlocks[id].on('slideChange', function() {
        const activeSwiper = this.activeIndex;

        let activeSwiperTitle = this.slides[activeSwiper].getAttribute(
          'data-title');
        if (!activeSwiperTitle.length > 0) {
          activeSwiperTitle = activeSwiper;
        }
        sendGAEvent(['Cta-blocks', 'click', activeSwiperTitle]);
      });
    }
  });
})();
