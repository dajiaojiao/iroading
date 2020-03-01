var img = document.querySelector('#animal');
var betaDom = document.querySelector('#beta');
var alphaDom = document.querySelector('#alpha');
var gammaDom = document.querySelector('#gamma');

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

// document.oncontextmenu = function(event){
//     event.preventDefault ();
//     return false;
// }
// document.addEventListener("touchstart",function(){
//     return false;
// })
// window.addEventListener("deviceorientation",function(event){
//     // if(!isMove)return ;
//     var beta = event.beta;//表示在沿着X轴的旋转，它的取值范围是[-180, 180)。
//     var alpha = event.alpha;//表示在沿着Z轴的旋转,取值是[0,360)
//     var gamma = event.gamma;//表示在沿着Y轴的旋转，它的取值范围是[-90, 90)。
//     betaDom.innerText = `X:beta:${beta}`;
//     alphaDom.innerText = `Z:alpha:${alpha}`;
//     gammaDom.innerText = `Y:gamma:${gamma}`;

//     // if(isFirstAngel){
//     //     isFirstAngel = false;
//     //     firstAngel.beta = beta;
//     //     firstAngel.alpha = alpha;
//     //     firstAngel.gamma = gamma;
//     //     return;
//     // }
//     // var diffBeta = beta - firstAngel.beta;
//     // var diffAlpha = alpha - firstAngel.alpha;
//     // var diffGamma = gamma - firstAngel.gamma;
//     // betaDom.innerText = `X:diffBeta:${diffBeta}`;
//     // alphaDom.innerText = `Z:diffAlpha:${diffAlpha}`;
//     // gammaDom.innerText = `Y:diffGamma:${diffGamma}`;


//     if(diffBeta){

//     }

    
    
