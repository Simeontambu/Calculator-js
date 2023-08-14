import { calculate } from './calculator.js';

// TODO: Faire la manipulation du DOM dans ce fichier

// selection of all buttons and operations of our calculator
const currentOperand = document.querySelector("#input");
const previousOperand = document.querySelector('#calcul')
const buttons = document.querySelectorAll('.digit');
const operationButtons = document.querySelectorAll('#divideby, #times')
const reset = document.querySelector('#reset')
const clear = document.querySelector('#clear')
const equals = document.querySelector('#equals')

// display of button values
buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    previousOperand.insertAdjacentHTML('beforeend', button.textContent)
    currentOperand.value = button.textContent
  })
})
operationButtons.forEach((arithmeticbuttons)=>{
    arithmeticbuttons.addEventListener('click', ()=>{
        console.log(arithmeticbuttons)
    })
})



