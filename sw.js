/* freelink-bio service worker — Workbox 7.3.0 */
importScripts("./libraries/workbox/workbox-sw.js");

workbox.setConfig({
  debug: false,
  modulePathPrefix: "./libraries/workbox/",
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const REV = "20260914d";

workbox.precaching.precacheAndRoute(
  [
    { url: "./", revision: REV },
    { url: "./index.html", revision: REV },
    { url: "./manifest.json", revision: REV },

    { url: "./assets/css/styles.css", revision: REV },
    { url: "./assets/images/anuswar-rao-profile-photo.webp", revision: REV },
    { url: "./assets/images/preview.jpg", revision: REV },

    { url: "./assets/images/favicon/favicon.ico", revision: REV },
    { url: "./assets/images/favicon/favicon.svg", revision: REV },
    { url: "./assets/images/favicon/favicon-16x16.png", revision: REV },
    { url: "./assets/images/favicon/favicon-32x32.png", revision: REV },
    { url: "./assets/images/favicon/favicon-96x96.png", revision: REV },
    { url: "./assets/images/favicon/apple-touch-icon.png", revision: REV },
    { url: "./assets/images/favicon/web-app-manifest-192x192.png", revision: REV },
    { url: "./assets/images/favicon/web-app-manifest-512x512.png", revision: REV },

    { url: "./assets/images/icon/arrow.svg", revision: REV },
    { url: "./assets/images/icon/close.svg", revision: REV },
    { url: "./assets/images/icon/coffee.svg", revision: REV },
    { url: "./assets/images/icon/copy.svg", revision: REV },
    { url: "./assets/images/icon/discord.svg", revision: REV },
    { url: "./assets/images/icon/dots.svg", revision: REV },
    { url: "./assets/images/icon/download.svg", revision: REV },
    { url: "./assets/images/icon/facebook.svg", revision: REV },
    { url: "./assets/images/icon/github.svg", revision: REV },
    { url: "./assets/images/icon/instagram.svg", revision: REV },
    { url: "./assets/images/icon/linkedin.svg", revision: REV },
    { url: "./assets/images/icon/mail.svg", revision: REV },
    { url: "./assets/images/icon/moon.svg", revision: REV },
    { url: "./assets/images/icon/phone.svg", revision: REV },
    { url: "./assets/images/icon/share.svg", revision: REV },
    { url: "./assets/images/icon/sun.svg", revision: REV },
    { url: "./assets/images/icon/twitter.svg", revision: REV },
    { url: "./assets/images/icon/website.svg", revision: REV },

    { url: "./js/app.js", revision: REV },
    { url: "./js/config.js", revision: REV },
    { url: "./js/modules/analytics.js", revision: REV },
    { url: "./js/modules/aos.js", revision: REV },
    { url: "./js/modules/clipboard.js", revision: REV },
    { url: "./js/modules/pwa.js", revision: REV },
    { url: "./js/modules/qr.js", revision: REV },
    { url: "./js/modules/share.js", revision: REV },
    { url: "./js/modules/theme.js", revision: REV },
    { url: "./js/modules/utils.js", revision: REV },

    { url: "./libraries/aos/aos.css", revision: REV },
    { url: "./libraries/aos/aos.js", revision: REV },
    { url: "./libraries/google-font/font.css", revision: REV },
    { url: "./libraries/google-font/Nunito-Regular.woff2", revision: REV },
    { url: "./libraries/google-font/Nunito-SemiBold.woff2", revision: REV },
    { url: "./libraries/google-font/Nunito-ExtraBold.woff2", revision: REV },
    { url: "./libraries/qrcode.min.js", revision: REV },
    { url: "./libraries/toastify/toastify.js", revision: REV },
    { url: "./libraries/toastify/toastify.min.css", revision: REV },
  ],
  {
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/],
  }
);

workbox.precaching.cleanupOutdatedCaches();

const offlinePage = workbox.precaching.createHandlerBoundToURL("./index.html");

workbox.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  new workbox.strategies.NetworkFirst({
    cacheName: "pages",
    networkTimeoutSeconds: 3,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.mode === "navigate") {
    return offlinePage({ request: event.request });
  }
  return Response.error();
});

workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "font",
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
