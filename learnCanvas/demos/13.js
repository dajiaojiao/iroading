let imgData = null;
const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
drawText();
function drawText(){
    context.save();
    context.setTransform(1,0,0,1,0,200);
    context.strokeStyle = "#0ff";
    context.font = "25px 宋体";
    context.strokeText("人之所欲者无穷，而物之可以足吾欲者有尽",50,50);
    imgData = context.getImageData(0,0,canvas.width,canvas.height);
    context2.setTransform(2,0,0,1,0,0);
    context2.putImageData(imgData,0,0);
    context2.fillRect(0,0,50,50)
    context.restore();
}
//结论 getImageData和putImageData 不受 canvas矩阵影响，其是相对于canvas元素的；

