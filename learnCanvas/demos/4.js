

context.beginPath();
context.rect(0,0,canvas.width,canvas.height);
context.arc(150, 75, 50, 0, Math.PI * 2, true);
context.stroke();
context.fillStyle = "rgba(0,0,0,0.5)";
context.fill();