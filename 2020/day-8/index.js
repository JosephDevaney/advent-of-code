const fs = require('fs');
const { join } = require('path');

const instructionsData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6',
];

const instructionPattern = /^(jmp|acc|nop)\s([+|-]\d+)$/;

const main1 = (instructions) => {
  let visited = {};
  let accumulator = 0;

  // Rule takes current index and returns the next one
  const rules = {
    acc: (index, val) => {
      accumulator += Number(val);
      return index + 1;
    },
    nop: (index) => index + 1,
    jmp: (index, val) => index + Number(val),
  };

  let i = 0;
  while (!visited[i]) {
    const [, instr, val] = instructions[i].match(instructionPattern);
    visited = { ...visited, [i]: true };

    i = rules[instr](i, val);
  }

  return accumulator;
};

const switchMap = {
  jmp: 'nop',
  nop: 'jmp',
};

const main2 = (instructions) => {
  let visited = {};
  let accumulator = 0;
  const instrStack = [];

  // Rule takes current index and returns the next offset
  const rules = {
    acc: (val) => {
      accumulator += val;
      return 1;
    },
    nop: () => 1,
    jmp: (val) => val,
  };

  let i = 0;
  while (i < instructions.length) {
    if (visited[i]) {
      const { acc, index } = instrStack.shift();
      accumulator = acc;

      const [, instr, val] = instructions[index].match(instructionPattern);

      i = index + rules[switchMap[instr]](Number(val));
    } else {
      const [, instr, val] = instructions[i].match(instructionPattern);
      if (instr !== 'acc') {
        instrStack.push({ index: i, acc: accumulator });
      }
      visited = { ...visited, [i]: true };
      i += rules[instr](Number(val));
    }
  }

  return accumulator;
};

console.log(main1(instructionsData));
console.log(main2(instructionsData));
