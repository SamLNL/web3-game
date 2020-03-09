import Swiper from 'swiper';

new Swiper('#slider-left', {
    speed: 400,
    navigation: {
        nextEl: '#slider-left-next',
        prevEl: '#slider-left-prev',
    },
    pagination: {
        el: '#slider-left-pagination',
        clickable: true
    }
});
