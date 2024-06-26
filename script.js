
const numberButtons = document.querySelectorAll(".digit,.dot");
const operationButtons = document.querySelectorAll(
  "#divideby,#times,#plus,#minus"
);
const percentagebutton = document.querySelector("#percentage");
const equalsButton = document.querySelector("#equals");
const moreorless = document.querySelector("#plusoumoins");
const deleteButton = document.querySelector("#clear");
const allClearButton = document.querySelector("#reset");
const previousOperandElement = document.querySelector("#calcul");
const currentOperandElement = document.querySelector("#input");
const form = document.querySelector("form");
const userInput = form.elements["userInput"];

// blocking the pressing of the alphanumeric keys

userInput.addEventListener("input", function() {
  this.value = this.value.match(/[0-9.]*/)[0];
});
form.addEventListener("submit", function(event) {
  event.preventDefault();
});

//class calculator js
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  calculatepercentage() {
    if (this.currentOperand !== "") {
      this.currentOperand = this.currentOperand / 100;
    }
  }
  changessigncurrent() {
    if (this.currentOperand !== "") {
      this.currentOperand = -this.currentOperand;
    }
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandElement.value = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation} ${this.currentOperand}`;
    } else {
      this.previousOperandElement.innerText = "";
    }
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, 0);
  }
}

//Instantiate the calculator
const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
percentagebutton.addEventListener("click", () => {
  calculator.calculatepercentage();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
moreorless.addEventListener("click", () => {
  calculator.changessigncurrent();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", function(event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.key == "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
});
