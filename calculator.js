let num1;
let num2;
let operator;
let num1Holder = [];
let count = 0;
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
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

function display() {
  let buttonClicked = false;
  const buttons = document.querySelectorAll(".num");
  const display = document.querySelector(".display");
  const operatorButtons = document.querySelectorAll(".operator");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let element = e.target;
      num1Holder.push(element.textContent);
      let num1HolderNoCommas = num1Holder.join("");
      display.textContent = num1HolderNoCommas;

      if (!buttonClicked) {
        num1 = parseInt(num1HolderNoCommas);
      } else {
        num2 = parseInt(num1HolderNoCommas);
      }
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      count++;
      buttonClicked = true;
      num1Holder = [];
      display.textContent = "";
      operator = e.target.textContent;
      console.log(count);

      if (count >= 2) {
        console.log("working");
        if (operator === "+") {
          num1 = num1 + num2;
        } else if (operator === "-") {
          num1 = num1 - num2;
        } else if (operator === "/") {
          num1 = num1 / num2;
        } else if (operator === "*") {
          num1 = num1 * num2;
        }
        display.textContent = num1;
        operator = "";
      }
    });
  });
}

display();

const equalSign = document.querySelector(".equals");
equalSign.addEventListener("click", () => {
  let answer = operate(num1, num2, operator);

  const display = document.querySelector(".display");
  display.textContent = answer;
});
