/*
Used for scrolling to a anchor link.

How does this work?
Add the class 'js-scroll' to the anchor links
 */

let links = document.querySelectorAll('.js-scroll');

[].forEach.call(links, function(link) {
  link.addEventListener('click', function(e) {
    console.log('est');
    const isSmoothScrollSupported = 'scrollBehavior' in
      document.documentElement.style;
    if (isSmoothScrollSupported) {
      e.preventDefault();
      let id = e.currentTarget.getAttribute('href').replace('#', '');
      let navHeight = document.querySelector('.js-nav').offsetHeight;
      let element = document.getElementById(id);
      let scrollPos = element.getBoundingClientRect().top +
        window.pageYOffset - navHeight;

      window.scrollTo({top: scrollPos, behavior: 'smooth'});
    }
  });
});


