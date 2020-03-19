import {sendGAEvent} from '../../analytics/analytics';
const faqs = document.querySelectorAll('.js-faq');

for(let i = 0;i < faqs.length;i++) {
  faqs[i].addEventListener('click', function(e){
    sendGAEvent(['FAQ','click', e.currentTarget.getAttribute('title')]);
  });

  faqs[i].addEventListener('keyup', function(e){
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      faqs[i].firstChild.click();
    }
  });
}
