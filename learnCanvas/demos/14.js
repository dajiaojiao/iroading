drawFonts(50,30,"normal normal normal 30px 宋体");
drawFonts(50,110,"italic normal normal 30px 宋体");
drawFonts(50,190,"oblique normal normal 30px 宋体");
drawFonts(50,270,"normal small-caps normal 30px 宋体");

function drawFonts(x,y,fontStyle){
    context.save();
    context.font = fontStyle;
    context.strokeText("子不语怪，力，乱，神",x,y);
    context.fillText("子不语怪，力，乱，神",x,y + 40);
    context.restore();
}

