import Swiper from 'swiper';
import {sendGAEvent} from '../../analytics/analytics';

if (window.innerWidth < 991) {

  let swiperServiceThumbs = new Swiper('.js-swiper-services-thumbs', {
    allowSlidePrev: false,
    allowSlideNext: false
  });

  let swiperService = new Swiper('.js-swiper-services', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    observer: true,
    slidesPerView: 'auto',
    breakpoints: {
      1024: {
        pagination: {
          el: null,
        },
      }
    },
    thumbs: {
      swiper: swiperServiceThumbs,
    },
  });

  let goToEl = document.querySelectorAll('.js-go-to-slide');
  for(var i = 0;i < goToEl.length;i++){
    goToEl[i].addEventListener('click', function(e){
      e.preventDefault();
    });
  }

  swiperService.init();
  swiperService.snapGrid[swiperService.snapGrid.length -
  1] = swiperService.slidesGrid[swiperService.slidesGrid.length - 1];

  swiperServiceThumbs.init();
  swiperServiceThumbs.snapGrid[swiperServiceThumbs.snapGrid.length -
  1] = swiperService.slidesGrid[swiperServiceThumbs.slidesGrid.length - 1];

  swiperService.on('slideChange', function() {
    const activeSwiper = document.querySelector(
      '.js-swiper-services .swiper-slide-active');
    const activeSwiperTitle = activeSwiper.getAttribute('data-title');
    sendGAEvent(['Services - gallery', 'click', activeSwiperTitle]);
  });
}

let swiperPreview = new Swiper('.js-swiper-preview', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.carousel-control-next',
    prevEl: '.carousel-control-prev',
  },
  slidesPerView: 'auto',
});

swiperPreview.snapGrid[swiperPreview.snapGrid.length -
1] = swiperPreview.slidesGrid[swiperPreview.slidesGrid.length - 1];

swiperPreview.on('slideChange', function() {
  const activeSwiper = document.querySelector(
    '.js-swiper-preview .swiper-slide-active');
  const activeSwiperTitle = activeSwiper.getAttribute('data-title');
  sendGAEvent(['Preview - gallery', 'click', activeSwiperTitle]);
});
