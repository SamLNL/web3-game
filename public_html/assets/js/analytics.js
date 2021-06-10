import { r as rIC } from './idlize.js';
import './autotrack.js';
import './dom-utils.js';

/**==========================================================================
   # Name: performanceTracking
   # Date: 303 Oct 2018
   # Author: peter
   ========================================================================== */

/**
 * Performance js
 *
 */

/* global ga */

/**
 * Performance metrics
 */
const whenWindowLoaded = new Promise(resolve => {
  if (document.readyState === "complete") {
    resolve();
  } else {
    addEventListener("load", function f() {
      resolve();
      removeEventListener("load", f);
    });
  }
});
/**
 * Track first-contentful-paint
 */

const trackFcp = () => {
  let wasEverHidden = document.visibilityState === "hidden";
  addEventListener("visibilitychange", function f() {
    if (document.visibilityState === "hidden") {
      removeEventListener("visibilitychange", f, true);
    }
  }, true);

  if (window.PerformancePaintTiming) {
    const reportFcpIfAvailable = entriesList => {
      const fcpEntry = entriesList.getEntriesByName("first-contentful-paint", "paint")[0];

      if (fcpEntry) {
        ga("send", {
          hitType: "timing",
          timingCategory: "PW Metrics",
          timingVar: "first-contentful-paint",
          timingValue: Math.round(fcpEntry.startTime),
          timingLabel: wasEverHidden ? "hidden" : "visible",
          nonInteraction: true
        });
      } else {
        new PerformanceObserver((list, observer) => {
          observer.disconnect();
          reportFcpIfAvailable(list);
        }).observe({
          entryTypes: ["paint"]
        });
      }
    };

    reportFcpIfAvailable(window.performance);
  }
};
/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */

const trackNavigationTimingMetrics = async () => {
  // Only track performance in supporting browsers.
  if (!(window.performance && window.performance.timing)) return;
  await whenWindowLoaded;
  const nt = performance.timing;
  const navStart = nt.navigationStart;
  const ttfb = Math.round(nt.responseStart - navStart); // ttfb

  const responseEnd = Math.round(nt.responseEnd - navStart); // All network traffic done

  const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart); // initial html document loaded & parsed

  const windowLoaded = Math.round(nt.loadEventStart - navStart); // all resources finished loading, page loaded
  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.

  const allValuesAreValid = (...values) => {
    return values.every(value => value > 0 && value < 6e6);
  };

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    ga("send", {
      hitType: "timing",
      timingCategory: "Navigation Timing",
      timingVar: "ttfb",
      timingValue: ttfb,
      nonInteraction: true
    });
    ga("send", {
      hitType: "timing",
      timingCategory: "Navigation Timing",
      timingVar: "responseEnd",
      timingValue: responseEnd,
      nonInteraction: true
    });
    ga("send", {
      hitType: "timing",
      timingCategory: "Navigation Timing",
      timingVar: "domLoaded",
      timingValue: domLoaded,
      nonInteraction: true
    });
    ga("send", {
      hitType: "timing",
      timingCategory: "Navigation Timing",
      timingVar: "windowLoaded",
      timingValue: windowLoaded,
      nonInteraction: true
    });
  }
};

/**==========================================================================
   # Name: analytics
   # Date: 303 Oct 2018
   # Author: peter
   ========================================================================== */
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
    shouldTrackOutboundLink: function (link) {
      let parser = document.createElement("a");
      parser.href = link.getAttribute("href") || link.getAttribute("xlink:href");
      return parser.hostname !== location.hostname && (parser.protocol.slice(0, 4) === "http" || parser.protocol.slice(0, 6) === "mailto" || parser.protocol.slice(0, 3) === "tel");
    }
  }); // ga('require', 'pageVisibilityTracker', {
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


const init = () => {
  rIC(async () => {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/
    // eslint-disable-next-line
    window.ga = window.ga || function () {
      (ga.q = ga.q || []).push(arguments);
    };

    ga.l = +new Date(); // createTrackers();
    // trackErrors();
    // trackCustomDimensions();

    requireAutotrackPlugins();
    trackFcp();
    trackNavigationTimingMetrics();
  });
};
const sendGAEvent = eventArray => {
  // Make sure there are at least 2 values
  if (eventArray.length >= 2) {
    // Split up the track event data into GA variables
    var trackCategory = eventArray[0],
        // Required (String)
    trackAction = eventArray[1],
        // Required (String)
    trackLabel = eventArray[2]; // Optional (String)
    // Send event data to GA if function exists

    if (typeof ga === 'function') {
      ga('send', {
        hitType: 'event',
        eventCategory: trackCategory,
        eventAction: trackAction,
        eventLabel: trackLabel
      });
    }
  }
};

export { init, sendGAEvent };
