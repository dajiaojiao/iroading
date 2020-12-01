const text = "道世事无常,生变换,饱沧桑，不复芬芳";
const radius = 100;
const space1 = 10;
const centerX = 250;
const centerY = 150;
drawBaseLine(centerX,centerY,radius);
drawText(text,radius)

function drawBaseLine(x,y,radius){
    context.save();
    context.strokeStyle = "#000";
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(x,y,5,0,Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI * 2);
    context.stroke();
    context.restore();
}
function drawText(text,radius){
    context.save();
    context.font = "25px 宋体";
    context.strokeStyle = "red";
    context.fillStyle = "#0ff";
    context.textAlign = "left";
    context.textBaseline = "bottom";
    const initText = getTextByWidth(text,space1,Math.PI * 2 * radius);
    drawTextLoop(centerX,centerY,radius,space1,initText)
    context.restore();
}
function getTextByWidth(text,space,maxWidth){
    if(!text)return "";
    let widthSum = context.measureText(text.charAt(0)).width;
    const length = text.length;
    for(let index = 1;index < length;index ++){
        if(widthSum + space >= maxWidth){
            return text.substring(0,index);
        }
        widthSum += space;
        const char = text.charAt(index);
        const width = context.measureText(char).width;
        if(widthSum + width >= maxWidth){
            return text.substring(0,index);
        }
        widthSum += width;
    }
    return text;
}
function drawTextLoop(centerX,centerY,radius,space,text){
    const length = text.length;
    let allRadian = 0;
    for(let index = 0;index < length;index ++){
        const char = text.charAt(index);
        const charWidth = context.measureText(char).width;
        allRadian += charWidth;
    }
    allRadian += space * (length - 1);
    const halfRadian = allRadian / 2;
    let startAngle = - halfRadian / radius;
    for(let index = 0;index < length;index ++){
        const char = text.charAt(index);
        const angle = Math.PI / 2 + startAngle;
        const pointX = centerX - radius * Math.cos(angle);
        const pointY = centerY - radius * Math.sin(angle);
        context.save();
        context.translate(pointX,pointY);
        context.rotate(startAngle);
        context.fillText(char,0,0);
        context.restore();
        const charWidth = context.measureText(char).width;
        startAngle += (space + charWidth)/ radius;
    }

}