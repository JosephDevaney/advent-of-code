const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  '1 + 2 * 3 + 4 * 5 + 6',
  '1 + (2 * 3) + (4 * (5 + 6))',
  '2 * 3 + (4 * 5)',
  '5 + (8 * 3 + 9 + 3 * 4 * 3)',
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
];

const maths = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const findBrackets = (expr) => {
  let indexes = [];
  let openCount = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(' && openCount === 0) {
      indexes.push(i);
      openCount++;
    } else if (expr[i] === '(') {
      openCount++;
    } else if (expr[i] === ')') {
      if (openCount === 1) {
        indexes.push(i);
      }
      openCount--;
    }
  }

  return indexes.reduce((groups, parenInd, idx, arr) => {
    if (idx % 2 === 0) {
      return [...groups, [parenInd, arr[idx + 1]]];
    }
    return groups;
  }, []);
};

const calculate = (expr, precedence = a => a) => {
  const groups = findBrackets(expr);

  const evaluatedGroups = groups.map(([start, end]) => {
    return calculate(expr.slice(start + 1, end), precedence);
  });

  const substrParts = groups.reduce((parts, nestedInd, i, arr) => {
    return parts.concat(nestedInd[0], nestedInd[1] + 1);
  }, [0]).concat(undefined);

  let exprParts = [];
  for (let i = 0; i < substrParts.length; i += 2) {
    const partStr = expr
      .substring(substrParts[i], substrParts[i + 1])
    exprParts.push(partStr);

    if (evaluatedGroups[i / 2]) {
      exprParts.push(evaluatedGroups[i / 2]);
    }
  }
  const partiallyEvaluatedExpr = exprParts
    .filter(a => a !== '')
    .join('');

  const [start, ...ops] = precedence(partiallyEvaluatedExpr)
    .split(/([+|\*]+\s\d+)/)
    .map(a => a.trim())
    .filter(a => a);

  return ops.reduce((result, op) => {
    const [, math, num] = op.match(/([+|\*])\s(\d+)/);
    return maths[math](result, Number(num))
  }, Number(start));
}

const main1 = (data) => {
  return data
    .map((expr) => calculate(expr))
    .reduce((total, num) => total + num, 0);
};

const ADDITION_EXPR_PATTERN = /(\d+)\s\+\s(\d+)/;
const addPrecedence = (expr) => {
  let addition;
  let precedence = expr;

  while (addition = precedence.match(ADDITION_EXPR_PATTERN)) {
    const [, a, b] = addition;
    precedence = precedence.replace(ADDITION_EXPR_PATTERN, `${Number(a) + Number(b)}`)
  }

  return precedence;
}

const main2 = (data) => {
  return data
    .map((expr) => calculate(expr, addPrecedence))
    .reduce((total, num) => total + num, 0);
};

console.log(main1(inputData));
console.log(main2(inputData));
