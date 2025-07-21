

function calculator(a, symbol, b) {
    if (symbol === "+") {
        return a + b;
    } else if (symbol === "-") {
        return a - b;
    } else if (symbol === "*") {
        return a * b;
    } else if (symbol === "/") {
        if (b !== 0) {
            return a / b;
        } else {
            return "Cannot divide by zero";
        }
    } else {
        return "Invalid operation. Please use +, -, *, or /.";
    }
}


const argvs = process.argv;
const argv = argvs.slice(2);


if (argv.length !== 3) {
    console.log("Usage: node day1.js <num1> <operator> <num2>");
    process.exit(1);
}


const num1 = parseFloat(argv[0]);
const operator = argv[1]; 
const num2 = parseFloat(argv[2]);




const result = calculator(num1, operator, num2);


console.log(`Result: ${result}`);
