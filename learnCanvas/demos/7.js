const number = document.getElementById("input");
number.onchange = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
    const slide = parseInt(this.value);
    drawSlideShape(slide);
}

function drawSlideShape(slideNum) {
    const points = getSlidePoints(slideNum,0,150,150,100);
    context.beginPath();
    context.moveTo(points[0].x,points[0].y);
    const length = points.length;
    for(let index = 1;index < length;index ++){
        context.lineTo(points[index].x,points[index].y);
    }
    context.closePath();
    context.fill();
}
function getSlidePoints(slideNum, startAngle, centerX, centerY, radius) {
    let angle = startAngle || 0;
    const angleStep = Math.PI * 2 / slideNum;
    let points = [];
    for (let slide = 0; slide < slideNum; slide++) {
        const point = {};
        point.x = centerX + radius * Math.sin(angle);
        point.y = centerY - radius * Math.cos(angle);
        points.push(point);
        angle += angleStep;
    }
    return points;
}