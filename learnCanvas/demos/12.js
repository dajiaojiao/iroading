drawText();
document.addEventListener("mousemove",function(event){
    const {clientX,clientY} = event;
    eraser(clientX,clientY);
})
function drawText(){
    context.save();
    context.strokeStyle = "#0ff";
    context.font = "25px 宋体";
    context.strokeText("人之所欲者无穷，而物之可以足吾欲者有尽",50,50);
    context.restore();
}
function eraser(x,y){
    context.save();
    context.beginPath();
    context.arc(x,y,10,0,Math.PI * 2,true);
    context.clip();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.restore();
}