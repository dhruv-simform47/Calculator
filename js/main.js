import { renderhistory, toggleFunc, toggleTrigno } from "./ui.js";
import { isNumber, isOperator } from "./utils.js";
import { Calculator } from "./model.js";
import { createHistory } from "./history.js";


let history;
const scr_exp = document.getElementById("screenExpression");
const scr_out = document.getElementById("screenOutput");

const calc = new Calculator();

function initSetUp() {
  const trigno = document.getElementById("trignoFun");
  const func = document.getElementById("fun-options");
  document
    .getElementById("toggleTrigno")
    .addEventListener("click", toggleTrigno);
  document.getElementById("toggleFunc").addEventListener("click", toggleFunc);
document.getElementById("btnTheme").addEventListener("click",toggleTheme);
  trigno.style.display = "none";
  func.style.display = "none";
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode"))
    {
    document.getElementById("btnTheme").innerHTML="Dark";
    }
    else
    {
    document.getElementById("btnTheme").innerHTML="Light";
      
    }

}

function handleEvent(value) {
  if (value === "Enter") {
    if (!calc.expression) return;
    scr_out.value = calc.evaluate();

    history.add(scr_exp.value + "=" + calc.result);

    renderhistory(history);
  } else if (value === "Delete") {
    calc.clear();
    scr_exp.value = "";
    scr_out.value = "";
  } else if (value === "Backspace") {
    calc.backspace();
    scr_exp.value = calc.expression;
  }
  if (value === "!") {
    let num = calc.evaluate();
    calc.result = calc.factorialRecursive(num);
    calc.expression += "!";
    scr_exp.value = calc.expression;
    scr_out.value = calc.result;
    history.add("" + scr_exp.value + "=" + calc.result);
    renderhistory(history);
    return;
  }



  if (
    value === "sqrt" ||
    value === "sin" ||
    value === "cos" ||
    value === "tan" ||
    value === "log" ||
    value === "ln" ||
    value === "floor" ||
    value === "ceil" ||
    value === "abs"
  ) {
    calc.applyFunction(value);
    scr_exp.value = calc.expression;
    scr_out.value = calc.result;
    history.add("" + scr_exp.value + "=" + calc.result);
    renderhistory(history);

    return;
  }

  if(value === "m+")
  {
    console.log("m+");
    calc.memoryAdd();
    console.log(calc.memory);

    scr_exp.value=calc.expression;
    return;
  }
  if(value === "m-")
  {
    console.log("m-");
    calc.memorySub();
    console.log(calc.memory);

    scr_exp.value=calc.expression;

    return;
  }

  if(value === "mr")
  {
    console.log("mr");

    scr_exp.value=calc.memoryRec();
    return;
  }
  if(value === "ms")
  {
    console.log("ms");

    calc.memorySave();
    scr_exp.value=calc.expression;

    console.log(calc.memory);
    return;
  }
  if(value === "mc")
  {
    console.log("m+");

    calc.memoryClr();
    console.log(calc.memory);
    scr_exp.value=calc.expression;
    return;
  }
  if(value === "f-e"){
    calc.F_E();
    scr_exp.value=calc.expression;
    return;
  }
  if (calc.expression.slice(-1) === ")") {
    calc.expression += "*";
    scr_exp.value += "*";
  }

  if (value === "exp") {
    calc.append("2.71**");
    scr_exp.value = calc.expression;
    return;
  }
  if (value === "+/-") {
    if (calc.expression[0] == "-") {
      calc.expression = calc.expression.slice(1);
    } else {
      calc.expression = "-" + calc.expression;
    }
    scr_exp.value = calc.expression;
    return;
  }
  if (value === "1/x") {
    calc.expression = "1/(" + calc.expression + ")";
    scr_exp.value = calc.expression;
    return;
  }

  if (value === "rand") {
    let randNum = Math.random().toFixed(2);
    calc.append(randNum);
    scr_exp.value = calc.expression;
    return;
  }

  if (value === "pi") {
    console.log("after exp");

    calc.append(String(Math.PI.toFixed(2)));
    scr_exp.value = calc.expression;
    return;
  }

  if (value === "^") {
    calc.append("**");
    scr_exp.value = calc.expression;
    return;
  }
  if (value === "e") {
    calc.append(String(Math.E.toFixed(3)));
    scr_exp.value = calc.expression;
    return;
  }

  if (value === "(") {
    calc.expression += value;
    scr_exp.value = calc.expression;
    return;
  }

  if (value === ")") {
    calc.expression += value;
    scr_exp.value = calc.expression;
    console.log("( INSIDE");
    return;
  }

  if (value == "^2") {
    calc.expression += "**2";
    scr_exp.value = calc.expression;
    return;
  }

  if (isNumber(value) || isOperator(value) || value === ".") {
    calc.handleInput(value);
    scr_exp.value = calc.expression;
    scr_out.value = calc.result;
    return;
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
document.getElementById("button-area").addEventListener("click", function (e) {
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
