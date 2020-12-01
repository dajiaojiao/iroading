const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
let context2Restore = null;
const img = document.createElement("img");
img.onload = function(){
    context2.drawImage(this,0,0);
    context.drawImage(this,0,0);
    context2.strokeRect(canvas2.width/2,canvas2.height/2,canvas2.width/2,canvas2.height/2)
    context2Restore = context2.getImageData(canvas2.width/2,canvas2.height/2,canvas2.width/2,canvas2.height/2);
}
img.src = "../../images/test.jpg";

canvas2.addEventListener("mousemove",function(event){
    if(!context2Restore)return;
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    // context.globalAlpha = .1;
    // context.drawImage(img,0,0);
    context.putImageData(context2Restore,0,0,0,0,canvas2.width/2,canvas2.height/2);
    context.restore();

})