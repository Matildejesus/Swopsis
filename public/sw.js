const CACHE = 'swopsis-v1'
    const CORE = [
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        '/icons/maskable-192.png',
        '/icons/maskable-512.png',
        '/icons/apple-touch-icon.png'
    ]
    self.addEventListener('install', e => {
        e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)))
        self.skipWaiting()
    })
    self.addEventListener('activate', e => {
        e.waitUntil(
            caches.keys().then(keys =>
                Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
            )
        )
        self.clients.claim()
    })
    self.addEventListener('fetch', e => {
        const req = e.request
        if (req.method !== 'GET') return
        if (req.mode === 'navigate') {
        e.respondWith(
        fetch(req)
        .then(res => {
        const copy = res.clone()
        caches.open(CACHE).then(c => c.put('/index.html', copy))
        return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
    }
    e.respondWith(
    caches.match(req).then(cached => {
    const fromNetwork = fetch(req)
    .then(res => {
    const clone = res.clone()
    caches.open(CACHE).then(c => c.put(req, clone))
    return res
    })
    .catch(() => cached)
    return cached || fromNetwork
    })
    )
})