/**==========================================================================
   # Name: main-legacy
   # Date: 23 Apr 2020
   # Author: almeric
   ========================================================================== */

/**
  Main entry point for the legacy js bundle
*/

// Import polyfills not in `@babel/polyfill` need for the nomodule case.

// Import main.js after the polyfills are loaded.
import { main } from './main';

// Start the app.
// noinspection JSIgnoredPromiseFromCall
main();
