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


//语法糖
// let test = function () {
//     // ret 为一个Promise对象，因为ES6语法规定 async 函数的返回值必须是一个 promise 对象
//     let ret = _asyncToGenerator(function* () {
//         for (let i = 0; i < 10; i++) {
//             let result = yield sleep(1000);
//             console.log(result);
//         }
//     });
//     return ret;
// }();

// // generator 自执行器
// function _asyncToGenerator(genFn) {
//     return new Promise((resolve, reject) => {
//         let gen = genFn();
//         function step(key, arg) {
//             let info = {};
//             try {
//                 info = gen[key](arg);
//             } catch (error) {
//                 reject(error);
//                 return;
//             }
//             if (info.done) {
//                 resolve(info.value);
//             } else {
//                 return Promise.resolve(info.value).then((v) => {
//                     return step('next', v);
//                 }, (error) => {
//                     return step('throw', error);
//                 });
//             }
//         }
//         step('next');
//     });
// }

function wait() {
    return new Promise(resolve =>
        setTimeout(resolve, 10 * 1000)
    )
}

async function main() {
    console.time();
    const x = await wait(); // 每个都是都执行完才结,包括setTimeout（10*1000）的执行时间
    const y = await wait(); // 执行顺序 x->y->z 同步执行，x 与 setTimeout 属于同步执行
    const z = await wait();
    console.timeEnd(); // default: 30099.47705078125ms

    console.time();
    const x1 = wait(); // x1,y1,z1 同时异步执行， 包括setTimeout（10*1000）的执行时间
    const y1 = wait(); // x1 与 setTimeout 属于同步执行
    const z1 = wait();
    await x1;
    await y1;
    await z1;
    console.timeEnd(); // default: 10000.67822265625ms

    console.time();
    const x2 = wait(); // x2,y2,z2 同步执行，但是不包括setTimeout（10*1000）的执行时间
    const y2 = wait(); // x2 与 setTimeout 属于异步执行
    const z2 = wait();
    x2, y2, z2;
    console.timeEnd(); // default: 0.065185546875ms
}
main();
