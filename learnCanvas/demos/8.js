context.clearRect(0,0,canvas.width,canvas.height);
context.strokeRect(0,0,canvas.width,canvas.height);
context.strokeStyle = "#0ff";
setMatrix();
drawText();
drawLine();
function setMatrix(){
    const angle = Math.PI / 4;
    const size = 1.5
    // context.rotate(angle);
    // context.scale(size,size);
    // context.setTransform(Math.cos(angle) * size,Math.sin(angle)*size,-Math.sin(angle)*size,Math.cos(angle) * size,0,0);
    context.setTransform(1,0,0.75,1,0,0);
}
function drawText(){
    context.fillStyle = "#000";
    context.font = "24px 黑体";
    context.strokeText("矩阵尝试",100,100);
}
function drawLine(){
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(100,100);
    context.lineTo(400,100);
    // context.fill();
    context.stroke();
}