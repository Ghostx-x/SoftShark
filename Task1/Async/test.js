console.log(1);

setTimeout(() => {
    console.log(2);
},2000) 

const myPromise = new Promise( () => {
    setTimeout(() => {
    console.log(3);
},2000) 
})

console.log(4)