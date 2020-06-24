self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static-v1')
            .then((cache) => {
                cache.addAll([
                    '/Home/offline',
                    'main.css'
                ])
            }).
            catch(err => { console.log(err) })
    )
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(thisCacheNames => {
                    if (thisCacheNames !== "static-v1") {
                        return caches.delete(thisCacheNames);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                if (event.request.mode == 'navigate') {
                    return caches.match('/Home/offline')
                }
            })
    )
})