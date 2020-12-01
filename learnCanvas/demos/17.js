/**
 * 写一个文本输入框,只输入英文，使用keypress事件足够了；
 */
"use strict";
const textArea = {
    bgSrc: "../../images/test.jpg",
    canvas: canvas,
    context: context,
    fontSize: 20,
    text:"",
    async init(){
        await this.drawBg();
        this.initEvent();
    },
    drawBg(){
        const img = document.createElement("img");
        return new Promise(resolve => {
            img.onload = () =>{
                this.context.drawImage(img,0,0);
                resolve();
            }
            img.src = this.bgSrc;
        })
    },
    initEvent(){
        document.addEventListener("click",() => {

        })
    },
    drawBlinkLine(){}
}
textArea.init();