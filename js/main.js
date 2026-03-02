import { toggleFunc, toggleTrigno } from "./ui.js";
import { isNumber, isOperator } from "./utils.js";
import { Calculator } from "./model.js";
import { createHistory } from "./history.js";


const scr_exp = document.getElementById("screenExpression");
const scr_out = document.getElementById("screenOutput");
const history = createHistory();


const calc = new Calculator();

function initSetUp() {
  const trigno = document.getElementById("trignoFun");
  const func = document.getElementById("fun-options");
  document.getElementById("toggleTrigno").addEventListener("click", toggleTrigno);
  document.getElementById("toggleFunc").addEventListener("click", toggleFunc);

  trigno.style.display = "none";
  func.style.display = "none";
}




function handleEvent(value) {
  if (value === "sqrt" || value === "sin" || value === "cos" || value === "tan" || value === "log" || value === "ln" || value === "abs") {
    calc.applyFunction(value);
    scr_out.value = calc.result;
    history.add(value + "(" + scr_exp.value + ")=" + calc.result);
    return;
  }
  if (calc.expression.slice(-1) === ")") { calc.expression += "*"; scr_exp.value += "*"; }

  if (value === "exp") {
    calc.append("2.71**");
    scr_exp.value = calc.expression;
    return;
  }

  if (value === "pi") {
    console.log("after exp");

    calc.append(String((Math.PI).toFixed(2)));
    scr_exp.value = calc.expression;
    return;

  }

  if (value === "^") {
    calc.append("**");
    scr_exp.value = calc.expression;
    return;

  } if (value === "e") {
    calc.append(String((Math.E).toFixed(3)));
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

  if (value === "Enter") {
    scr_out.value = calc.evaluate();
    console.log(scr_exp.value);
    history.add(scr_exp.value + "=" + calc.result);

  } else if (value === "Delete") {
    calc.clear();
    scr_exp.value = "";
    scr_out.value = "";
  } else if (value === "Backspace") {
    calc.backspace();
    scr_exp.value = calc.expression;
  }

}


//event handler section start
document.addEventListener("DOMContentLoaded", initSetUp);

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

