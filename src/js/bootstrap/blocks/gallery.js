import Swiper from 'swiper';
import {sendGAEvent} from '../../analytics/analytics';

let swiperNav = {
  getNewActive: function(index) {
    return document.querySelector('.js-go-to-slide[data-swiper-index="' + index + '"]');
  },
  switchActive: function(index) {
    let newActive = swiperNav.getNewActive(index);
    swiperNav.disableActive();
    newActive.classList.add('active');
  },
  disableActive: function() {
    let el = document.querySelector('.js-go-to-slide.active');
    if(el) {
      el.classList.remove('active');
    }
  }
};

if (window.innerWidth < 991) {

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
  });

  let goToEl = document.querySelectorAll('.js-go-to-slide');
  for(var i = 0;i < goToEl.length;i++){
    goToEl[i].addEventListener('click', function(e){
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
