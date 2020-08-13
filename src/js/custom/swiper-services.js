import Swiper from 'swiper';
import {sendGAEvent} from '../analytics/analytics';

let swiperNav = {
  getNewActive: function(index) {
    return document.querySelector(
      '.js-go-to-slide[data-swiper-index="' + index + '"]');
  },
  switchActive: function(index) {
    let newActive = swiperNav.getNewActive(index);
    swiperNav.disableActive();
    newActive.classList.add('active');
  },
  disableActive: function() {
    let el = document.querySelector('.js-go-to-slide.active');
    if (el) {
      el.classList.remove('active');
    }
  },
};

let swiperService = new Swiper('.js-swiper-services', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  observer: true,
  slidesPerView: 'auto',
});

let goToEl = document.querySelectorAll('.js-go-to-slide');
for (var i = 0; i < goToEl.length; i++) {
  goToEl[i].addEventListener('click', function(e) {
    e.preventDefault();
    let index = this.getAttribute('data-swiper-index');

    swiperService.slideTo(index);
  });
}

swiperService.on('slideChange', function() {
  swiperNav.switchActive(swiperService.activeIndex);
  const activeSwiper = document.querySelector(
    '.js-swiper-services .swiper-slide-active');
  const activeSwiperTitle = activeSwiper.getAttribute('data-title');
  sendGAEvent(['Services - gallery', 'click', activeSwiperTitle]);
});
