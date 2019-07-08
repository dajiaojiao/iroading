
class PlayAudio{
    constructor(audio,box,audiosList){
        this.box = box;
        this.audiosList = audiosList;
        this.audio = audio;//dom元素
        this.audioStart = box.querySelector(".audioStart");
        this.audioPlaying = box.querySelector(".audioPlaying");
        this.audioStopping = box.querySelector(".audioStopping");
        this.progress = box.querySelector(".progress");
        this.thumb = box.querySelector(".thumb");
        this.volumeProgress = box.querySelector(".volumeProgress");
        this.volumeThumb = box.querySelector(".volumeThumb");
        this.hornMain = box.querySelector(".hornMain");
        this.volumeAll = box.querySelector(".volumeAll");
        this.progressAll = box.querySelector(".progressAll");
        this.hornBox = box.querySelector(".hornBox");
        this.hornHave = box.querySelector(".hornHave");
        this.hornNone = box.querySelector(".hornNone");
        this.horn = box.querySelector(".horn");
        this.controlBox = box.querySelector(".controlBox");
        this.touchType = 0;//0 无，1：触控；2：鼠标
        this.timerOut = null;
        this.timerOutControl = null;
        this.audioTimeAll = 0;
        this.audiotimeCurrent = 0;
        this.volumeBeforeMute = 0;
        this.isMute = false;
        this.boundingRectAudio = {};
        this.boundingRectVolume = {};
        this.isDownThumb = false;
        this.thumbPreX = 0;
        this.thumbVolumePreY = 0;
        this.hornPositionPreX = 0;
        this.hornPositionPreY = 0;
        this.isDownVolumeThumb = false;
        this.isDownHorn = false;
        this.isDragHorn = false;
        this.boxTransformX = 0;
        this.boxTransformY = 0;
        this.isPauseBeforeDrage = false;
        this.init();
    }
    init(){
        if(this.audio.duration){
            this.audioTimeAll = this.audio.duration;
            this.audiotimeCurrent = this.audio.currentTime;
            this.initControlStyle();
            this.initEvent();
        }else{
            this.audio.oncanplay = ()=>{
                this.initControlStyle();
                this.initEvent();
            }
        }
        
    }
    initControlStyle(){
        this.audioTimeAll = this.audio.duration;
        this.audiotimeCurrent = this.audio.currentTime;
        var progressAudio = this.audiotimeCurrent / this.audioTimeAll || 0;

        this.boundingRectAudio = this.progressAll.getBoundingClientRect();
        this.boundingRectVolume = this.volumeAll.getBoundingClientRect();

        var length = this.boundingRectAudio.width * progressAudio;
        var height = this.boundingRectVolume.height * this.audio.volume;
        this.progress.style.transform = "scale(" + progressAudio + ",1)";
        this.thumb.style.transform = "translateX(" + length + "px)";
        this.volumeProgress.style.transform = "scale(1," + this.audio.volume + ")"
        this.volumeThumb.style.transform = "translateY(-" + height + "px)";
    }
    initEvent(){
        this.domEventListener();
        this.audioEventListener();
    }
    domEventListener(){
        var that = this;
        this.audioStart.onclick = (e)=>{
            e.stopPropagation() ;
            if(this.audio.paused){
                this.audiosList && this.audiosList.length && this.audiosList.forEach((audio,index) => {
                    audio.pause();
                })
                this.audio.play();
            }else{
                this.audio.pause();
            }
        }
        this.horn.onclick = (e) => {
            e.stopPropagation();
            if(!this.isDragHorn){
                this.controlBox.style.visibility = "visible";
                this.controlBox.style.zIndex = "2";
                this.audiosList && this.audiosList.length && this.audiosList.forEach((audio,index) => {
                    audio && audio.pause();
                })
                this.audio.currentTime = 0;
                this.audio.play();
            }
        }
        
        function audioMouseDown(e){
            e.stopPropagation();
            that.touchType = e.pointerType.toLowerCase() === "mouse" ? 2 : 1;
            var pageX = e.pageX;
            var target = e.target === that.thumb ? e.target.offsetParent : e.target;
            var offsetX = pageX - (that.getOffsetTopByBody(target).offsetLeft) - that.boxTransformX;
            var currentTime = offsetX / that.boundingRectAudio.width * that.audioTimeAll;
            currentTime = Math.max(0,Math.min(currentTime,that.audioTimeAll));
            that.audio.currentTime = currentTime;
            that.isPauseBeforeDrage = that.audio.paused;
            that.isDownThumb = true;
            that.thumbPreX = pageX;
            that.audio.pause();
        }
        function volumeMouseDown(e){
            e.stopPropagation();
            that.touchType = e.pointerType.toLowerCase() === "mouse" ? 2 : 1;
            var pageY = e.pageY;
            var target = e.target === that.volumeThumb ? e.target.offsetParent : e.target;
            var offsetY = pageY - that.getOffsetTopByBody(target).offsetTop - that.boxTransformY;
            var currentVolume = 1-offsetY / that.boundingRectVolume.height;
            currentVolume = Math.max(0,Math.min(currentVolume,1));
            that.audio.volume = currentVolume;
            that.isDownVolumeThumb = true;
            that.thumbVolumepreY = pageY;
        }
        function controlMouseDown(e){
            e.stopPropagation();
            that.touchType = e.pointerType.toLowerCase() === "mouse" ? 2 : 1;
            var offsetX = e.pageX;
            var offsetY = e.pageY;
            that.hornPositionPreX = offsetX;
            that.hornPositionPreY = offsetY;
            that.isDownHorn = true;
        }
        
        this.progressAll.onpointerdown = audioMouseDown;
        this.volumeAll.onpointerdown = volumeMouseDown;
        this.horn.onpointerdown = controlMouseDown;
        document.onpointerdown = this.documentDown.bind(this);
        document.addEventListener("mousemove", this.mouseMove.bind(this));
        document.addEventListener("touchmove",this.mouseMove.bind(this));
        document.addEventListener("mouseup", this.mouseUp.bind(this));
        document.addEventListener("touchend", this.mouseUp.bind(this));
        this.hornMain.onmouseenter = (e) => {
            this.timerOut && clearTimeout(this.timerOut);
            this.timerOut = null;
            this.hornBox.style.visibility = "visible";
            this.hornBox.style.zIndex = "2";

        }
        this.hornMain.onmouseleave = (e) => {
            this.timerOut && clearTimeout(this.timerOut);
            this.timerOut = setTimeout(() => {
                this.hornBox.style.visibility = "hidden";
                this.hornBox.style.zIndex = "-1";

            }, 1000);
        }
        this.box.onmouseenter = (e) => {
            e.stopPropagation();
            this.timerOutControl && clearTimeout(this.timerOutControl);
            this.timerOutControl = null;
            this.controlBox.style.visibility = "visible";
            this.controlBox.style.zIndex = "2";
        }
        this.box.onmouseleave = (e) => {
            e.stopPropagation();
            this.timerOutControl && clearTimeout(this.timerOutControl);
            this.timerOutControl = setTimeout(() => {
                that.timerOut && clearTimeout(that.timerOut);
                that.timerOut = null;
                that.hornBox.style.visibility = "hidden";
                that.hornBox.style.zIndex = "-1";

                that.controlBox.style.visibility = "hidden";
                that.controlBox.style.zIndex = "-1";
            },1000)
        }
        this.hornMain.onclick = (e) => {
            e.stopPropagation();
            this.hornBox.style.visibility = "visible";
            this.hornBox.style.zIndex = "2";
            if(this.isMute){
                this.isMute = false;
                this.audio.volume = this.volumeBeforeMute;
            }else{
                this.isMute = true;
                this.volumeBeforeMute = this.audio.volume;
                this.audio.volume = 0;
            }

        }
        this.hornBox.onmouseenter = (e) => {
            e.stopPropagation();
            this.timerOut && clearTimeout(this.timerOut);
            this.hornBox.style.visibility = "visible";
            this.hornBox.style.zIndex = "2";

        }
        this.hornBox.onmouseleave = (e) => {
            e.stopPropagation();
            this.timerOut && clearTimeout(this.timerOut);
            this.timerOut = setTimeout(() => {
            this.hornBox.style.visibility = "hidden";
            this.hornBox.style.zIndex = "-1";
            }, 1000);
        }

    }
    mouseMove(e){
        e.stopPropagation();
        var that = this;
        if(that.touchType == 2 && e.type === "mousemove" || that.touchType == 1 && e.type !== "mousemove"){
            var pageX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
            var pageY = e.type === "mousemove" ? e.pageY : e.touches[0].pageY;
            if(that.isDownHorn){
                var offsetX = pageX - that.hornPositionPreX;
                var offsetY = pageY - that.hornPositionPreY;
                if(offsetX > 5 || offsetY > 5){
                    that.isDragHorn = true;
                }
                var offsetOldStr = that.box.style.transform;
                var offsetXOld = 0;
                var offsetYOld = 0;
                if(offsetOldStr && /matrix/.test(offsetOldStr)){//matrix(1, 0, 0, 1, 100, 0)
                    var arrOffset = offsetOldStr.substring(7).split(",");
                    offsetXOld = parseFloat(arrOffset[4]);
                    offsetYOld = parseFloat(arrOffset[5]);
                }else if(offsetOldStr && /translate/.test(offsetOldStr)){
                    var arrOffset = offsetOldStr.substring(10).split(",");
                    offsetXOld = parseFloat(arrOffset[0]);
                    offsetYOld = parseFloat(arrOffset[1]);
                }
                that.boxTransformX = offsetXOld + offsetX;
                that.boxTransformY = offsetYOld + offsetY;

                that.box.style.transform = "translate(" + that.boxTransformX + "px," + that.boxTransformY + "px)";
                that.hornPositionPreX = pageX;
                that.hornPositionPreY = pageY;
            }else if(that.isDownThumb){
                var currentTime = that.audio.currentTime + (pageX - that.thumbPreX) / that.boundingRectAudio.width * that.audioTimeAll;
                that.audio.currentTime = Math.max(0,Math.min(currentTime,that.audioTimeAll));
                that.thumbPreX = pageX;
            }else if(that.isDownVolumeThumb){
                var currentVolume  = that.audio.volume + ( that.thumbVolumepreY - pageY) / that.boundingRectVolume.height;
                that.audio.volume = Math.max(0,Math.min(currentVolume,1));
                that.thumbVolumepreY = pageY;
            }else{
                return false;
            }
        }
    }
    mouseUp(e){
        e.stopPropagation();
        var that = this;
        if(that.touchType == 2 && e.type === "mouseup" || that.touchType == 1 && e.type !== "mouseup"){
            if(that.isDownHorn){
                that.isDownHorn = false;
                setTimeout(() => {
                    that.isDragHorn = false;
                }, 0);
            }else if(that.isDownThumb){
                that.isDownThumb = false;
                if(!that.isPauseBeforeDrage){
                    that.audio.play();
                }
            }else if(that.isDownVolumeThumb){
                that.isDownVolumeThumb = false;
            }
        }
        that.touchType = 0;
    }
    documentDown(e){
        if(e.path.includes(that.box))return ;
        var that = this;
        that.timerOutControl && clearTimeout(that.timerOutControl);
        that.timerOut && clearTimeout(that.timerOut);
        that.timerOut = null;
        that.timerOutControl = null;
        that.hornBox.style.visibility = "hidden";
        that.hornBox.style.zIndex = "-1";
        that.controlBox.style.visibility = "hidden";
        that.controlBox.style.zIndex = "-1";
    }
    audioEventListener(){
        this.audio.onplaying = () => {
            this.audioStopping.style.display = "none";
            this.audioPlaying.style.display = "block";
        }
        this.audio.onpause = () => {
            this.audioStopping.style.display = "block";
            this.audioPlaying.style.display = "none";
        }
        this.audio.ontimeupdate = () => {
            var progressAudio = this.audio.currentTime / this.audioTimeAll;
            var length = this.boundingRectAudio.width * progressAudio;
            this.progress.style.transform = "scale(" + progressAudio + ",1)";
            this.thumb.style.transform = "translateX(" + length + "px)";
        }
        this.audio.onvolumechange = (e) => {
            var height = this.boundingRectVolume.height * this.audio.volume;
            this.volumeProgress.style.transform = "scale(1," + this.audio.volume + ")"
            this.volumeThumb.style.transform = "translateY(-" + height + "px)";
            if(this.audio.volume){
                this.hornHave.style.display="block";
                this.hornNone.style.display="none";
            }else{
                this.hornHave.style.display="none";
                this.hornNone.style.display="block";
            }
        }
    }
    getOffsetTopByBody (el) {
        let offsetTop = 0;
        let offsetLeft = 0;
        while (el && el.tagName !== 'BODY') {
          offsetTop += el.offsetTop;
          offsetLeft += el.offsetLeft;
          el = el.offsetParent
        }
        return {offsetTop:offsetTop,offsetLeft:offsetLeft};
    }
    static domStr(id){
        var str = `
        <!-- ppt音频控制条 -->
        <div id="audioControl_${id}" class="audioControlList" style="top: 230px;position: absolute;left: 100px;">
            <div class="horn" ondragstart="return false;" style="cursor: pointer;position: absolute;left:0;top:0;;width: 64px;height:63px;;background:url(data:image/png;base64,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) no-repeat center"></div>
            <div class="controlBox" style="visibility: hidden;z-index: -1;position: absolute;top:70px;left:0;background: rgba(0, 0, 0,.7);width: 208px;height: 48px;border-radius: 3px;display: flex;align-items: center;justify-content: center;">
                <div class="audioStart" style="width: 12px;height: 16px;position: relative;display: flex;align-items: center;justify-content: center;padding: 10px;cursor: pointer;">
                    <span class="audioStopping" style="width:100%;height:100%;display:block;position:absolute;left:0;top:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTdGQjZGMjA3ODc1MTFFOUJBMDM4RUZBMUQ5QzkzRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTdGQjZGMjE3ODc1MTFFOUJBMDM4RUZBMUQ5QzkzRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1N0ZCNkYxRTc4NzUxMUU5QkEwMzhFRkExRDlDOTNFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1N0ZCNkYxRjc4NzUxMUU5QkEwMzhFRkExRDlDOTNFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv8ohIQAAABsSURBVHjaYvj///8dIF4BxMJAzEAIgwgYeAHEAaRogIEFQCxAigYQeArEbqRogIHZQMxDigYQuA/EjqRogIEJQMzF+B+sjWhwgYmBVECCkyaCnER1TxMdrKCIc6d60iA68d0F4lXEJm+AAAMA0/VQyZoeV6IAAAAASUVORK5CYII=) no-repeat center;background-size: 12px 16px;"></span>
                    <span class="audioPlaying" style="width:100%;height:100%;display: none;position: absolute;left:0;top:0;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNFMTA1MDY3ODc1MTFFOTg4MjFFQjAyNEMxQUY3MDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNFMTA1MDc3ODc1MTFFOTg4MjFFQjAyNEMxQUY3MDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3M0UxMDUwNDc4NzUxMUU5ODgyMUVCMDI0QzFBRjcwMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3M0UxMDUwNTc4NzUxMUU5ODgyMUVCMDI0QzFBRjcwMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poc6bvEAAABWSURBVHjaYvj//38rEH+G0gxEYrgeRiDxh4GBgRmIfwExOwNxAK4HZMB/JAlGIg2A62FioBCMGjBqwOAx4C+U/YsEfXA9IAM6gfgrEPeQYABcD0CAAQCPuEfbIocCAQAAAABJRU5ErkJggg==) no-repeat center;background-size: 12px 16px;"></span>
                </div>
                <div class="progressAll" ondragstart="return false"  style="width: 97px;height: 2px;margin: 0px 8px;padding: 5px 0;position: relative;cursor: pointer;">
                    <p style="width: 100%;height: 100%;background: rgba(255,255,255,.15);margin: 0;padding: 0;"></p>
                    <p class="progress" style="margin: 0;padding: 0;width: 100%;height: 100%;position: relative;top: -2px;left: 0;transform: scale(0,1);transform-origin: left center;background: #2ee78e;"></p>
                    <span class="thumb" style="position: absolute;left: -9px;width: 8px;height: 8px;background: #2ee78e;border-radius: 50%;top: -3px;margin: 5px;"></span>
                </div>
                <div class="hornMain" style="width: 17px;height: 16px;position:relative;margin-left: 8px;padding: 10px;cursor: pointer;">
                    <span class="hornHave" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0YzNjQ1QjE3ODc1MTFFOUJBQUJCNkZBM0E3MTk0NjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0YzNjQ1QjI3ODc1MTFFOUJBQUJCNkZBM0E3MTk0NjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRjM2NDVBRjc4NzUxMUU5QkFBQkI2RkEzQTcxOTQ2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRjM2NDVCMDc4NzUxMUU5QkFBQkI2RkEzQTcxOTQ2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PssKAAwAAAFjSURBVHjalNTPK0RRFMDxaxpqFBOaYlKjppSFrZQUCyMbpSgrWRELGzsbs/IPsJmdhZUVS6XGQjKIKSXRbEZprER+NH493zPOrdfrzWvc+jTv3Hs63R+nMY7jmCriOMErUgF5JmT8Rwx76EEYk571GczZwK9IFPtIYgTXaPDkdCOD8Urk2VoUOXy4jpDHpn636G89jlFERCZWcabJd/jGlKuwLTKMH0zofL/zN+brZIENlZDFpx5ly7X1vFpADnF04QWXKBpbLeD23ccZ1PxZjdfxYC+2bGobh3hEr8b38pIh87/h4B1fGjfLnC0SqbFIOzpQ0Fj6qCBF5GLT2FFLAUVW9Oi7aMJo5UG4mGVkcYAbvbhFn4tN6Vpa59c07vO+RCOOtFemPUWS2lNhDGhDbkuO35NK115o0hjOXU8sEnjCLVqrFRExXKGMN2Rca23YQKedMwFNJkmneMZQ0F/BrwADAA+fHh0Fibi6AAAAAElFTkSuQmCC) no-repeat center;background-size: 17px 16px;"></span>
                    <span class="hornNone" style="position: absolute;left:0;top:0;width: 100%;height: 100%;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5N0FBMTZBNTc0NzhFOTExQTkwM0UzQkYxNzQ5QjM4QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1ODRFRTYxQzdCNzAxMUU5OEQzQ0FDQ0JCRkUzNjkxMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ODRFRTYxQjdCNzAxMUU5OEQzQ0FDQ0JCRkUzNjkxMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk3QUExNkE1NzQ3OEU5MTFBOTAzRTNCRjE3NDlCMzhBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3QUExNkE1NzQ3OEU5MTFBOTAzRTNCRjE3NDlCMzhBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mIGHOwAAAOFJREFUeNqs080KAVEYxvGXpNhQspGdlbuwQYpsLFyJLW7BQs1Otq6AhJXExkouwZai5GP8p97ZaBwGT/1qOjM9nXPmHLFtW15IYYkjCobvJCjeSWKILEKoiSFeJTGMkUEeW4RNJSGPgpHOoIwFbHkTp6SJij4nkEJdyz6KW7LDFBddykB8xCkJoA1Lvoy7sWf5IUH5Q9ySyC8lzp7c0UJRxybo+C1p6JmI6++t4oruxy1P9yCKOW6o69gaPdPdeT6xJ5QwQx97Xa6vmbiS2OCMEyzTTMTwMo0VDsiZSh4CDAD2uPAmUgAaNQAAAABJRU5ErkJggg==) no-repeat center;background-size: 17px 16px;"></span>
                </div>
            </div>
            <div class="hornBox" style="background: rgba(0, 0, 0,.7);width: 48px;height: 140px;border-radius: 3px;display: flex;visibility: hidden;;align-items: center;justify-content: center;position: absolute;top: -77px;left: 157px;flex-direction: column;">
                <div class="volumeAll" ondragstart="return false" style="width: 4px;height: 100px;border-radius: 2px;position: relative;margin-top:5px;padding:0 5px;cursor: pointer;">
                    <p style="background: rgba(255,255,255,.15);width: 100%;padding: 0;height: 100%;border-radius: 2px;margin: 0;"></p>
                    <p class="volumeProgress" style="width: 100%;height: 100%;background: rgb(46, 231, 142);padding: 0;margin: 0;position: relative;bottom: 100px;transform: scale(1,0);transform-origin: center bottom;border-radius: 4px;"></p>
                    <span class="volumeThumb" style="width: 8px;height: 8px;background: #fff;border-radius: 50%;display: block;position: absolute;bottom: -8px;left: -2.4px;margin: 5px;"></span>
                </div>
            </div>
        </div>
        <!-- ppt音频控制条完 -->

        `
        return str;
    }
}
var audioDom = document.querySelector("#audioToPlay");
var controlBox = document.querySelector("#audioControl_1");

var audioDom2 = document.querySelector("#audioToPlay2");
var controlBox2 = document.querySelector("#audioControl_2");

var playAudio = new PlayAudio(audioDom,controlBox,[audioDom,audioDom2]);
