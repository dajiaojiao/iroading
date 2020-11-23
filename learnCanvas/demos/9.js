const compositeOperation = document.getElementById("globalCompositeOperation").value;
context.clearRect(0,0,canvas.width,canvas.height);
context.globalCompositeOperation = compositeOperation;
drawCircle();
drawRect(); 
document.getElementById("globalCompositeOperation").onchange = function(e){
    const compositeOperation = this.value;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.globalCompositeOperation = compositeOperation;
    drawCircle();
    drawRect();
}
function drawText(){
    context.save();
    context.fillStyle = "#0ff";
    context.font = "35px 黑体";
    context.fillText("好好学习",100,100);
    context.restore();
}
function drawRect(){
    context.beginPath();
    context.rect(80,80,150,40);
    context.save();
    context.fillStyle = "#0ff";
    context.fill();
    context.restore();
}
function drawCircle(){
    context.beginPath();
    context.arc(160,100,50,0,Math.PI * 2,false);
    context.save();
    context.fillStyle = "red";
    context.fill();
    context.restore();
}