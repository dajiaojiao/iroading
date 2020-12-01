const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
let context2Restore = null;
const img = document.createElement("img");
img.onload = function(){
    context2.drawImage(this,0,0);
    context.drawImage(this,0,0); 
    context2Restore = context.getImageData(0,0,canvas2.width / 2,canvas2.height / 2);
    console.log(context2Restore);
}
img.src = "../../images/test.jpg";

canvas2.addEventListener("mousemove",function(event){
    if(!context2Restore)return;
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    // context.globalAlpha = .1;
    // context.drawImage(img,0,0);
    context.putImageData(context2Restore,50,50,event.offsetX - 25,event.offsetY - 25,50,50);
    context.restore();

})