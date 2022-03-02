let currentOperation = '';
let previousOperation = '';
let currentNumber = '';
let previousNumber = '';

//Fetching all the elements that are needed
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = Array.from(document.querySelectorAll('[data-number]'));
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');
const currentElement = document.querySelector('[data-current]');
const previousElement = document.querySelector('[data-previous]');

//Functions for all the features of the calculator
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = ( a, b) => a * b;
let divide = (a, b) => a / b;

//this is going to handle the key board inputs
window.addEventListener('keydown', keyboardInput);

//this function takes the operator and the numbers then executes the equation
function operate(operater, num1, num2) {
    switch (operater){
        case '+':
            return add(num1 , num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
        default:
            return;
    }

}
//displays number to the screen
function appendNumber(number){
    if (number === '.' && currentElement.innerHTML.includes('.')) return;
    currentElement.innerHTML += number;
}

//clears both previous element and current element
function allClear(){
    currentElement.textContent = '';
    previousElement.textContent = '';
}

//removes last element in case of mistake
function remove(){
    if (currentElement.textContent == '') return;
    currentElement.textContent = currentElement.textContent.toString().slice(0, -1);
}




allClearButton.addEventListener('click', allClear);

//adds and event listener to all number buttons and update the display to show the number that was clicked
numberButtons.forEach((button) => button.addEventListener('click', () => {
    currentNumber = button.textContent;
    appendNumber(currentNumber);
}));

/*Adds and event listener to each button that stores the operation in a variable */
operationButtons.forEach((button) => button.addEventListener('click', () => {
    if (currentElement.textContent === '') return;
    if (previousElement.textContent === '') {
        currentNumber = currentElement.textContent;
        previousOperation = button.textContent;
        console.log(previousOperation);
        previousNumber = currentElement.textContent;
        currentElement.textContent = '';
        previousElement.textContent = `${previousNumber} ${previousOperation}`;
        console.log(currentNumber);
    } else {
        currentNumber = currentElement.textContent;
        console.log(currentNumber);
        let calculation = operate(previousOperation, parseFloat(previousNumber), parseFloat(currentNumber))
        previousNumber = calculation;
        previousOperation = button.textContent;
        previousElement.textContent = `${calculation} ${previousOperation}`;
        console.log(previousOperation);
        currentElement.textContent = '';
    }

    
    
}))

deleteButton.addEventListener('click', () => {
    remove();
})

equalButton.addEventListener('click', () => {
    if (previousOperation == ''  || currentElement.textContent == '') return;
    currentNumber = currentElement.textContent;
    allClear();
    appendNumber(operate(previousOperation, parseFloat(previousNumber), parseFloat(currentNumber)));
})

function keyboardInput(e){
    if (e.key >= 0 && e.key <= 9){
        currentNumber = e.key;
        appendNumber(currentNumber);
    };
    if (e.key === '.') appendNumber(e.key);
    if (e.key == '=' || e.key === 'Enter') {
        if (previousOperation == '' || currentElement.textContent == '') return;
        currentNumber = currentElement.textContent;
        allClear();
        appendNumber(operate(previousOperation, parseFloat(previousNumber), parseFloat(currentNumber)));
        console.log(previousNumber);
        console.log(currentNumber);
    }
    if (e.key === 'Backspace') remove();
    if (e.key === 'Escape') allClear();
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        if (currentElement.textContent === '') return;
        if (previousElement.textContent === '') {
            previousOperation = e.key;
            console.log(previousOperation);
            previousNumber = currentElement.textContent;
            currentElement.textContent = '';
            previousElement.textContent = `${previousNumber} ${previousOperation}`;
        } else {
            let calculation = operate(previousOperation, parseFloat(previousNumber), parseFloat(currentNumber))
            previousNumber = calculation;
            previousOperation = e.key;
            previousElement.textContent = `${calculation} ${previousOperation}`;
            console.log(previousOperation);
            currentElement.textContent = '';
        }
    }
}

