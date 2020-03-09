/*
Used for closing the menu when clicking on a 'target=_blank' link.

How does this work?
Make sure the sidebare has a id 'menu-sidebar)
and the 'target=_blank' links have a class 'js-close-menu'
 */

const links = document.querySelectorAll('.js-close-menu');
const nav = document.querySelector('#menu-sidebar');

if(nav){
  [].forEach.call(links, function (link) {
    link.addEventListener('click', function(){
      if(nav){
        nav.classList.remove('show');
      }
    });
  });
}
