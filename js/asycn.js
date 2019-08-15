async function a() {
    const b = await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(1)
            resolve(1)
        },1000)

    })
    console.log(b);
    console.log(2)
    const c = await new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(333)
            resolve(3)
        }, 500);

    })
    console.log(c);
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(5)
        }, 1000);
    })
}
async function d(){
    var b = await a();
    console.log(b,"aaaa");

}
d();