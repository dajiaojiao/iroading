export const nextTick = (function () {
    const callbacks = []
    let pending = false
    let timerFunc

    function nextTickHandler() {
        pending = false;
        /*
         之所以要slice复制一份出来是因为有的cb执行过程中又会往callbacks中加入内容，比如$nextTick的回调函数里又有$nextTick，
         那么这些应该放入到下一个轮次的nextTick去执行，所以拷贝一份，遍历完成即可，防止一直循环下去。
         */
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    /*
    nextTick行为利用了microtask队列, 先使用 Promise.resolve().then(nextTickHandler)来将异步回调
    放入到microtask中，Promise 和 MutationObserver都可以使用，但是 MutationObserver 在IOS9.3以上的
    WebView中有bug，因此如果满足第一项的话就可以执行，如果没有原生Promise就用 MutationObserver。
    */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
        var p = Promise.resolve()
        var logError = err => { console.error(err) }
        timerFunc = () => {
            p.then(nextTickHandler).catch(logError)
            // in problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) setTimeout(noop)
        }
    } else if (typeof MutationObserver !== 'undefined' && (
        isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        /*
         创建一个MutationObserver，observe监听到DOM改动之后执行的回调 nextTickHandler 
         */
        var counter = 1
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(String(counter));
        // 使用MutationObserver的接口，监听文本节点的字符内容
        observer.observe(textNode, {
            characterData: true
        });
        /*
         每次执行timerFunc函数都会让文本节点的内容在0/1之间切换，切换之后将新赋值到那个我们MutationObserver监听的文本节点上去。
         */
        timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
        }
    } else {
        // fallback to setTimeout
        /*
         如果上面的两种都不支持的话，我们就使用setTimeout来执行
         */
        timerFunc = () => {
            setTimeout(nextTickHandler, 0)
        }
    }

    return function queueNextTick(cb?: Function, ctx?: Object) {
        let _resolve
        callbacks.push(() => {
            if (cb) {
                try {
                    cb.call(ctx)
                } catch (e) {
                    handleError(e, ctx, 'nextTick')
                }
            } else if (_resolve) {
                _resolve(ctx)
            }
        });
        /* 如果pending为true，表明本轮事件循环中已经执行过 timerFunc(nextTickHandler, 0) */
        if (!pending) {
            pending = true
            timerFunc()
        }
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                _resolve = resolve
            })
        }
    }
})()