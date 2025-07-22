// function fizzle(input) {
//     return input-2
// }

function fizzle(input, callback) {
    setTimeout(() => {
        console.log("fizzling..");
        callback(input-2)
    }, 2000)
}

function boggle(num1, num2, callback) {
    setTimeout(() => {
        console.log("boggling..");
        callback(num1 + num2)
    }, 2000)
}

// function calculate(input){
//      let qux = fizzle(input);
//      if (qux<input) 
// 	    qux += boggle(input, qux);
//      return qux;
// }

function calculate(input, callback) {
    fizzle(input, (qux) => {
        boggle(input, qux, (result) => {
            return callback(qux + result);
        })
    })
}

calculate(2, (result) => {
    console.log(result)
})