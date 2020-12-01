const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
const img = document.createElement("img");
img.onload = function () {
    context.drawImage(this, 0, 0);
    const imageData = changeImageData(context.getImageData(0, 0, canvas.width, canvas.height));
    context2.putImageData(imageData, 0, 0);
}
img.src = "../../images/test.jpg";


function changeImageData(imageData) {
    let data = imageData.data;
    const length = data.length;
    const width = imageData.width;
    // 浮雕滤镜
    for (let i = 0; i < length; i++) {
        if (i <= length - width * 4) {//不是最后一行；
            if ((i + 1) % 4 !== 0) {//不是alpha数据；
                if ((i + 4) % (width * 4) == 0) {//本数据是每一行的最后一个像素的r数据；
                    data[i] = data[i - 4];
                    data[i + 1] = data[i - 3];
                    data[i + 2] = data[i - 2];
                    data[i + 3] = data[i - 1];
                    i += 4;
                } else {
                    data[i] = 256 / 2 + 2 * data[i] - data[i + 4] - data[i + width * 4];
                }
            }
        } else {
            if ((i + 1) % 4 !== 0) {//不是alpha数据；
                data[i] = data[i - width * 4];
            }
        }



    }
    return imageData;
}


// for(let i = 0;i < 4;i ++){
//     document.body.addEventListener("click",function(){
//         console.log(i);
//     })
// }
// for(var i = 0;i < 4;i ++){
//     !function(i){
//         document.body.addEventListener("click",function(){
//             console.log(i);
//         })
//     }(i)
// }
// for(let i = 0;i < 5;i ++){
//     console.log(i);
//     i += 2;
// }