// })
class MoveLaser{
    constructor(touchDom,startMove,runMove,endMove){
        this.handlerTimesObj = {times:0,date:Date.now()};
        this.handlers = new Object();
        this.longPressTime = 1000 //多长时间认定为长按  单位：ms；
        this.keyTimeOut = null;
        this.startMove = startMove;
        this.runMove = runMove;
        this.endMove = endMove;
        this.touchDom = touchDom;
        this.angelInfo = {};
        this.isFirstAngel = true;
        this.isMove = true;
        this.range = 90;
        // this.initTouchMove();
        this.addLaserListener();
        this.fireEvent();
    }
    fireEvent(){
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation",(event) => {
                this.handlers["deviceorientation"] && this.handlers["deviceorientation"].forEach(element => {
                    element.call(this,event);
                });
            });
        }else{
            console.error('设备不支持陀螺仪');
        }
        
    }
    on(type,handler){
        this.handlers[type] = this.handlers[type] || [];
        this.handlers[type].push(handler);
    }
    off(type,handler){
        this.handlers[type] = this.handlers[type] || [];
        let length = this.handlers[type].length;
        if(this.handlers[type] && length){
            if(handler){
                for(let index = 0;index < length;index ++){
                    let element = this.handlers[type][index];
                    if(element.handler === handler){
                        this.handlers[type].splice(index,1);
                        break;
                    }
                }
            }else{
                this.handlers[type] = [];
            }
        }
    }
    initTouchMove(){
        this.touchDom.style.userSelect = "none";
        this.touchDom.oncontextmenu = function(event){
            event.preventDefault();
            return false;
        }
        this.touchDom.addEventListener("touchstart",() => {
            this.keyTimeOut = setTimeout(() => {
                this.startMove();
            },this.longPressTime)
        })
        this.touchDom.addEventListener("touchend",() => {
            this.keyTimeOut && window.clearTimeout(this.keyTimeOut);
            this.endMove();
        })
    }
    addLaserListener(){
        this.on("deviceorientation",this.orientationHandler);
    }
    orientationHandler(event){
        if(!this.isMove)return;
       
        var beta = event.beta;//表示在沿着X轴的旋转，它的取值范围是[-180, 180)。
        var alpha = event.alpha;//表示在沿着Z轴的旋转,取值是[0,360)
        var gamma = event.gamma;//表示在沿着Y轴的旋转，它的取值范围是[-90, 90)。
        if(beta > 90 || beta < -90){
            alpha = 360 - alpha;
        }
        

        if(this.isFirstAngel){
            this.isFirstAngel = false;
            this.initAngelInfo(beta,alpha,gamma);

            this.handlerTimesObj.times ++;
            this.handlerTimesObj.date = Date.now();
            return;
        }
        if(Date.now() - this.handlerTimesObj.date <= 3000){
            this.handlerTimesObj.times ++;
        }else{
            console.error(this.handlerTimesObj.times / 3)
        }
        const diffOrientation = this.calcOrientationDiff(beta,alpha,gamma);
        const diffBeta = diffOrientation.diffBeta;
        const diffAlpha = diffOrientation.diffAlpha;

        betaDom.innerText = `X:beta:${diffBeta} \n ${event.beta}`;
        alphaDom.innerText = `Z:alpha:${diffAlpha} \n ${event.alpha}`;
        // gammaDom.innerText = `Y:gamma:${gamma}`;

        if(diffBeta || diffAlpha){
            this.runMove(-diffAlpha,-diffBeta);
        }
    }
    initAngelInfo(beta,alpha,gamma){
        this.angelInfo.firstBeta = beta;
        this.angelInfo.firstAlpha = alpha;
        this.angelInfo.firstGamma = gamma;

        this.angelInfo.betaRange = {};//minAngel和maxangel也应该符合beta的角度规则[-180, 180)。
        this.angelInfo.betaRange.minAngel = this.angelInfo.firstBeta - this.range / 2 < -180 ? this.angelInfo.firstBeta - this.range / 2 + 360 : this.angelInfo.firstBeta - this.range / 2;
        this.angelInfo.betaRange.maxAngel = this.angelInfo.firstBeta + this.range / 2 > 180 ? this.angelInfo.firstBeta + this.range / 2 - 360 : this.angelInfo.firstBeta + this.range / 2;

        this.angelInfo.alphaRange = {};//minAngel和maxangel也应该符合alpha的角度规则[0,360)。
        this.angelInfo.alphaRange.minAngel = this.angelInfo.firstAlpha - this.range / 2 < 0 ? this.angelInfo.firstAlpha - this.range / 2 + 360 : this.angelInfo.firstAlpha - this.range / 2;
        this.angelInfo.alphaRange.maxAngel = this.angelInfo.firstAlpha + this.range / 2 > 360 ? this.angelInfo.firstAlpha + this.range / 2 - 360 : this.angelInfo.firstAlpha + this.range / 2;
    }
    resetAngel(){
        this.isMove = false;
        this.isFirstAngel = true;
    }
    allowMove(){
        this.isMove = true;
    }
    calcOrientationDiff(beta,alpha,gamma){
        // 做判断，只有角度在取值range区间的才做逻辑处理
        var diffBeta = this.range / 2;
        var diffAlpha = this.range / 2;
        // beta 偏移量x轴
        if(this.angelInfo.betaRange.minAngel < this.angelInfo.betaRange.maxAngel && beta >= this.angelInfo.betaRange.minAngel && beta <= this.angelInfo.betaRange.maxAngel){
            diffBeta = beta - this.angelInfo.firstBeta;
        }else if(this.angelInfo.betaRange.minAngel > this.angelInfo.betaRange.maxAngel && (beta <= this.angelInfo.betaRange.maxAngel || beta >= this.angelInfo.betaRange.minAngel)){
            diffBeta = Math.abs(beta - this.angelInfo.firstBeta) <= this.range / 2 ? beta - this.angelInfo.firstBeta : beta - this.angelInfo.firstBeta > 0 ? beta - this.angelInfo.firstBeta - 360 : beta - this.angelInfo.firstBeta + 360;
        }else if(Math.abs(beta - this.angelInfo.betaRange.minAngel) <= Math.abs(beta - this.angelInfo.betaRange.maxAngel)){
            diffBeta = - this.range / 2;
        }
        // alpha偏移量z轴
        if(this.angelInfo.alphaRange.minAngel < this.angelInfo.alphaRange.maxAngel && alpha >= this.angelInfo.alphaRange.minAngel && alpha <= this.angelInfo.alphaRange.maxAngel){
            diffAlpha = alpha - this.angelInfo.firstAlpha;
        }else if(this.angelInfo.alphaRange.minAngel > this.angelInfo.alphaRange.maxAngel && (alpha <= this.angelInfo.alphaRange.maxAngel || alpha >= this.angelInfo.alphaRange.minAngel)){
            diffAlpha = Math.abs(alpha - this.angelInfo.firstAlpha) <= this.range / 2 ? alpha - this.angelInfo.firstAlpha : alpha - this.angelInfo.firstAlpha > 0 ? alpha - this.angelInfo.firstAlpha - 360 : alpha - this.angelInfo.firstAlpha + 360;
        }else if(Math.abs(alpha - this.angelInfo.alphaRange.minAngel) <= Math.abs(alpha - this.angelInfo.alphaRange.maxAngel)){
            diffAlpha = - this.range / 2;
        }
        return {diffBeta:diffBeta,diffAlpha:diffAlpha};
    }
    // runMove(diffAngleX,diffAngleY){
    //     var width = document.documentElement.clientWidth / 2;
    //     var height = document.documentElement.clientHeight / 2;
    //     var moveX = width * diffAngleX / (90 / 2);
    //     var moveY = height * diffAngleY / (90 / 2);
    //     var circleLocal = document.querySelector("#circleLocal");
    //     $(circleLocal).css({
    //         transform:"translate(" + moveX + "px," + moveY + "px)"
    //     })
    //     Utils.send(this.wsManager,this.userId,'pc-moveLaser',{
    //         cmd:'pc-moveLaser',
    //         data:{
    //             cmd:'pc-moveLaser',
    //             params:{
    //                 x:diffAngleX.toString(),
    //                 y:diffAngleY.toString()
    //             }    
    //         }
    //     },4,false)
    //     .then(()=>{})
    // }

}
new MoveLaser();


