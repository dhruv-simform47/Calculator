import { renderhistory, toggleFunc, toggleTrigno } from "./ui.js";
import { isNumber, isOperator } from "./utils.js";
import { Calculator } from "./model.js";
import { createHistory } from "./history.js";

let history;
const expressionDisplay = document.getElementById("screenExpression");
const resultDisplay = document.getElementById("screenOutput");
const mathFunctions = [
  "sqrt",
  "sin",
  "cos",
  "tan",
  "log",
  "ln",
  "floor",
  "ceil",
  "abs",
];
const calc = new Calculator();

function initSetUp() {
  const trigno = document.getElementById("trignoFun");
  const func = document.getElementById("funOptions");
  document
    .getElementById("toggleTrigno")
    .addEventListener("click", toggleTrigno);
  document.getElementById("toggleFunc").addEventListener("click", toggleFunc);
  document.getElementById("btnTheme").addEventListener("click", toggleTheme);
  trigno.style.display = "none";
  func.style.display = "none";
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    document.getElementById("btnTheme").innerHTML = "Dark";
  } else {
    document.getElementById("btnTheme").innerHTML = "Light";
  }
}


function handleControlKeys(value) {
  switch (value) {
    case "Enter":
      if (!calc.expression) return true;
      resultDisplay.value = calc.evaluate();
      history.add(expressionDisplay.value + "=" + calc.result);
      renderhistory(history);
      return true;

    case "Delete":
      calc.clear();
      expressionDisplay.value = "";
      resultDisplay.value = "";
      return true;

    case "Backspace":
      calc.backspace();
      expressionDisplay.value = calc.expression;
      return true;

    default:
      return false;
  }
}

function handleFactorial(value) {
  if (value === "!") {
    let num = calc.evaluate();
    calc.result = calc.factorialRecursive(num);
    calc.expression += "!";
    expressionDisplay.value = calc.expression;
    resultDisplay.value = calc.result;

    history.add("" + expressionDisplay.value + "=" + calc.result);
    renderhistory(history);
    return true;
  }
  return false;
}

function handleMathFunctions(value) {
  if (mathFunctions.includes(value)) {
    calc.applyFunction(value);
    expressionDisplay.value = calc.expression;
    resultDisplay.value = calc.result;

    history.add("" + expressionDisplay.value + "=" + calc.result);
    renderhistory(history);
    return true;
  }
  return false;
}

function handleMemoryKeys(value) {
  switch (value) {
    case "m+":
      calc.memoryAdd();
      expressionDisplay.value = calc.expression;
      return true;

    case "m-":
      calc.memorySub();
      expressionDisplay.value = calc.expression;
      return true;

    case "mr":
      expressionDisplay.value = calc.memoryRec();
      return true;

    case "ms":
      calc.memorySave();
      expressionDisplay.value = calc.expression;
      return true;

    case "mc":
      calc.memoryClr();
      expressionDisplay.value = calc.expression;
      return true;

    default:
      return false;
  }
}

function handleSpecialKeys(value) {
  switch (value) {

    case "f-e":
      calc.toggleScientificNotation();
      expressionDisplay.value = calc.expression;
      return true;

    case "exp":
      calc.append("2.71**");
      expressionDisplay.value = calc.expression;
      return true;

    case "+/-":
      if (calc.expression[0] == "-") {
        calc.expression = calc.expression.slice(1);
      } else {
        calc.expression = "-" + calc.expression;
      }
      expressionDisplay.value = calc.expression;
      return true;

    case "1/x":
      calc.expression = "1/(" + calc.expression + ")";
      expressionDisplay.value = calc.expression;
      return true;

    case "rand":
      let randNum = Math.random().toFixed(2);
      calc.append(randNum);
      expressionDisplay.value = calc.expression;
      return true;

    case "pi":
      calc.append(String(Math.PI.toFixed(2)));
      expressionDisplay.value = calc.expression;
      return true;

    case "^":
      calc.append("**");
      expressionDisplay.value = calc.expression;
      return true;

    case "e":
      calc.append(String(Math.E.toFixed(3)));
      expressionDisplay.value = calc.expression;
      return true;

    case "(":
    case ")":
      calc.expression += value;
      expressionDisplay.value = calc.expression;
      return true;

    case "^2":
      calc.expression += "**2";
      expressionDisplay.value = calc.expression;
      return true;

    default:
      return false;
  }
}

function handleEvent(value) {

  if (handleControlKeys(value)) return;
  if (handleFactorial(value)) return;
  if (handleMathFunctions(value)) return;
  if (handleMemoryKeys(value)) return;
  if (handleSpecialKeys(value)) return;

  if (calc.expression.slice(-1) === ")") {
    calc.expression += "*";
    expressionDisplay.value += "*";
  }

  if (isNumber(value) || isOperator(value) || value === ".") {
    calc.handleInput(value);
    expressionDisplay.value = calc.expression;
    resultDisplay.value = calc.result;
  }
}

//event handler section start

document.addEventListener("DOMContentLoaded", function () {
  initSetUp();
  history = createHistory();
  renderhistory(history);
});

document.getElementById("clearHistory").addEventListener("click", function () {
  history.clear();
});
// web click
document.getElementById("buttonArea").addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  const value = btn.value;
  handleEvent(value);
});

//for pc keyboard
document.addEventListener("keydown", function (e) {
  const key = e.key;
  handleEvent(key);
});

//event handler end
