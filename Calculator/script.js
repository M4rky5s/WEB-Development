let firstNumber = '';
let secondNumber = '';
let operator = '';

const buttons = document.querySelectorAll("button");
const output = document.getElementById('output');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');

function add(a, b){
    return a + b;
}
function substract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function operate(numberOne, numberTwo, operator){
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);

    switch(operator){
        case '+':
            return add(numberOne, numberTwo);
        case '-':
            return substract(numberOne, numberTwo);
        case '×':
            return multiply(numberOne, numberTwo);
        case '÷':
            return divide(numberOne, numberTwo);
        default: return '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        output.innerHTML += value;
        
        if(['+', '-', '×', '÷'].includes(value)){
            operator = value;
        } else if(value !== '='){
            if(!operator){
                firstNumber += value;
                console.log("value" + value);
                console.log("Num1: " + firstNumber);
            } else{
                secondNumber += value;
                console.log("value" + value);
                console.log("Num2: " + secondNumber);
            }
        } else if(value === "="){
            let result = operate(firstNumber, secondNumber, operator);
            output.innerHTML = result;
            firstNumber = result;
            secondNumber = "";
            operator = '';
            console.log(operate(firstNumber, secondNumber, operator));
        }
        if(value == "CLEAR"){
            firstNumber = "";
            secondNumber = "";
            output.innerHTML = "";
            console.log(value);
        }
        if(value === "←"){
            let current = output.textContent;
            current = current.substring(0, current.length - 2);
            output.textContent = current;
            if(operator == ''){
                firstNumber = firstNumber.slice(0, -1);
            } else {
                secondNumber = secondNumber.slice(0, -1);
            }
        }
    })
});