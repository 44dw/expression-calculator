function eval() {
    // Do not use eval!!!
    return;
}

const allSymbols = [ '*', '/', '+', '-', '(', ')' ];
const priority = [ '-', '+', '/', '*', ];
const priorityObj = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
}

function getNextPiece(txt) {
    const match = txt.match(/\d+|\+|-|\*|\/|\(|\)/)[0];

    index = match.length;

    return [txt.slice(0, index), txt.slice(index)];
}

function calculate(num1, num2, sym) {
    console.log(`calculate ${num2} vs ${num1} with ${sym}`)
    switch (sym) {
        case '*': {
            console.log(`*: result is ${num2 * num1}`)
            return num2 * num1;
        }
        case '/': {
            console.log(`/: result is ${num2 / num1}`)
            return num2 / num1;
        }
        case '+': {
            console.log(`+: result is ${num2 + num1}`)
            return num2 + num1;
        }
        case '-': {
            console.log(`-: result is ${num2 - num1}`)
            return num2 - num1;
        }
    }
}

function dealWithSymbol(sym, numbers, symbols) {
    console.log(`meet ${sym}`);
    if (sym === '(') {
        symbols.push(sym)
        return;
    }
    if (sym === ')') {
        while (symbols[symbols.length - 1] !== '(') {
            const num1 = numbers.pop();
            const num2 = numbers.pop();
            const prevSym = symbols.pop();
            numbers.push(calculate(num1, num2, prevSym));
        }
        symbols.pop();
        return;
    }
    if (priority.indexOf(sym) < priority.indexOf(symbols[symbols.length - 1])) {
    // if (priorityObj[sym] < priorityObj[symbols[symbols.length - 1]]) {
        const num1 = numbers.pop();
        const num2 = numbers.pop();
        const prevSym = symbols.pop();
        numbers.push(calculate(num1, num2, prevSym));
        dealWithSymbol(sym, numbers, symbols);
    } else {
        symbols.push(sym);
        return;
    }

}

function expressionCalculator(expr) {
    const trimmed = expr.split(' ').join('');

    let numbers = [];
    let symbols = [];

    let numberAccumulator = '';

    for (let i = 0; i < trimmed.length; i++) {
        if (allSymbols.includes(trimmed[i]) ) {
            if (numberAccumulator.length > 0) {
                numbers.push(Number(numberAccumulator))
                numberAccumulator = '';
            }
            dealWithSymbol(trimmed[i], numbers, symbols);
        } else {
            numberAccumulator += trimmed[i];
        }
    }
    if (numberAccumulator.length > 0) {
        numbers.push(Number(numberAccumulator));
    }

    console.log(numbers);
    console.log(symbols);

    while (symbols.length > 0) {
        if (priorityObj[symbols[symbols.length - 1]] !== 2)  {
            console.log('do shifts')
            const num2 = numbers.shift();
            const num1 = numbers.shift();
            const sym = symbols.shift();
            numbers.unshift(calculate(num1, num2, sym));
        } else {
            console.log('do pops')
            const num1 = numbers.pop();
            const num2 = numbers.pop();
            const prevSym = symbols.pop();
            numbers.push(calculate(num1, num2, prevSym));
        }
    }

    console.log(symbols);

    return numbers[0];
}

console.log(expressionCalculator("88 - 72 + 55 * 57"))

// module.exports = {
//     expressionCalculator
// }