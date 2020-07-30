/**==========================================================================
 # Name: cta-blocks
 # Date: jan 2019
 # Author: sam
 ========================================================================== */
import Swiper from 'swiper';
import {sendGAEvent} from '../../analytics/analytics';

let swiperBlocks = [];
let ctaBlocks = document.querySelectorAll('.js-cta-blocks');

ctaBlocks.forEach((el, i) => {
  swiperBlocks[i] = new Swiper('.js-cta-blocks', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 'auto',
    spaceBetween: 10,
  });

  swiperBlocks[i].on('slideChange', function() {
    const activeSwiper = this.activeIndex;

    const activeSwiperTitle = this.slides[activeSwiper].getAttribute('data-title');
    sendGAEvent(['Preview - gallery', 'click', activeSwiperTitle]);
  });
});
