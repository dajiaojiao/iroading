//1. async function a() {
//     const b = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(1)
//             resolve(1)
//         },1000)

//     })
//     console.log(b);
//     console.log(2)
//     const c = await new Promise((resolve,reject) => {
//         setTimeout(() => {
//             console.log(333)
//             resolve(3)
//         }, 500);

//     })
//     console.log(c);
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve(5)
//         }, 1000);
//     })
// }
// async function d(){
//     var b = await a();
//     console.log(b,"aaaa");

// }
// d();

// 2.1   0 Promise 1 10;
// let a = 0;
// let f = async () => {
//     console.log(a);
//     a = a + await 10;
//     console.log(a);

// }
// console.log(f())
// console.log(++a);

//2.2
// var a = 1;
// var f = function*(){
//     console.log(a);
//     var b = a + (yield 10);
//     console.log("b",b);//2
// }
// var f = f();
// console.log(f.next());
// a = 2;
// f.next(1);
