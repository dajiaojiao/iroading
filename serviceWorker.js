const cacheName = "testCache5"
self.addEventListener("install",event => {
    event.waitUntil(Promise.all([caches.open(cacheName)
        .then(cache => {
            // cache.addAll([
            //     './images/test.jpg'
            // ]);
        }),
        self.skipWaiting()])
        
    
    )
    console.log("安装")
    
})
self.addEventListener("activate",(event) => {
    clients.claim()
})
self.addEventListener("fetch",(event) => {
    console.log(event)
    if(/\.jpg$/.test(event.request.url)){
        // event.respondWith(fetch('/images/test.jpg'));
        // return;
    }

    // event.respondWith(
    //     caches.match(event.request)
    //     .then((response) => {
    //         if(response){
    //             return response
    //         }
    //         var requestToCache = event.request.clone();
    //         return fetch(requestToCache).then((res) => {
    //             if(!res || res.status !== 200){
    //                 return res;
    //             }

    //             if(!event.request.clone().url.includes(".html")){
    //                 var res1 = res.clone();
    //                 caches.open(cacheName)
    //                 .then((cache) => {
    //                     cache.put(requestToCache.url,res1)
    //                 })
    //             }
                
    //             return res
    //         })
    //     })

    // )
})