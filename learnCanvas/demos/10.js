
function drawClip(x,y){
    context.setTransform(1,0,0,1,x,y);
    context.save();
    context.beginPath();
    context.arc(0,0,30,0,Math.PI * 2,false);
    context.clip();

    context.fillStyle = "#0ff";
    context.font = "50px 黑体";
    context.setTransform(1,0,0,1,0,0);
    context.fillText("好好学习，天天向上",50 ,50 );

    context.restore();
}
document.addEventListener("mousemove",function(event){
    const x = event.clientX;
    const y = event.clientY;
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);
    drawClip(x,y);
})