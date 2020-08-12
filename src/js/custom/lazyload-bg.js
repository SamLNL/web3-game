let bgLazyloads = document.querySelectorAll('[data-bg]');

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

bgLazyloads.forEach((el, i) => {
  if (isElementInViewport(bgLazyloads[i])) {
    let bg = bgLazyloads[i].getAttribute('data-bg');
    bgLazyloads[i].setAttribute('style', bg);
  }
});

document.addEventListener('lazybeforeunveil', function(e) {
  let bg = e.target.getAttribute('data-bg');
  if (bg) {
    e.target.setAttribute('style', bg);
  }
});
