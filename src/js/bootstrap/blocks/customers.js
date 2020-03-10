import Swiper from 'swiper';

new Swiper('.swiper .swiper-container', {
    speed: 400,
    navigation: {
        nextEl: '#slider-customers-next',
        prevEl: '#slider-customers-prev',
    },
    slidesPerView: 'auto'
});
