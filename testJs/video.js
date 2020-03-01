console.log("ssss")
var player = videojs('videoBox', {
    techOrder: ['html5','flash'],
    width: 1000, //宽string|number
    height: 500, //高：string|number
    controls: true, //控制条：boolean
    preload: "true", //预加载：string；'auto'|'true'|'metadata'|'none'
    //poster: '', //预览图：string
    autoplay: true, //自动播放：boolean
    allowScriptAccess: "always",
    wmode: 'opaque',
    sources: [{
        src: 'rtmp://192.168.10.203:1936/vod|/file/local://D:/fms/data/file/20190416/multi/09/40288a4b6a1efb6c016a23a866ca000e_20190416/40288a4b6a1efb6c016a2528ec4a001f.mp4',
        type: "rtmp/flv"
    }]
},function onPlayerReady(){
    const that = this;
    that.on("ended",function(){
        // that.src({
        //     src:'rtmp://192.168.10.203:1936/vod|/file/local://D:/fms/data/file/20190416/multi/09/40288a4b6a1efb6c016a23a866ca000e_20190416/40288a4b6a1efb6c016a2528ec4a001f.mp4',
        //     type: "rtmp/flv"
        // })
        // that.load();
        // var a = document.querySelector(".vjs-control-bar .vjs-play-control");
        // a.onclick = function(){
        //     if(a.classList.contains("vjs-ended")){
        //         that.src({
        //             src:'rtmp://192.168.10.203:1936/vod|/file/local://D:/fms/data/file/20190416/multi/09/40288a4b6a1efb6c016a23a866ca000e_20190416/40288a4b6a1efb6c016a2528ec4a001f.mp4',
        //             type: "rtmp/flv"
        //         })
        //         that.load();
        //     }
        // }
    })
    
})