import { toggleFunc, toggleTrigno } from "./ui.js";

let expr = "";
const scr_exp = document.getElementById("screenExpression");
const scr_out = document.getElementById("screenOutput");
let isEvalutaed = false;



function initSetUp() {
  const trigno = document.getElementById("trignoFun");
  const func = document.getElementById("fun-options");
  document.getElementById("toggleTrigno").addEventListener("click", toggleTrigno);
  document.getElementById("toggleFunc").addEventListener("click", toggleFunc);

  trigno.style.display = "none";
  func.style.display = "none";
}



function backspace() {
    if(isEvalutaed) return;
  expr=expr.slice(0,-1);
  scr_exp.value = expr;
}


function evaluate() {
  if (!expr) return;
  try{
  let result = String(eval(expr));
  scr_out.value =result;
  expr = result;
  isEvalutaed = true;
  }
  catch(e)
  {
    alert("Error occur ",e);
  }
}

// utils
function isNumber(value) {
  return /^[0-9.]$/.test(value);
}
function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

function Delete() {
  scr_exp.value = "";
  expr = "";
  scr_out.value = "";
  isEvalutaed = false;
}



//event handler section start
document.addEventListener("DOMContentLoaded", initSetUp);

document.getElementById("button-area").addEventListener("click", function (e) {
     const btn=e.target.closest("button");
     if(!btn) return;
    // console.log("clicked:",btn.value);
 if (isNumber(btn.value) || isOperator(btn.value)) {
    e.preventDefault();
    handleEvent(btn.value);
    return;
} 

  if(!expr) return;
  
  if (btn.value == "Delete") {
    
    Delete();
  } else if (btn.value == "Enter") {
    evaluate();
  } else if (btn.value == "Backspace") {
    backspace();
  }
  
});


document.addEventListener("keydown", function (e) {
  if (isNumber(e.key) || isOperator(e.key)) {
    e.preventDefault();
    handleEvent(e.key);
    return;
} 

  if(!expr) return;
  
  if (e.key == "Delete") {
    
    Delete();
  } else if (e.key == "Enter") {
    evaluate();
  } else if (e.key == "Backspace") {
    backspace();
  }
  
});
//event handler end

//actual logic
//=================================================================================================
function handleEvent(value) {
//   console.log(value);

  if (isEvalutaed) 
    {
        console.log("come after eval");
        if (value == ".") {
            //reset screen and add "0." to the screen
            console.log("here checking ...")
            expr ="0";
            scr_out.value = "";
            expr += value;
            scr_exp.value = expr;
        }
        else if (isNumber(value)) {
            //reset input screen if number after evalution
            // console.log("inside number",value);
            expr = value;
            scr_out.value = "";
            scr_exp.value = expr;
        } 
        else if (isOperator(value)) {
            //append operator to previous output 
            expr = scr_out.value;
            scr_out.value = "";
            expr += value;
            scr_exp.value = expr;
        } 

        isEvalutaed = false;

    } 
  
  else 
    {
        //not evaluted stat
        if (value == ".")
         {
            if(!expr){
                expr ="0.";
                scr_exp.value = expr;
                return;
            } 
            else{
            let input = expr.split(/[\+\-\*\/]/);
            let curr_value = input[input.length - 1];
            if (curr_value.includes(".")) return
            
            
            }
        }
        if(!expr && isOperator(value)) return;

        //if operator check before appending that last was operator or not
        let earray=expr.split("");
       
        if(isOperator(earray[earray.length - 1]) && isOperator(value))
        {
        //    handle this case >>  "1+"  (append new operator * ) -> "1 + * " ,it handle this "1 +" (click  *)   so now -> " 1 * "  
            earray.pop();
            // console.log("poped");
            expr=earray.join("");

        }
//common logic
        

        expr += value;
        scr_exp.value = expr;
    }
}


