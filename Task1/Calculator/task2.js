const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isValidExpression(expression) {
    const validChars = /^[0-9+\-*/().\s]+$/;
    return validChars.test(expression);
}

// function evaluateExpression(exp){
//     return eval(exp);
// }



function evaluateExpression(expr) {
  expr = expr.replace(/(\d)(\()/g, '$1*('); 
  const tokens = expr.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
  if (!tokens) throw new Error("Invalid expression");

  const outputQueue = [];
  const operatorStack = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const associativity = { '+': 'L', '-': 'L', '*': 'L', '/': 'L' };

  for (let token of tokens) {
    if (!isNaN(token)) {
      outputQueue.push(Number(token));
    } else if ('+-*/'.includes(token)) {
      while (
        operatorStack.length &&
        '*/+-'.includes(operatorStack.at(-1)) &&
        ((associativity[token] === 'L' && precedence[token] <= precedence[operatorStack.at(-1)]) ||
         (associativity[token] === 'R' && precedence[token] < precedence[operatorStack.at(-1)]))
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack.at(-1) !== '(') {
        outputQueue.push(operatorStack.pop());
      }
      if (operatorStack.pop() !== '(') throw new Error("Mismatched parentheses");
    }
  }

  while (operatorStack.length) {
    const op = operatorStack.pop();
    if (op === '(' || op === ')') throw new Error("Mismatched parentheses");
    outputQueue.push(op);
  }

  const stack = [];
  for (let token of outputQueue) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const a = stack.pop();
      const b = stack.pop();
      switch (token) {
        case '+': stack.push(b + a); break;
        case '-': stack.push(b - a); break;
        case '*': stack.push(b * a); break;
        case '/': stack.push(b / a); break;
      }
    }
  }

  return stack[0];
}

//hey
rl.question('Enter a mathematical expression', (input) => {
    if (isValidExpression(input)) {
        const result = evaluateExpression(input);
        console.log(`Result: ${result}`);
    } else {
        console.log('Invalid input.');
    }
    
    rl.close();
});

