const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

rl.question('Enter the first number: ', (num1Input) => {
    const num1 = parseFloat(num1Input);

    rl.question('Enter the operator (+, -, *, /): ', (operator) => {

        rl.question('Enter the second number: ', (num2Input) => {
            const num2 = parseFloat(num2Input);

            const result = calculator(num1, operator, num2);

            console.log(`Result: ${result}`);

            rl.close();
        });
    });
});
