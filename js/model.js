
import { isNumber, isOperator } from "./utils.js";


export class Calculator {
  constructor() {
    this.expression = "";
    this.result = "";
    this.isEvaluated = false;
  }

  append(value) {
    this.expression += value;
  }

  backspace() {
    if (this.isEvaluated) return;
    this.expression = this.expression.slice(0, -1);
  }
  clear() {
    this.expression = "";
    this.result = "";
    this.isEvaluated = false;
  }

  evaluate() {
    if (!this.expression) return;

    try {
      this.result = String(eval(this.expression));
      this.expression = this.result;
      this.isEvaluated = true;

      return this.result;
    } catch {
      this.clear();
      return "Error";
    }
  }

  applyFunction(name) {

    if (!this.expression) return;

    try {
      let value = Number(this.expression);
      let result;
      console.log("Applying function:", name, "to value:", value);

      switch (name) {
        case "sqrt":
          if (value < 0) throw new Error("InvalidInput");
          result = Math.sqrt(value);
          this.expression = `sqrt(${value})`;
          break;

        case "sin":
          result = Math.sin(value * Math.PI / 180);
          this.expression = `sin(${value})`;

          break;

        case "cos":
          result = Math.cos(value * Math.PI / 180);
          this.expression = `cos(${value})`;
          break;

        case "tan":
          result = Math.tan(value * Math.PI / 180);
          this.expression = `tan(${value})`;

          break;

        case "log":
          if (value <= 0) throw new Error("InvalidInput");
          result = Math.log10(value);
          this.expression = `log10(${value})`;

          break;

        case "ln":
          if (value <= 0) throw new Error("InvalidInput");
          result = Math.log(value);
          this.expression = `log(${value})`;

          break;

        case "abs":
          result = Math.abs(value);
          this.expression = `abs(${value})`;
          break;

      }

      this.result = String(result);
      this.isEvaluated = true;
      this.error = null;

    } catch (err) {
      console.log("Error applying function:", err.message);
      this.error = { type: err.message };
      this.result = "Error";
    }
  }


  handleInput(value) {

   
    if (this.isEvaluated) {

      if (isNumber(value)) {
        this.expression = value;
      }
      else if (isOperator(value)) {
        this.expression = this.expression + value;
      }
      else if (value === ".") {
        this.expression = "0.";
      }

      this.isEvaluated = false;
      this.result = "";

      return;
    }

    //prevent start with operator "+ 2"
    if (!this.expression && isOperator(value)) return;

    //decimal handling
    if (value === ".") {

      // Empty expression → 0.
      if (!this.expression) {
        this.append("0.");

        return;
      }

      const lastChar = this.expression.slice(-1);

      // After operator → 0.
      if (isOperator(lastChar)) {
        this.append("0.");

        return;
      }

      // Prevent double decimal in same number
      const parts = this.expression.split(/[\+\-\*\/]/);
      const current = parts[parts.length - 1];
      if (current.includes(".")) return;
    }


    // prevent double operator
    const lastChar = this.expression.slice(-1);
    if (isOperator(lastChar) && isOperator(value)) {
      this.expression = this.expression.slice(0, -1);
    }

    //append values

    this.append(value);

  }
}