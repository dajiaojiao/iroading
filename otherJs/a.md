gData = {
    class:{
        teachTargetType:number = 1; 1-普通班级，2-互动小组
        aboutInteractGroup:{
            id:string,
            name:string,
            classNum:number,
            classList:[{
                classType:number,
                className:string
            }]
        }
    }
}