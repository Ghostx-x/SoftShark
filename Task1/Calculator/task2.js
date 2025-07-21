const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isValidExpression(expression) {
    const validChars = /^[0-9+\-*/().\s]+$/;
    return validChars.test(expression);
}

function evaluateExpression(exp){
    return eval(exp);
}

rl.question('Enter a mathematical expression', (input) => {
    if (isValidExpression(input)) {
        const result = evaluateExpression(input);
        console.log(`Result: ${result}`);
    } else {
        console.log('Invalid input.');
    }
    
    rl.close();
});