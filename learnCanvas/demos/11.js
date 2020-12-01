drawClip();
drawText();
function drawText(){
    context.fillStyle = "#0ff";
    context.font = "55px 宋体";
    context.fillText("好好学习，天天向上",50,50);
}
function drawClip(){
    context.beginPath();
    context.arc(60,50,50,0,Math.PI * 2,true);
    context.clip();

    context.beginPath();
    context.arc(110,50,50,0,Math.PI * 2,false);
    context.clip();

    context.fill();
}

/*
    结论：clip方法总是在上一次的剪辑区域基础上进行操作的；

*/
