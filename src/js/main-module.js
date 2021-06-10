/**==========================================================================
   # Name: main-module
   # Date: 23 Apr 2020
   # Author: almeric
   ========================================================================== */

/**
  Main entry point for modern module bundles
*/

import { initialize as initializeDynamicImport } from 'dynamic-import-polyfill/initialize.mjs';
import { main } from './main';

// This needs to be done before any dynamic imports are used.
// If your modules are hosted in a sub-directory, it must be specified here.
initializeDynamicImport({ modulePath: '/assets/js/' });

// Start the app.
// noinspection JSIgnoredPromiseFromCall
main();
