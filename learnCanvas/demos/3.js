const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
drawTwoArcs();
function drawTwoArcs(){
    context.beginPath();
    context.arc(300,150,100,0,Math.PI,true);
    context.arc(300,150,80,0,Math.PI * 2,false);
    context.save();
    context.fillStyle = '#0ff';
    context.fill();
    context.stroke();
    context.restore();
}
