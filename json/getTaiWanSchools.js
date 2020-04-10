const fs = require("fs");
const minX = 119.8, maxX = 122.4, minY = 21.8, maxY = 25.37
const pages = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let schoolPromises = pages.map(page => getSchool(page));
Promise.all(schoolPromises).then(data => {
    let schools = data.flat(2);
    fs.writeFile('schools.json', JSON.stringify(schools),  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
     });
})
function getSchool(pageNum){
    return new Promise(resolve => {
        let schools = [];
        fs.readFile(`./${pageNum}.json`, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(pageNum)
            const dataJson = JSON.parse(data.toString());
            let dataList = dataJson.dataList;
            dataList.forEach(school => {
                if (school.axisX >= minX && school.axisX <= maxX && school.axisY >= minY && school.axisY <= maxY){
                    school.page = pageNum;
                    schools.push(school);
                }
            })
            resolve(schools);
        });
    })
}



