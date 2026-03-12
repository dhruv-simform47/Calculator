// utils
export function isNumber(value) {
  return /^[0-9]$/.test(value);
}
export function isOperator(value) {
  return ["+", "-", "*", "/","("].includes(value);
}
