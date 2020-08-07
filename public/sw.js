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
    "url": "assets/css/styles.min-b0ff6ba5f1.css",
    "revision": "b0ff6ba5f16ffde64f73a06dd73006f2"
  },
  {
    "url": "assets/calendar-demo/js/main.js",
    "revision": "351c2a9b20411e3b3284feced9f1406d"
  },
  {
    "url": "assets/js/0-eae8269579.js",
    "revision": "81ffb3595a421fe5ea1f72b9dedee27d"
  },
  {
    "url": "assets/js/1-7354824c50.js",
    "revision": "f4c5cf35571dd833270cebcdc19990b2"
  },
  {
    "url": "assets/js/10-631f261522.js",
    "revision": "b15a1e6dd742ae155c4dfe9eb68a9a21"
  },
  {
    "url": "assets/js/11-00425897c0.js",
    "revision": "282802a111f02bff79442f81c67f4385"
  },
  {
    "url": "assets/js/12-a6a5667791.js",
    "revision": "7144053413dbdc1c6d1d420f1788e94f"
  },
  {
    "url": "assets/js/13-e8401a8177.js",
    "revision": "da7d6f014804b23df597d1ab0bc0de88"
  },
  {
    "url": "assets/js/14-5d07bbe363.js",
    "revision": "7285a669681ab06c3bb6390f86789ef2"
  },
  {
    "url": "assets/js/15-8a086828d2.js",
    "revision": "d71e36fb29cf43ad3c6bb29269f3417d"
  },
  {
    "url": "assets/js/16-8867b31c42.js",
    "revision": "5e314f836431c759849b3cf73d8c9065"
  },
  {
    "url": "assets/js/17-5006cd94e6.js",
    "revision": "7fc348a8a8fa5a8535a8c01de58c210e"
  },
  {
    "url": "assets/js/18-88a3e308b2.js",
    "revision": "b5aecaf41219674008a88f1f4e38f0da"
  },
  {
    "url": "assets/js/19-3a4401900b.js",
    "revision": "5fb86b7748453270e70ae60b849366fa"
  },
  {
    "url": "assets/js/2-0969094a5b.js",
    "revision": "785da4f2af58309a5dd4a4564b848b4b"
  },
  {
    "url": "assets/js/20-81a2393f57.js",
    "revision": "5360d62244c1561c9c51362c30bdd173"
  },
  {
    "url": "assets/js/21-ebedc89746.js",
    "revision": "efeaf83ae72903381ad24f17b6250c8b"
  },
  {
    "url": "assets/js/22-552a7fe112.js",
    "revision": "d241427c8f7db508fc58d3537188921f"
  },
  {
    "url": "assets/js/3-aee5ac23a9.js",
    "revision": "cffbb892d2b262a5f5ac42dddc325618"
  },
  {
    "url": "assets/js/4-14a726b472.js",
    "revision": "eae99c25b2476ed3ae5353d2096cd780"
  },
  {
    "url": "assets/js/5-8800a73ccb.js",
    "revision": "33d254ba04113b6c2759a4eadfd71ffe"
  },
  {
    "url": "assets/js/6-d737a500bb.js",
    "revision": "da96a4429c14813f82ac3e2fc63d94c9"
  },
  {
    "url": "assets/js/8-abb7e556eb.js",
    "revision": "05445680f93d2d7b83c6a35fafc874f7"
  },
  {
    "url": "assets/js/9-cd6f32e811.js",
    "revision": "15440098487c1d54939ee67000e2405e"
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
    "url": "assets/js/main-18ac4130ab.js",
    "revision": "5e9211e3a1dfe92a593ac53c96456a40"
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
    "url": "assets/images/svg/single/angle-down-light-teal.svg",
    "revision": "ffe50a31caeff913b78cc135325264a0"
  },
  {
    "url": "assets/images/svg/single/angle-left-light-teal.svg",
    "revision": "a28b6b3a0cb66ce6c44ed0051bcbac1c"
  },
  {
    "url": "assets/images/svg/single/angle-left-light.svg",
    "revision": "5b83662ba1cbc780691e5123263b4557"
  },
  {
    "url": "assets/images/svg/single/angle-right-light-teal.svg",
    "revision": "bab83ee3211ef90f0bcbc0f18428041e"
  },
  {
    "url": "assets/images/svg/single/angle-right-light-white.svg",
    "revision": "d5771bd372913c3b41a3d4a34042bca7"
  },
  {
    "url": "assets/images/svg/single/angle-right-light.svg",
    "revision": "2efda87cbc4fa298ed00cec099ecfe9e"
  },
  {
    "url": "assets/images/svg/single/clock-regular.svg",
    "revision": "6b19d244f3cef3418721327cd3068f48"
  },
  {
    "url": "assets/images/svg/single/facebook-square-brands.svg",
    "revision": "daf3f5b2198a6f5ac62a34e6f695a770"
  },
  {
    "url": "assets/images/svg/single/global-wave.svg",
    "revision": "2357a89c72f3c924e51236aaf132c637"
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
    "url": "assets/images/svg/single/icon-person.svg",
    "revision": "49f7e176030f7f3981c526c057d7a9e1"
  },
  {
    "url": "assets/images/svg/single/icon-sluit.svg",
    "revision": "5586f1f20810339df998f96eaa479468"
  },
  {
    "url": "assets/images/svg/single/instagram-square-brands.svg",
    "revision": "e545ee60230e23fa1f65fe301c64655d"
  },
  {
    "url": "assets/images/svg/single/loading.svg",
    "revision": "4246f9022854e30f8f8a93df5444b3d5"
  },
  {
    "url": "assets/images/svg/single/logo-biljoenbad.svg",
    "revision": "b97d86ab140cc7fcad64acf3ece6d642"
  },
  {
    "url": "assets/images/svg/single/lower-wave.svg",
    "revision": "279218c905d61f9371edcf081f1cb9a4"
  },
  {
    "url": "assets/images/svg/single/payoff.svg",
    "revision": "b80c0f34c9a4e6a8751aea0a54d15d40"
  },
  {
    "url": "assets/images/svg/single/search-regular.svg",
    "revision": "bc51bd5fcbf9f84559b782f891e1c974"
  },
  {
    "url": "assets/images/svg/single/upper-wave.svg",
    "revision": "42ee5681674f2f9c6043e54b65f88dc1"
  },
  {
    "url": "assets/images/svg/sprite/css/svg/sprite.css-cf8ea69c.svg",
    "revision": "cf8ea69ce026f4632c12c68ef5377cc2"
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
    "url": "assets/images/svg/sprite/single/icon-wifi.svg",
    "revision": "22c5fd2cfb5a6892292fde60b3a09899"
  },
  {
    "url": "assets/images/svg/sprite/sprite.svg",
    "revision": "7356a1dedd6ed3d694271fc43b82b738"
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
