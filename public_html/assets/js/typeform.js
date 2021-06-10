import { l as lib_pure } from './@typeform.js';
import './bootstrap.native.js';
import './react.js';
import './object-assign.js';
import './prop-types.js';
import './react-dom.js';
import './scheduler.js';

/**==========================================================================
 # Name: Typeform
 # Date: jan 2019
 # Author: sam
 # Description:
 Popup for Typeform url
 ========================================================================== */

let typeForm = document.querySelectorAll('.js-typeform'); // Loop through all typeform enabled links

[].forEach.call(typeForm, function (link) {
  link.addEventListener('click', ev => {
    // Prevent default because IE11 bug with when closing modal
    ev.preventDefault();
    lib_pure.makePopup(link.href, {
      mode: link.dataset.mode,
      autoOpen: false,
      autoClose: 3600,
      hideScrollbars: true
    }).open();
  });
});
var typeform = {};

export default typeform;
export { typeform as __moduleExports };
