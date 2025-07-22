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

// function calculate(input, callback) {
//     fizzle(input, (qux) => {
//         function check(qux) {
//             if(qux<input) {
//                 boggle(input, qux, (result) => {
//                     qux += result;
//                     check(qux)
//                 })
//             } else {
//                 callback(qux);
//             }
//         } check(qux); 
//     })
// }

function calculate(input, callback) {
    callback(input + 5);
}
// calculate (10, console.log)

    calculate (10, (result) => {
        return(result)
    })