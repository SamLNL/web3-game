import Swiper from 'swiper';

new Swiper('#slider-right', {
    speed: 400,
    navigation: {
        nextEl: '#slider-right-next',
        prevEl: '#slider-right-prev',
    },
    pagination: {
        el: '#slider-right-pagination',
        clickable: true,
    },
});
