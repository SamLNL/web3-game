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

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/calendar-demo/css/full-calendar.css",
    "revision": "6e56e3ddf5165551df767caba3e6b136"
  },
  {
    "url": "assets/calendar-demo/css/main.css",
    "revision": "54d180867e5f89c2340977d56fbbdab8"
  },
  {
    "url": "assets/css/styles.min-ef0cf7888d.css",
    "revision": "ef0cf7888d8ac11f6a6a2f7223ca014b"
  },
  {
    "url": "assets/calendar-demo/js/main.js",
    "revision": "351c2a9b20411e3b3284feced9f1406d"
  },
  {
    "url": "assets/js/0-2db403f1db.js",
    "revision": "e1ce4ef4f155affd42cb4a00d24ccefe"
  },
  {
    "url": "assets/js/1-4cdcfc6f18.js",
    "revision": "f4c5cf35571dd833270cebcdc19990b2"
  },
  {
    "url": "assets/js/2-16d5657638.js",
    "revision": "785da4f2af58309a5dd4a4564b848b4b"
  },
  {
    "url": "assets/js/3-4e8a9458ca.js",
    "revision": "cffbb892d2b262a5f5ac42dddc325618"
  },
  {
    "url": "assets/js/4-8bab3ae57c.js",
    "revision": "eae99c25b2476ed3ae5353d2096cd780"
  },
  {
    "url": "assets/js/6-fd2bd8fc2a.js",
    "revision": "105ff4b1f575e2a04c3ccfd64660dd3e"
  },
  {
    "url": "assets/js/7-874c8b9110.js",
    "revision": "6a44167b953e198d8367fb75ae4c5096"
  },
  {
    "url": "assets/js/8-4e7ec65de7.js",
    "revision": "7e7108b6dbdda761d661aa0a8b0f78a3"
  },
  {
    "url": "assets/js/analytics.js",
    "revision": "871c39943ac31c498d591a714a31212c"
  },
  {
    "url": "assets/js/lazysizes.min.js",
    "revision": "1be608f4c66dbd343f4b931f80b02f87"
  },
  {
    "url": "assets/js/main-bed66cc8a7.js",
    "revision": "c47db85c890ac99e0b4a6d7603c5d8eb"
  },
  {
    "url": "assets/js/picturefill.min.js",
    "revision": "1d343d827310c1b001db8b2bb7eb9cb4"
  },
  {
    "url": "assets/js/svgxuse.min.js",
    "revision": "2b95adec4b052745afb4210eb6efa3b6"
  },
  {
    "url": "assets/images/bitmap/glyphs/sportbedrijf-rheden.png",
    "revision": "76cd003f70b7a728e1e283e7c4cc8896"
  },
  {
    "url": "assets/images/svg/single/icon-chevron-left.svg",
    "revision": "2f73671871bcbf4707ce9001db896c3b"
  },
  {
    "url": "assets/images/svg/single/icon-chevron-right.svg",
    "revision": "c79af66f816d2cd083df8abfc2cffa89"
  },
  {
    "url": "assets/images/svg/single/icon-menu.svg",
    "revision": "ada3e24a018ab93f4149c420873bc67a"
  },
  {
    "url": "assets/images/svg/single/icon-sluit.svg",
    "revision": "5586f1f20810339df998f96eaa479468"
  },
  {
    "url": "assets/images/svg/single/logo-biljoenbad.svg",
    "revision": "2498c55b5e23710c67e8d4f4e60319be"
  },
  {
    "url": "assets/images/svg/sprite/css/svg/sprite.css-2f65285a.svg",
    "revision": "2f65285aa5bd178f60cfb8ccd5280515"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-activiteitenbad.svg",
    "revision": "6ee2f8a7fd2533403436dec107ffd2c9"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-beweegbarebodem.svg",
    "revision": "e66f8ba3d7a7b942d6e5b711fa4b91a5"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-bus.svg",
    "revision": "7b60aa486852f1ef46842f205aa61c7e"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-calendar.svg",
    "revision": "149b7809c82ffd04c1e9b07eec65dd1e"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-chevron-down.svg",
    "revision": "cae9f4fd52feabda867bf8303e6dd620"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-eten.svg",
    "revision": "b257530c3c22d07f72d64fb78d38b3fb"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-facebook.svg",
    "revision": "5faaf99ca10116d9daf081d809c81994"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-familiekleedkamer.svg",
    "revision": "320e78316be41cc4329b23291ebd5309"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-info.svg",
    "revision": "e45383d544d0d06426cb33491a4e55e6"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-insta.svg",
    "revision": "c25e9a8b6d4777d32853fe7b7558fc11"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-locker.svg",
    "revision": "033c916b0d1d95eb97ebf20a822e46c8"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-marker-yellow.svg",
    "revision": "8a94dd55722ddf4b13ff4ea1158b0bcb"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-marker.svg",
    "revision": "0a8b478a3e97ff3f4d1f28672e32ac30"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-multi-ruimte.svg",
    "revision": "ac4e1ed384a1e9bbc188f529b876bc6f"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-parkeren.svg",
    "revision": "43090de3548191dc59008d26f66f2fec"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-peuterbad.svg",
    "revision": "557bd0713d3190d7886728cdba7a1123"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-praktijkruimte.svg",
    "revision": "576ed1e013a91d5997e5b46946942aa1"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-rolstoel.svg",
    "revision": "122b5096b4df45ae57e80233230fcad0"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-telefoon.svg",
    "revision": "5af76db83022a7f5dae565b0157af2a4"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-vergaderruimte.svg",
    "revision": "b767fc3a22eb269661dd550738d81d2e"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-wedstrijdbad.svg",
    "revision": "77f0c65be3b19c5d1add0d1762b94dcc"
  },
  {
    "url": "assets/images/svg/sprite/single/icon-wifi.svg",
    "revision": "22c5fd2cfb5a6892292fde60b3a09899"
  },
  {
    "url": "assets/images/svg/sprite/sprite.svg",
    "revision": "058abdcf5c526e32790dccffe28919d0"
  },
  {
    "url": "/offline",
    "revision": "2be61878bacf86055622e1f2922faf41"
  },
  {
    "url": "/",
    "revision": "106a6c241b8797f52e1e77317b96a201"
  }
]);
