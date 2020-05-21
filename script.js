const container = document.querySelector('#container');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const display = document.querySelector('#calc-screen');
const equalBtn = document.querySelector('.equals');



const add = (a, b) => parseInt(a) + parseInt(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
    displayValue: '',
    operator: null,
    firstOperand: '',
    waitingForSecondOperand: false,
}

function updateDisplay(event) {
        let digitButton = event.target.closest('.digit');

        if(!digitButton) return;

        if (calculator.operator && calculator.waitingForSecondOperand) {
            calculator.firstOperand = calculator.displayValue;
            calculator.displayValue = '';
            calculator.waitingForSecondOperand = false;
        } 

        calculator.displayValue += digitButton.value;
        display.textContent = calculator.displayValue;
        console.log(calculator);
}

function getOperator(event) {
    let operatorButton = event.target.closest('.operator');

    if(!operatorButton) return;

    calculator.operator = operatorButton.value;
    calculator.waitingForSecondOperand = true;
    console.log(calculator);

} 

function evaluateExpression() {
    if (calculator.firstOperand && calculator.displayValue && calculator.operator) {
        calculator.displayValue = parseFloat(operate(calculator.firstOperand, calculator.displayValue, calculator.operator));
        calculator.firstOperand = calculator.displayValue;
        display.textContent = calculator.displayValue;
        console.log(calculator);
    }
}


function handleMultipleOperators() {
    operators.forEach(operator => {
        operator.addEventListener('click', evaluateExpression);
    });
}

function resetCalculator() {
// TODO
}

handleMultipleOperators();
equalBtn.addEventListener('click', evaluateExpression);
container.addEventListener('click', updateDisplay);
container.addEventListener('click', getOperator);
clearBtn.addEventListener('click', resetCalculator);