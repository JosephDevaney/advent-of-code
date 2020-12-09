const fs = require('fs');
const { join } = require('path');

const encodedData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n')
  .map(Number);

const testData = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];

const validate = (preamble, val) => {
  for (let i = 0; i < preamble.length - 1; i++) {
    for (let j = i + 1; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === val) {
        return true;
      }
    }
  }
  return false;
};

const findIncorrect = (data, preambleLength) => {
  let i = 0;
  while (true) {
    const preamble = data.slice(i, preambleLength + i);
    const val = data[preambleLength + i];

    if (!validate(preamble, val)) {
      return val;
    }
    i++;
  }
}

const main1 = (data, preambleLength) => {
  console.log(data.slice(0, preambleLength));

  return findIncorrect(data, preambleLength);
};

const main2 = () => {
};

console.log(main1(encodedData, 25));
console.log(main2());
