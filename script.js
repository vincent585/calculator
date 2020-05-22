const container = document.querySelector('#container');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#calc-screen');
const equalBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');



const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b == 0) {
        alert(`Can't divide by zero!`);
        calculator.displayValue = calculator.firstOperand;
        calculator.firstOperand = '';
        return calculator.displayValue;
    } else {
        return a / b;
    }
}

const operate = (a, b, operator) => {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/': 
            return divide(a, b);
        default:
            return 'Woops, something went wrong...';
    }
}

const calculator = {
    displayValue: 0,
    operator: null,
    firstOperand: '',
    waitingForSecondOperand: false,
}

function updateDisplay(event) {
        let digitButton = event.target.closest('.digit');

        if(!digitButton) return;

        if (calculator.operator && calculator.waitingForSecondOperand) {
            calculator.firstOperand = calculator.displayValue;
            calculator.displayValue = 0;
            calculator.waitingForSecondOperand = false;
        } 

        if (calculator.displayValue === 0) {
            calculator.displayValue = digitButton.value;
            display.textContent = calculator.displayValue;
        } else {
            calculator.displayValue += digitButton.value;
            display.textContent = calculator.displayValue;
            
        }
}

function getOperator(event) {
    let operatorButton = event.target.closest('.operator');

    if(!operatorButton) return;

    calculator.operator = operatorButton.value;
    calculator.waitingForSecondOperand = true; 
} 

function evaluateExpression(event) {

    let operatorButton = event.target.closest('.operator');
    let equalBtn = event.target.closest('.equals');

    if (equalBtn) {
        if (calculator.firstOperand && calculator.displayValue && calculator.operator) {
            calculator.displayValue = parseFloat(operate(calculator.firstOperand, calculator.displayValue, calculator.operator));
            calculator.firstOperand = calculator.displayValue;
            display.textContent = calculator.displayValue;
            calculator.operator = null;
        }
    }

    if (operatorButton) {
        if (calculator.firstOperand && calculator.displayValue && calculator.operator) {
            calculator.displayValue = parseFloat(operate(calculator.firstOperand, calculator.displayValue, calculator.operator));
            calculator.firstOperand = calculator.displayValue;
            display.textContent = calculator.displayValue;
        }
    }
    
}

function handleMultipleOperators() {
    operators.forEach(operator => {
        operator.addEventListener('click', evaluateExpression);
    });
}

function inputDecimal() {
    if (calculator.displayValue && calculator.operator && calculator.waitingForSecondOperand) {
        calculator.firstOperand = calculator.displayValue;
        calculator.displayValue = 0;
        calculator.displayValue += '.';
        calculator.waitingForSecondOperand = false;
        display.textContent = calculator.displayValue;
    }

    if (display.textContent.includes('.')) {
        return;
    }
    
    calculator.displayValue += '.';
    display.textContent = calculator.displayValue;
}

function resetCalculator() {
    calculator.displayValue = 0;
    calculator.firstOperand = '';
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    display.textContent = calculator.displayValue;
}

handleMultipleOperators();
equalBtn.addEventListener('click', evaluateExpression);
container.addEventListener('click', updateDisplay);
container.addEventListener('click', getOperator);
clearBtn.addEventListener('click', resetCalculator);
decimal.addEventListener('click', inputDecimal);