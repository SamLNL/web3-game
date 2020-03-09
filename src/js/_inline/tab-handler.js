/**==========================================================================
   # Name: tab-handler
   # Date: 303 Oct 2018
   # Author: peter
   ========================================================================== */

/**
 * Inline tab handler for a11y
 *
 */

/* eslint-disable no-use-before-define */
// Handle tabs gracefully as per https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
function handleMouseDownOnce() {
  document.documentElement.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
}

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    document.documentElement.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
}

window.addEventListener("keydown", handleFirstTab);
