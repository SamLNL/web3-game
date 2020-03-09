/**==========================================================================
   # Name: analytics
   # Date: 303 Oct 2018
   # Author: peter
   ========================================================================== */

/**
 * Local Google analytics javascript
 *
 */
/* global ga */

import { rIC } from "idlize/idle-callback-polyfills.mjs";
import "autotrack/lib/plugins/clean-url-tracker";
import "autotrack/lib/plugins/event-tracker";
import "autotrack/lib/plugins/impression-tracker";
import "autotrack/lib/plugins/max-scroll-tracker";
import "autotrack/lib/plugins/media-query-tracker";
import "autotrack/lib/plugins/outbound-link-tracker";
import "autotrack/lib/plugins/page-visibility-tracker";
import "autotrack/lib/plugins/url-change-tracker";
import { trackFcp, trackNavigationTimingMetrics } from "./performanceTracking";

/**
 * General analytics snippet.
 * For autotrack see: https://github.com/googleanalytics/autotrack/
 */

/**
 * Requires select autotrack plugins for each tracker.
 */
const requireAutotrackPlugins = () => {
  ga("require", "cleanUrlTracker", {
    stripQuery: true,
    trailingSlash: "add"
  });
  ga("require", "eventTracker");

  ga("require", "maxScrollTracker");
  ga("require", "outboundLinkTracker", {
    events: ["click", "auxclick", "contextmenu"],
    shouldTrackOutboundLink: function(link) {
      let parser = document.createElement("a");
      parser.href = link.getAttribute("href") || link.getAttribute("xlink:href");
      return (
        parser.hostname !== location.hostname &&
        (parser.protocol.slice(0, 4) === "http" ||
          parser.protocol.slice(0, 6) === "mailto" ||
          parser.protocol.slice(0, 3) === "tel")
      );
    }
  });
  // ga('require', 'pageVisibilityTracker', {
  //     sendInitialPageview: true,
  //     pageLoadsMetricIndex: getDefinitionIndex(metrics.PAGE_LOADS),
  //     visibleMetricIndex: getDefinitionIndex(metrics.PAGE_VISIBLE),
  //     timeZone: 'America/Los_Angeles',
  //     fieldsObj: {[dimensions.HIT_SOURCE]: 'pageVisibilityTracker'},
  // });
  ga("require", "urlChangeTracker");
};

/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */
export const init = () => {
  rIC(async () => {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/
    // eslint-disable-next-line
    window.ga =
      window.ga ||
      function() {
        (ga.q = ga.q || []).push(arguments);
      };
    ga.l = +new Date();

    // createTrackers();
    // trackErrors();
    // trackCustomDimensions();
    requireAutotrackPlugins();
    trackFcp();
    trackNavigationTimingMetrics();
  });
};
