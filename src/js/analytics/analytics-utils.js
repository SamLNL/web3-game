/**==========================================================================
 # Name: analytics-utils
 # Date: 25 Mar 2020
 # Author: almeric
 ========================================================================== */
/**
 * Local Google analytics javascript
 *
 */
/* global ga */
import { IdleQueue } from 'idlize/IdleQueue.mjs';
import 'autotrack/lib/plugins/clean-url-tracker';
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/max-scroll-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
/**
 * General analytics snippet.
 * For autotrack see: https://github.com/googleanalytics/autotrack/
 */
const queue = new IdleQueue();
/**
 * Requires select autotrack plugins for each tracker.
 */
const requireAutotrackPlugins = () => {
  ga('require', 'cleanUrlTracker', {
    stripQuery: true,
    trailingSlash: 'add',
  });
  ga('require', 'eventTracker');
  ga('require', 'maxScrollTracker');
  ga('require', 'outboundLinkTracker', {
    events: ['click', 'auxclick', 'contextmenu'],
    shouldTrackOutboundLink: function (link) {
      let parser = document.createElement('a');
      parser.href = link.getAttribute('href') || link.getAttribute('xlink:href');
      return (
        parser.hostname !== location.hostname &&
        (parser.protocol.slice(0, 4) === 'http' ||
          parser.protocol.slice(0, 6) === 'mailto' ||
          parser.protocol.slice(0, 3) === 'tel')
      );
    },
  });
};
/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */
export const analyticsUtils = () => {
  queue.pushTask(async () => {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/
    // eslint-disable-next-line
    window.ga =
      window.ga ||
      function () {
        (ga.q = ga.q || []).push(arguments);
      };
    ga.l = +new Date();
    requireAutotrackPlugins();
  });
};

export const sendGAEvent = (eventArray) => {
  // Make sure there are at least 2 values
  if (eventArray.length >= 2) {

    // Split up the track event data into GA variables
    const trackCategory = eventArray[0], // Required (String)
      trackAction = eventArray[1], // Required (String)
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
