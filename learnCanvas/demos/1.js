const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.strokeStyle = "#000";
context.fillStyle = "#000";
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 100;
const hourLineLength = 30;
const minuteLineLength = 50;
const secondLineLength = 80;
const textRadius = 110;
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBigCircle();
    drawPointerLine();
    drawSmallCircle();
    drawText();
    window.requestAnimationFrame(draw);
}
draw();
// document.addEventListener("keydown",function(event){console.log("keydown",event)});
// document.addEventListener("keypress",function(event){console.log("keypress",event)});
// document.addEventListener("keyup",function(event){console.log("keyup",event)});

function drawBigCircle() {
    context.beginPath();
    context.arc(centerX,
        centerY,
        radius,
        0,
        Math.PI * 2,
        true);
    context.stroke();
}
function drawSmallCircle(){
    context.beginPath();
    context.arc(centerX,
        centerY,
        5,
        0,
        Math.PI * 2,
        true);
    context.fill();
}
function drawPointerLine(){
    const date = new Date();
    let hour = date.getHours();
    hour = hour <= 12 ? hour : hour - 12;
    const minute = date.getMinutes();
    const second = date.getSeconds();
    drawHourLine(hour,minute,second);
    drawMinuteLine(minute,second);
    drawSecondLine(second);
}
function drawHourLine(hour,minute,second){
    const secondSums = second + minute * 60 + hour * 60 * 60;
    const secondOneDay = 12 * 60 * 60;
    const degree = Math.PI * 2 * (secondSums / secondOneDay);

    const pointeX = centerX + hourLineLength * Math.cos(Math.PI / 2 - degree);
    const pointeY = centerY - hourLineLength * Math.sin(Math.PI / 2 - degree);
    context.beginPath();
    context.moveTo(centerX,centerY);
    context.lineTo(pointeX,pointeY);
    context.save();
    context.lineWidth = 5;
    context.stroke();
    context.restore();

}
function drawMinuteLine(minute,second){
    const secondSums = minute * 60 + second;
    const secondOneHour = 60 * 60;
    const degree = Math.PI * 2 * (secondSums / secondOneHour);
    
    const pointeX = centerX + minuteLineLength * Math.cos(Math.PI / 2 - degree);
    const pointeY = centerY - minuteLineLength * Math.sin(Math.PI / 2 - degree);
    context.beginPath();
    context.moveTo(centerX,centerY);
    context.lineTo(pointeX,pointeY);
    context.save();
    context.lineWidth = 3;
    context.stroke();
    context.restore();

}
function drawSecondLine(second){
    const secondSums = second;
    const secondOneHour = 60;
    const degree = Math.PI * 2 * (secondSums / secondOneHour);
    
    const pointeX = centerX + secondLineLength * Math.cos(Math.PI / 2 - degree);
    const pointeY = centerY - secondLineLength * Math.sin(Math.PI / 2 - degree);
    context.beginPath();
    context.moveTo(centerX,centerY);
    context.lineTo(pointeX,pointeY);
    context.save();
    context.lineWidth = 1;
    context.stroke();
    context.restore();

}
function drawText(){
    context.save();
    for(let i = 1;i <=12;i ++){
        const degree = Math.PI * 2 * (i / 12);
        const pointeX = centerX + textRadius * Math.cos(Math.PI / 2 - degree);
        const pointeY = centerY - textRadius * Math.sin(Math.PI / 2 - degree);
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(i.toString(), pointeX, pointeY);
    }
    context.restore();

}