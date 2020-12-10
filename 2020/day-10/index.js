const fs = require('fs');
const { join } = require('path');

const deviceVolts = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n')
  .map(Number);

const testData = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

const MAX_DIFF = 3;


const main1 = (data) => {
  const voltDiffs = data
    .sort((a, b) => a - b)
    .reduce((acc, volt, index, arr) => {
      const diff = volt - (arr[index - 1] || 0);
      const { [diff]: count = 0 } = acc;

      return { ...acc, [diff]: count + 1 };
    }, {});

  return voltDiffs[1] * (voltDiffs[3] + 1); // Device is 3 larger than largest
};

const main2 = (data) => {
};

console.log(main1(deviceVolts));
console.log(main2(testData));
