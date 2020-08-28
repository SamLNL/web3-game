/**==========================================================================
 # Name: nav
 # Author: sam
 ========================================================================== */

/**
 * Menu scroll
 *
 */

function stickIt() {
  //get the body element
  let body = document.querySelector('body');
  //check if the body doens't contain the class already
  if (!body.classList.contains('sticky-nav')) {
    //add the class
    body.classList.add('sticky-nav');
  }
}

function unStick() {
  //get the body element
  let body = document.querySelector('body');
  //check if the body doen'st contain the class already
  if (body.classList.contains('sticky-nav')) {
    body.classList.remove('sticky-nav');
  }
}

let nav = document.querySelector('.js-nav');

(function() {

  if (nav) {

    /**==========================================================================
     # Check for scrolling
     ========================================================================== */
      //set scrolling vars
    let doc = document.documentElement;
    let bodyPosition = (window.pageYOffset || doc.scrollTop) -
      (doc.clientTop || 0);
    let threshold = 250;
    let lastScrollTop = 0;

    //Lets check if body is past the threshold so we can un-stick immediately
    if (bodyPosition >= threshold) {
      unStick();
    }

    //scroll listener
    window.addEventListener('scroll', function() {
      const st = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (st > lastScrollTop) {
        // downscroll
        if (st >= threshold) {
          unStick();
        }
      } else {
        // upscroll
        stickIt();
      }

      lastScrollTop = st;
    });

    /**==========================================================================
     # Hamburger click
     ========================================================================== */

    const toggle = nav.querySelector('.js-nav-toggler');
    const close = nav.querySelector('.js-nav-side-close');

    if (toggle) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        let sidebar = nav.querySelector('.js-nav-side');
        if (sidebar) {
          sidebar.classList.add('show');
          document.body.classList.add('no-scroll');
        }
      });
    }

    if (close) {
      close.addEventListener('click', function(e) {
        e.preventDefault();
        let sidebar = nav.querySelector('.js-nav-side');
        if (sidebar) {
          sidebar.classList.remove('show');
          document.body.classList.remove('no-scroll');
        }
      });
    }
  }
})();
