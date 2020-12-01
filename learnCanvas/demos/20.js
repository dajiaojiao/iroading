const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
const img = document.createElement("img");
img.onload = function(){
    context.drawImage(this,0,0); 
    const imageData = changeImageData(context.getImageData(0,0,canvas.width,canvas.height));
    context2.putImageData(imageData,0,0);
}
img.src = "../../images/test.jpg";


function changeImageData(imageData1){
    let imageData = imageData1.data;
    const length = imageData.length;
    for(let i = 0;i < length;i += 4){
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];

        //负片滤镜
        // imageData[i] = 255 - red;
        // imageData[i + 1] = 255 - green;
        // imageData[i + 2] = 255 - blue;

        // 黑白滤镜；
        const color = (red + green + blue) / 3;
        imageData[i] = color;
        imageData[i + 1] = color;
        imageData[i + 2] = color;

    }
    return imageData1;
}