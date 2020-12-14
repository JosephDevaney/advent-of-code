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

const findWeakness = (data, weakness) => {
  for (let i = 0; i < data.length; i++) {
    let j = i + 1;
    while (true) {
      const cont = data.slice(i, j);
      const sum = cont.reduce((total, num) => total + num, 0);
      if (sum === weakness) {
        return cont.sort();
      } else if (sum > weakness) {
        break;
      }
      j++;
    }
  }
}

const main1 = (data, preambleLength) => {
  return findIncorrect(data, preambleLength);
};

const main2 = (data, preambleLength) => {
  const weakness = findIncorrect(data, preambleLength);
  const weakNessArr = findWeakness(data, weakness);

  return weakNessArr[0] + weakNessArr.slice(-1)[0];
};

console.log(main1(encodedData, 25));
console.log(main2(encodedData, 25));
