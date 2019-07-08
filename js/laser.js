var img = document.querySelector('#animal');
var betaDom = document.querySelector('#beta');
var alphaDom = document.querySelector('#alpha');
var gammaDom = document.querySelector('#gamma');
var ws,socket;
startWebSocket()
var a = document.querySelector("body");
var timer;
var isMove = false;
var isFirstAngel = true;
var firstAngel = {
    beta:0,
    alpha:0,
    gamma:0,
    minBeta:0,
    maxBeta:0,
    minAlpha:0,
    maxAlpha:0,
    minGamma:0,
    maxGamma:0
}
a.addEventListener("touchstart",function(){
    timer = setTimeout(function(){
        isMove = true;
    },1000);
})
a.addEventListener("touchend",function(){
    isMove = false;
    isFirstAngel = true;
    clearTimeout(timer);
})
a.addEventListener("click",function(e){
    socket.send("aaa");
})
document.oncontextmenu = function(event){
    event.preventDefault ();
    return false;
}
document.addEventListener("touchstart",function(){
    return false;
})
window.addEventListener("deviceorientation",function(event){
    // if(!isMove)return ;
    var beta = event.beta;//表示在沿着X轴的旋转，它的取值范围是[-180, 180)。
    var alpha = event.alpha;//表示在沿着Z轴的旋转,取值是[0,360)
    var gamma = event.gamma;//表示在沿着Y轴的旋转，它的取值范围是[-90, 90)。
    betaDom.innerText = `X:beta:${beta}`;
    alphaDom.innerText = `Z:alpha:${alpha}`;
    gammaDom.innerText = `Y:gamma:${gamma}`;

    if(isFirstAngel){
        isFirstAngel = false;
        firstAngel.beta = beta;
        firstAngel.alpha = alpha;
        firstAngel.gamma = gamma;
        return;
    }
    var diffBeta = beta - firstAngel.beta;
    var diffAlpha = alpha - firstAngel.alpha;
    var diffGamma = gamma - firstAngel.gamma;
    // betaDom.innerText = `X:diffBeta:${diffBeta}`;
    // alphaDom.innerText = `Z:diffAlpha:${diffAlpha}`;
    // gammaDom.innerText = `Y:diffGamma:${diffGamma}`;


    if(diffBeta){

    }

    
    
})

function startWebSocket(){
    ws = new WebSocket("wss://rtdp.xueleyun.com");
    socket = ws;
    ws.onopen = function() {
        console.log('连接成功');
    };
    ws.onmessage = function(evt) {
        var received_msg = evt.data;    
        console.log(received_msg)
    };
}
