let num1;
let num2;
let operator;
let num1Holder = [];
let count = 0;
let buttonClicked = false;
let resultDisplayed = false;

const display = document.querySelector(".display");
const operatorButtons = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".num");
const dotButton = document.querySelector(".dot");

function add(num1, num2) {
  return Math.round(num1 + num2);
}

function subtract(num1, num2) {
  return Math.round(num1 - num2);
}

function multiply(num1, num2) {
  return Math.round(num1 * num2 * 100) / 100;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return (display.textContent = "Divide by 0? What are you in kindergarten?");
  }
  return Math.round((num1 / num2) * 100) / 100;
}

function operate(num1, num2, operator) {
  if (operator === "/") {
    return divide(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "+") {
    return add(num1, num2);
  }
}

function displayScreen() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let element = e.target.textContent;

      if (resultDisplayed) {
        num1Holder = [];
        num1 = null;
        num2 = null;
        operator = null;
        count = 0;
        buttonClicked = false;
        resultDisplayed = false;
      }

      if (element === "←") {
        num1Holder.pop();
        console.log(num1Holder);
        display.textContent = num1Holder.join("");
        return;
      }

      if (element === ".") {
        dotButton.disabled = true;
      }

      num1Holder.push(element);

      let num1HolderNoCommas = num1Holder.join("");
      display.textContent = num1HolderNoCommas;

      if (!buttonClicked) {
        num1 = parseFloat(num1HolderNoCommas);
      } else {
        num2 = parseFloat(num1HolderNoCommas);
      }
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      dotButton.disabled = false;
      if (num1 === undefined) return;

      if (buttonClicked && num2 !== undefined) {
        num1 = operate(num1, num2, operator);
        display.textContent = num1;
        num2 = undefined;
      }

      buttonClicked = true;
      num1Holder = [];
      operator = e.target.textContent;
    });
  });
}

function clear() {
  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    num1 = 0;
    num2 = 0;
    operator = "";
    buttonClicked = false;
    num1Holder = [];
    count = 0;
    display.textContent = "";
    dotButton.disabled = false;
  });
}

function evaluate() {
  const equalSign = document.querySelector(".equals");
  equalSign.addEventListener("click", () => {
    if (num1 !== undefined && num2 !== undefined && operator) {
      let answer = operate(num1, num2, operator);
      display.textContent = answer;
      num1 = answer;
      num2 = undefined;
      operator = undefined;
      buttonClicked = false;
      num1Holder = [];
      resultDisplayed = true;
      dotButton.disabled = false;
    }
  });
}

displayScreen();
clear();
evaluate();
