//Fetching all the elements that are needed
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = Array.from(document.querySelectorAll('[data-number]'));
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]')
const outputDisplay = document.querySelector('.current')

//Functions for all the features of the calculator
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = ( a, b) => a * b;
let divide = (a, b) => a / b;

function operate(operater, num1, num2) {
    switch (operater){
        case add:
            return add(num1 , num2);
            break;
        case subtract:
            return subtract(num1, num2);
            break;
        case multiply:
            return multiply(num1, num2);
            break;
        case divide:
            return divide(num1, num2);
            break;
        default:
            console.log("Invalid operation")
    }

}
function updateDisplay(number){
    outputDisplay.innerHTML += number;
    console.log(outputDisplay);
}

function allClear(){
    outputDisplay.textContent = '';
    console.log("cleared")
}

allClearButton.addEventListener('click', allClear);
numberButtons.forEach((button) => button.addEventListener('click', () => updateDisplay(button.textContent)));


