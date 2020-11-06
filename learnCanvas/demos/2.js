const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// context.lineJoin = "round";
// context.lineWidth = 30;
// context.font = "24px 黑体";
// context.fillText("click anywhere",175,40);

// context.globalAlpha = 0.5
// context.strokeRect(75,100,200,180);
// context.fillRect(325,100,200,200);

let smallY = 1;
let gradient = context.createRadialGradient(
    canvas.width / 2,smallY,10,
    canvas.width / 2,canvas.height / 2,100
)
gradient.addColorStop(0,'blue');
gradient.addColorStop(0.25,'white');
gradient.addColorStop(.5,"purple");
gradient.addColorStop(.75,'red');
gradient.addColorStop(1,'yellow');

draw();
function draw(){
    context.fillStyle = gradient;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.rect(0,0,canvas.width,canvas.height);
    context.fill();
    window.requestAnimationFrame(draw);
}
document.addEventListener("keydown",function(e){
    const keyCode = e.keyCode;
    if(keyCode === 38){
        smallY = Math.max(0,++smallY)
        gradient = context.createRadialGradient(
            canvas.width / 2,smallY,10,
            canvas.width / 2,canvas.height / 2,100
        )
    }else if(keyCode === 40){
        smallY = Math.max(0,--smallY)
        gradient = context.createRadialGradient(
            canvas.width / 2,smallY,10,
            canvas.width / 2,canvas.height / 2,100
        )
    }
    console.log(smallY --)
    gradient = context.createRadialGradient(
        canvas.width / 2,Math.max(0,smallY ++),10,
        canvas.width / 2,canvas.height / 2,100
    )
    gradient.addColorStop(0,'blue');
    gradient.addColorStop(0.25,'white');
    gradient.addColorStop(.5,"purple");
    gradient.addColorStop(.75,'red');
    gradient.addColorStop(1,'yellow');
})