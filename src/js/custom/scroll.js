/*
Used for scrolling to a anchor link.

How does this work?
Add the class 'js-scroll' to the anchor links
 */

let links = document.querySelectorAll('.js-scroll');
let extraOffset = 20;

[].forEach.call(links, function(link) {
  link.addEventListener('click', function(e) {
    const isSmoothScrollSupported = 'scrollBehavior' in
      document.documentElement.style;

      e.preventDefault();
      let id = e.currentTarget.getAttribute('href').replace('#', '');
      let navHeight = document.querySelector('.js-nav').offsetHeight;
      let element = document.getElementById(id);
      let scrollPos = element.getBoundingClientRect().top +
        window.pageYOffset - navHeight - extraOffset;

      let navSidebar = document.querySelector('.navbar-side.show');
      if(navSidebar) {
        navSidebar.classList.remove('show');
      }

      if (isSmoothScrollSupported) {
        window.scrollTo({top: scrollPos, behavior: 'smooth'});
      } else {
        window.scrollTo({top: scrollPos});
      }
  });
});


