// function process(num){
//     return num;
// }

function process(num, callback) {
    setTimeout(() => {        
        console.log("processing..");
        callback(num)
    }, 2000);
}

// function combine(num1, num2){
//     return num1 + num2;
// }

function combine(num1, num2, callback) {
    setTimeout(() => {
        console.log("combining..");
        callback(num1 + num2)
    }, 2000);
}

// function calculate(input){
//      let temp = process(input);
//      return combine(input, temp) + temp;
// } 

// input - 2, temp - 2, result - 6

function calculate(input, callback) {
    process(input, (temp) => {
        combine(input, temp, (combinedResult) => {
            callback(combinedResult + temp);
        });
    });
}

calculate(2, (result) => {
    console.log(result);
})