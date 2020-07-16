/**==========================================================================
 # Name: Typeform
 # Date: jan 2019
 # Author: sam
 # Description:
 Popup for Typeform url
 ========================================================================== */
const typeformEmbed = require('@typeform/embed');

let typeForm = document.querySelectorAll('.js-typeform');

// Loop through all typeform enabled links
[].forEach.call(typeForm, function (link) {

  link.addEventListener('click', (ev) => {

    // Prevent default because IE11 bug with when closing modal
    ev.preventDefault();
    typeformEmbed.makePopup(
      link.href,
      {
        mode: link.dataset.mode,
        autoOpen: false,
        autoClose: 3600,
        hideScrollbars: true
      }
    ).open();
  });
});

