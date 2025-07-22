// function calculate(input){
//        let qux = fizzle(input);
//        while (qux<input)
// 	  qux += boggle(input, qux);
//    return qux;
// }

function fizzle(input, callback) {
    setTimeout(() => {
        console.log("fizzling..");
        callback(input-6)
    }, 2000)
}

function boggle(num1, num2, callback) {
    setTimeout(() => {
        console.log("boggling..");
        callback((num1 + num2)/2)
    }, 2000)
}

function calculate(input, callback) {
    fizzle(input, (qux) => {
        while(qux<input) {
            boggle(input, qux, (result) => {
                return callback(qux += result)
            })
        }
    })
}

calculate (10, (result) => {
    return(result)
})