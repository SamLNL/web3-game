import Swiper from 'swiper';

new Swiper('.js-swiper-services', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    slidesPerView: 'auto',
    breakpoints: {
      1024: {
        pagination: {
          el: null
        },
      },
    }
});

new Swiper('.js-swiper-preview', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.carousel-control-next',
    prevEl: '.carousel-control-prev',
  },
  slidesPerView: 'auto',
});
