let bgLazyloads = document.querySelectorAll('[data-bg]');

bgLazyloads.forEach((el, i) => {
  let bg = bgLazyloads[i].getAttribute('data-bg');
  bgLazyloads[i].setAttribute('style', bg);
});
