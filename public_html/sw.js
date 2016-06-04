importScripts('js/lib/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'iota-cache-v1';
var urlsToCache = [
    '/',
    '/sw.js',
    '/css/main.css',
    '/css/sass.css',
    '/images/bc1.png',
    '/images/bc2.png',
    '/images/bc3.png',
    '/images/bc4.png',
    '/images/br1.png',
    '/images/br2.png',
    '/images/br3.png',
    '/images/br4.png',
    '/images/bt1.png',
    '/images/bt2.png',
    '/images/bt3.png',
    '/images/bt4.png',
    '/images/bx1.png',
    '/images/bx2.png',
    '/images/bx3.png',
    '/images/bx4.png',
    '/images/gc1.png',
    '/images/gc2.png',
    '/images/gc3.png',
    '/images/gc4.png',
    '/images/gr1.png',
    '/images/gr2.png',
    '/images/gr3.png',
    '/images/gr4.png',
    '/images/gt1.png',
    '/images/gt2.png',
    '/images/gt3.png',
    '/images/gt4.png',
    '/images/gx1.png',
    '/images/gx2.png',
    '/images/gx3.png',
    '/images/gx4.png',
    '/images/rc1.png',
    '/images/rc2.png',
    '/images/rc3.png',
    '/images/rc4.png',
    '/images/rr1.png',
    '/images/rr2.png',
    '/images/rr3.png',
    '/images/rr4.png',
    '/images/rt1.png',
    '/images/rt2.png',
    '/images/rt3.png',
    '/images/rt4.png',
    '/images/rx1.png',
    '/images/rx2.png',
    '/images/rx3.png',
    '/images/rx4.png',
    '/images/super.png',
    '/images/yc1.png',
    '/images/yc2.png',
    '/images/yc3.png',
    '/images/yc4.png',
    '/images/yr1.png',
    '/images/yr2.png',
    '/images/yr3.png',
    '/images/yr4.png',
    '/images/yt1.png',
    '/images/yt2.png',
    '/images/yt3.png',
    '/images/yt4.png',
    '/images/yx1.png',
    '/images/yx2.png',
    '/images/yx3.png',
    '/images/yx4.png',
    '/js/main.js',
    '/js/router.js',
    '/js/collections/scores.js',
    '/js/collections/scores.test.js',
    '/js/game/camera.js',
    '/js/game/card.js',
    '/js/game/card_response.js',
    '/js/game/extends.js',
    '/js/game/game.js',
    '/js/game/hand.js',
    '/js/game/off_screen_renderer.js',
    '/js/game/preloader.js',
    '/js/game/renderer.js',
    '/js/game/score.js',
    '/js/game/screen_renderer.js',
    '/js/game/sprite.js',
    '/js/game/table.js',
    '/js/game/tile.js',
    '/js/lib/backbone.js',
    '/js/lib/jquery.js',
    '/js/lib/require.js',
    '/js/lib/serviceworker-cache-polyfill.js',
    '/js/lib/underscore.js',
    '/js/models/game.js',
    '/js/models/score.js',
    '/js/models/score.test.js',
    '/js/models/session.js',
    '/js/models/user.js',
    '/js/tmpl/game.js',
    '/js/tmpl/game_auth.js',
    '/js/tmpl/header.js',
    '/js/tmpl/login.js',
    '/js/tmpl/login_auth.js',
    '/js/tmpl/main.js',
    '/js/tmpl/main_auth.js',
    '/js/tmpl/reg.js',
    '/js/tmpl/reg_auth.js',
    '/js/tmpl/scoreboard.js',
    '/js/tmpl/scoreboard_item.js',
    '/js/views/base.js',
    '/js/views/game.js',
    '/js/views/game_auth.js',
    '/js/views/login.js',
    '/js/views/login_auth.js',
    '/js/views/main.js',
    '/js/views/main_auth.js',
    '/js/views/manager.js',
    '/js/views/manager.test.js',
    // '/js/views/reg.js',
    '/js/views/reg_auth.js',
    '/js/views/scoreboard.js',
    '/js/views/scoreboard_item.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.method === "PUT") {
        var response = new Response(null, {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 222
        });

        event.respondWith(response);
        return;
    }

    if (event.request.method === "GET" && event.request.url.endsWith('session')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }

                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});