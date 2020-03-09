/* eslint-disable no-undef */

/**
 * Base boilerplate from which the serviceWorker task wil generate a service worker
 * https://github.com/GoogleChrome/workbox/
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

workbox.core.setCacheNameDetails({
  prefix: "craft3"
});

workbox.clientsClaim();

// Cache media
workbox.routing.registerRoute(
  new RegExp(/\/media\/.*\.(?:png|jpg|jpeg|svg|gif|webp)/),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache:media",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        purgeOnQuotaError: true
      })
    ]
  })
);

// Cache fonts
workbox.routing.registerRoute(
  new RegExp(/\/assets\/fonts\/.*\.(?:eot|svg|woff|woff2|ttf)/),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache:fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        purgeOnQuotaError: true
      })
    ]
  })
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cache:google-fonts:styles"
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "cache:google-fonts:fonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
);

// Cache content pages & make them available offline
workbox.routing.registerRoute(
  ({ event }) => {
    return event.request.mode === "navigate";
  },
  workbox.strategies.networkFirst({
    cacheName: "cache:pages",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 120,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

// fallback URLs
const FALLBACK_HTML_URL = "/offline";
const FALLBACK_IMAGE_URL = "/offline.svg";

// This "catch" handler is triggered when any of the other routes fail to
// generate a response. (This should work as soon as workbox 4 is out of alpha)
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#provide_a_fallback_response_to_a_route
workbox.routing.setCatchHandler(({ event }) => {
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case "document":
      return caches.match(FALLBACK_HTML_URL);
    case "image":
      return caches.match(FALLBACK_IMAGE_URL);
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});

workbox.precaching.precacheAndRoute([]);
