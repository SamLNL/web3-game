import Swiper from 'swiper';

new Swiper('#slider-gallery', {
    speed: 400,
    navigation: {
        nextEl: '#slider-gallery-next',
        prevEl: '#slider-gallery-prev',
    },
    pagination: {
        el: '#slider-gallery-pagination',
        clickable: true
    },
    slidesPerView: 'auto'
});
