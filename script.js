const container = document.querySelector('#container');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#calc-screen');
const equalBtn = document.querySelector('.equals');



const add = (a, b) => Number(a) + Number(b);
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
        console.log('update display', calculator);
        
}

function getOperator(event) {
    let operatorButton = event.target.closest('.operator');

    if(!operatorButton) return;

    calculator.operator = operatorButton.value;
    calculator.waitingForSecondOperand = true; 
    console.log('get operator', calculator);

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
            console.log('eval expression', calculator);
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

function inputDecimal(event) {
    let decimalBtn = event.target.closest('.decimal');

    if (!decimalBtn) return;

    if (display.textContent.includes('.')) {
        return;
    }

    calculator.displayValue += '.';
    display.textContent = calculator.displayValue;
}

function resetCalculator(event) {
    let clearBtn = event.target.closest('.clear');

    if (!clearBtn) return;

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
container.addEventListener('click', resetCalculator);
container.addEventListener('click', inputDecimal);