context.font = "55px 宋体";
context.scale(4,2);
context.fillRect(50,50,50,50);
const a = context.measureText("5");
console.log(a.width);