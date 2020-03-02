console.log("脚本执行");
const getAudio = document.querySelector("#getAudio");
const getImage = document.querySelector("#getImage");
const poemBgAudio = document.querySelector("#poemBgAudio");
const poemBgImg = document.querySelector("#poemBgImgBox #poemBgImg");
const audioRange = document.querySelector("#audioRange");
const {width} = audioRange.getBoundingClientRect();
const rangeButton = audioRange.querySelector("#rangeButton");
let audioBufferSourceNode = null;

getAudio.addEventListener("change",function(){
    const audio = this.files[0];
    console.log(audio);

    poemBgAudio.src && URL.revokeObjectURL(poemBgAudio.src);
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // audioBufferSourceNode && audioBufferSourceNode.stop();
    // const fileReader = new FileReader();
    // fileReader.onload = async function(){
    //     const result = this.result;

    //     const decodedData = await audioCtx.decodeAudioData(result);
    //     audioBufferSourceNode = audioCtx.createBufferSource();
    //     audioBufferSourceNode.buffer = decodedData;

    //     const gainNode = audioCtx.createGain();
    //     audioBufferSourceNode.connect(gainNode);

    //     gainNode.connect(audioCtx.destination);

    //     gainNode.gain.setValueAtTime(1, audioCtx.currentTime);

    //     audioBufferSourceNode.start(audioCtx.currentTime)
        
    // }
    // fileReader.readAsArrayBuffer(audio);


    const blobUrl = URL.createObjectURL(audio);
    poemBgAudio.src = blobUrl;

});
getImage.addEventListener("change",function(){
    const localImage = this.files[0];
    console.log(localImage);
    const blobUrl = URL.createObjectURL(localImage);
    poemBgImg.onload = function(){
        URL.revokeObjectURL(blobUrl);
    };
    poemBgImg.src = blobUrl;
})
audioRange.addEventListener("click",function(event){
    poemBgAudio.currentTime =poemBgAudio.duration * event.offsetX / width;
})
document.querySelector("#startBgAudio").addEventListener("click",function(){
    poemBgAudio.play();
})
document.querySelector("#stopBgAudio").addEventListener("click",function(){
    poemBgAudio.pause();
})
poemBgAudio.addEventListener("play",function(){
    console.log("play")
})
poemBgAudio.addEventListener("playing",function(){
    console.log("onplaying")
})
poemBgAudio.addEventListener("progress",function(){
    console.log("progress")
})
poemBgAudio.addEventListener("timeupdate",function(event){
    rangeButton.style.transform =`translateX(${this.currentTime / this.duration * width}px)`;
    const duration = `${Math.floor(this.duration / 60)}:${Math.round(this.duration % 60)}`;
    const currentTime = `${Math.floor(this.currentTime / 60)}:${Math.round(this.currentTime % 60)}`;

    document.querySelector("#time").innerHTML = `${currentTime}/${duration}`
})