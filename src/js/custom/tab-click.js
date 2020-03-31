/**
 /* Sometimes a click element needs to be accessible using tab.
 /* Adding the class 'js-tab-click' makes this possible
 */

const tabClicks = document.querySelectorAll('.js-tab-click');

for(let i = 0;i < tabClicks.length;i++) {
  tabClicks[i].addEventListener('keyup', function(e){
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      let clickEl = tabClicks[i];


      let selector = clickEl.getAttribute('data-click-selector');
      if(selector) {
        clickEl = document.querySelector(selector);
      }

      clickEl.click();
    }
  });
}
