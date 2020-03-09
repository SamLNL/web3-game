import Swiper from 'swiper';

new Swiper('#slider-customers', {
    speed: 400,
    navigation: {
        nextEl: '#slider-customers-next',
        prevEl: '#slider-customers-prev',
    },
    slidesPerView: 'auto'
});
