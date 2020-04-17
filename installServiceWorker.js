if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
        console.log('ServiceWorker registration successful with scope:',registration)
    })
    .catch (error => {
        console.log(error);
        
    })
}
const img = document.querySelector("#img1");
setTimeout(function(){
    img.src = "./images/test.jpg"
},1000)
// unInstall()
// function unInstall() {
//     navigator.serviceWorker.getRegistrations().then(function (registrations) {
//         for (let registration of registrations) {
//             console.log(registration)
//             registration.unregister();
//         }
//     });
// }

 