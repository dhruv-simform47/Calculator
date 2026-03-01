import { toggleFunc, toggleTrigno } from "./ui.js";
import { isNumber,isOperator } from "./utils.js";
import { Calculator } from "./model.js";
import { createHistory } from "./history.js";


const scr_exp = document.getElementById("screenExpression");
const scr_out = document.getElementById("screenOutput");
const history=createHistory();


const calc=new Calculator();

function initSetUp() {
  const trigno = document.getElementById("trignoFun");
  const func = document.getElementById("fun-options");
  document.getElementById("toggleTrigno").addEventListener("click", toggleTrigno);
  document.getElementById("toggleFunc").addEventListener("click", toggleFunc);

  trigno.style.display = "none";
  func.style.display = "none";
}







//event handler section start
document.addEventListener("DOMContentLoaded", initSetUp);

// web click  
document.getElementById("button-area").addEventListener("click", function (e) {

  const btn = e.target.closest("button");
  if (!btn) return;

  const value = btn.value;
    // console.log("clicked:",btn.value);
  if (isNumber(value) || isOperator(value) || value === ".") {
    calc.handleInput(value);
    scr_exp.value = calc.expression;
    scr_out.value=calc.result;
    return;
  }

  if (value === "Enter") {
    scr_out.value=calc.evaluate();
    history.add(scr_exp.value + "=" + calc.result);

  } else if (value === "Delete") {
    calc.clear();
    scr_exp.value = "";
    scr_out.value = "";
  } else if (value === "Backspace") {
    calc.backspace();
    scr_exp.value = calc.expression;
  }
});

//for pc keyboard
 document.addEventListener("keydown", function (e) {

  const key = e.key;

  // Numbers, operators, decimal
  if (isNumber(key) || isOperator(key) || key === ".") {
    e.preventDefault();
    calc.handleInput(key);
    scr_exp.value = calc.expression;
    scr_out.value=calc.result;
    return;
  }

  // Evaluate
  if (key === "Enter") {
    e.preventDefault();
    scr_out.value=calc.evaluate();
    history.add(scr_exp.value + "=" + calc.result);
    return;
  }

  // Backspace
  if (key === "Backspace") {
    e.preventDefault();
    calc.backspace();
    scr_exp.value = calc.expression;
    return;
  }

  // Clear
  if (key === "Delete") {
    e.preventDefault();
    calc.clear();
    scr_exp.value = "";
    scr_out.value = "";
    return;
  }

});
//event handler end

