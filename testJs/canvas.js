const canvasDrawing = document.querySelector("#Drawing");
const context = canvasDrawing.getContext("2d");

// context.strokeStyle = "#00f";
// context.rect(0,0,50,50);  
// context.stroke();

context.font = '24px STHeiTi, SimHei';
// 文本信息对象就有了
context.fillStyle = 'red';
var textZh = context.measureText('帅');
var textEn = context.measureText('handsome');
// 文字绘制
context.fillText('帅', 60, 50);
context.fillText('handsome', 60, 90);
// 显示宽度
context.font = '12px Arial';
context.fillText('宽' + textZh.width, 62 + textZh.width, 40);
context.fillText('宽' + textEn.width, 62 + textEn.width, 80);
var a = canvasDrawing.toDataURL()
console.log(a);

// 文字样式
// context.font = '50px STHeiti, SimHei';
// // 文字先描边
// context.lineWidth = 3;
// context.strokeStyle = 'red';
// context.strokeText('文字描边', 50, 90);
// 再填充
// context.fillText('文字描边', 50, 90);
// 登录状态下不会出现这行文字，点击页面右上角一键登录



// 文字背景为图片
// var img = new Image;
// img.onload = function(){
//     draw();
// };
// img.src = "../images/test.jpg";
// function draw(){
//     var pattern = context.createPattern(img,"no-repeat");
//     context.fillStyle = pattern;
// // 登录状态下不会出现这行文字，点击页面右上角一键登录
//     context.textBaseline = "top";
//     context.font = '200px STHeiti, SimHei';
//     context.fillText("你好啊哈哈",0,0);
// }

