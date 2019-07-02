const Fraction = require('fractional').Fraction;

// Function to find precedence of operators
const precedence = (op) => { 
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;  
  if (op === '_') return 3;
  return 0;
};

// Function to perform arithmetic operations
const applyOp = (op, a, b, c) => {  
  if (op === '+') return a + b; 
  if (op === '-') return a - b; 
  if (op === '*') return a * b; 
  if (op === '/') return a / b;
  if (op === '_') {
    let res = a;
    if (a < 0) res = res*-1;
    res = res + (b/c);
    return a < 0 ? -1*res : res;
  }
};

// Function that finds a whole integer in string math expression, 
// stores that integer in a collection, and then returns new index 
// of where to continue iteratation over rest of math expression
const findInteger = (values, tokens, index, isNeg) => {
  let val = 0;
  // if negative, skip negative sign to neighboring integer
  if (isNeg) index++;
  // there may be more than one digit in the number
  while (index < tokens.length && !isNaN(parseInt(tokens[index]))) {
    val = (val*10) + parseInt(tokens[index]);
    index++;
  }
  // account for division signs
  index--;
  if (isNeg) val *= -1;
  values.push(val);
  return index;
};

// Function that evaluates part of string math expression
// given a particular target operator
const evaluateByPriority = (operator, index=0, values, ops) => {
  while (index < ops.length) {
    let currentEl = ops[index];

    if (currentEl === operator) {
      let leftOperand = values[index];
      let rightOperand = numerator = values[index+1];
      let denominator = values[index+2];
      // evaluate for highest priority operator ( _ mixed fraction)
      if (precedence(operator) === 3) {
        let result = applyOp(operator, leftOperand, numerator, denominator);
        values.splice(index, 3, result);
        ops.splice(index, 2);
        index--;
      }
      // evaluate for second highest priority operators (/ and *)
      // then evaluate for lowest priority operators (+ and -)
      if (precedence(operator) === 2 || precedence(operator) === 1) {
        let result = applyOp(operator, leftOperand, rightOperand);
        values.splice(index, 2, result);
        ops.splice(index, 1);
        index--;
      }
    }  
    index++;
  }
};

// Function that returns value of expression after evaluation
const evaluate = (tokens) => { 
  if (!tokens) return `You need to enter a math expression for this to work 💩`;
  // stacks to store integer values and operators; init index to 0
  let values = [], ops = [], i = 0;
    
  while (i < tokens.length) {
    let element = tokens[i];
    let isNumber = !isNaN(parseInt(element));
    let isNeg = element === '-' && !isNaN(parseInt(tokens[i+1]));
    // skip whitespace elements
    if (tokens[i] === ' ') { i++; continue; }
    // make up for negative numbers
    if (isNeg) {
      i = findInteger(values, tokens, i, true);
    } else if (isNumber) {
      i = findInteger(values, tokens, i, false);
    } else {
      ops.push(tokens[i]);
    }
    i++;
  }

  evaluateByPriority('_', 0, values, ops);
  evaluateByPriority('/', 0, values, ops);
  evaluateByPriority('*', 0, values, ops);
  evaluateByPriority('+', 0, values, ops);
  evaluateByPriority('-', 0, values, ops);

  let fractionResult = new Fraction(values[0]).toString().replace(/\s/g, '_');

  if (fractionResult.includes('NaN')) {
    return `Oops! Look like you entered the input wrong. Try again!`;
  }
  return fractionResult;
};

module.exports = { evaluate };