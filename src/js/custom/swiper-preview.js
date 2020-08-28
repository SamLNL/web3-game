import Swiper from 'swiper';
import {sendGAEvent} from '../analytics/analytics';

let swiperPreview = new Swiper('.js-swiper-preview', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  preloadImages: false,
  watchSlidesVisibility: true,
  lazy: {
    loadPrevNext: true,
  },
  navigation: {
    nextEl: '.carousel-control-next',
    prevEl: '.carousel-control-prev',
  },
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      slidesPerView: 1,
    }
  }
});

swiperPreview.snapGrid[swiperPreview.snapGrid.length -
1] = swiperPreview.slidesGrid[swiperPreview.slidesGrid.length - 1];

swiperPreview.on('slideChange', function() {
  const activeSwiper = document.querySelector(
    '.js-swiper-preview .swiper-slide-active');
  const activeSwiperTitle = activeSwiper.getAttribute('data-title');
  sendGAEvent(['Preview - gallery', 'click', activeSwiperTitle]);
});
