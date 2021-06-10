import { sendGAEvent } from './analytics.js';
import './idlize.js';
import './autotrack.js';
import './dom-utils.js';

const faqs = document.querySelectorAll('.js-faq');

for (let i = 0; i < faqs.length; i++) {
  faqs[i].addEventListener('click', function () {
    // Makes sure only fires when faq is opening
    let el = this;
    setTimeout(function () {
      let selector = el.querySelector('div.collapse');

      if (selector && selector.classList.contains('show')) {
        sendGAEvent(['FAQ', 'click', el.getAttribute('data-ga-question')]);
      }
    }, 500);
  });
}
