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
export const trackFcp = () => {
  let wasEverHidden = document.visibilityState === "hidden";
  addEventListener(
    "visibilitychange",
    function f() {
      if (document.visibilityState === "hidden") {
        removeEventListener("visibilitychange", f, true);
      }
    },
    true
  );

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
        }).observe({ entryTypes: ["paint"] });
      }
    };
    reportFcpIfAvailable(window.performance);
  }
};
/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */
export const trackNavigationTimingMetrics = async () => {
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
