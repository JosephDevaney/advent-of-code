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

  console.log(voltDiffs);
  return voltDiffs[1] * (voltDiffs[3] + 1); // Device is 3 larger than largest
};

const combMap = {
  5: 7,
  4: 4,
  3: 2,
  2: 1,
  1: 1,
};

// const getPerms = (arr = [1,2,3,4]) => {}

const factorial = (num) => {
  let total = 1;
  for (let i = 0; i < num; i++) {
    total *= (num - i);
  }
  return total;
}

const main2 = (data) => {
  let x = data.concat(0).sort((a, b) => a - b);
  const [max] = x.slice(-1);
  x.push(max + MAX_DIFF);
  console.log(max, JSON.stringify(x));

  let i = 0;
  let combinations = 1;
  while (i < data.length) {
    let index = x.findIndex((volt, idx, arr) => volt >= arr[idx - 1] + MAX_DIFF || volt >= arr[idx - 2] + MAX_DIFF);
    // let index = x.findIndex((volt, idx, arr) => volt >= arr[idx - MAX_DIFF] + 3);
    if (index === -1) {
      console.log(x);
      break;
    }
    const a = factorial(index);
    // console.log(x.slice(0, index), index, a);
    if (a > 1) {
      combinations = combinations * combMap[index];
    }
    x = x.slice(index);

    i += index;
  }
  return combinations;
};

// console.log(main1(deviceVolts));
console.log(main2(testData));
console.log(main2(deviceVolts));
// console.log(main2([0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19]));
console.log(factorial(5));

[0, 1,  2,  3,  4,  7,  8,  9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31, 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49]

// 1 2 3 4 5 8
// 1 2 3 5 8
// 1 2 4 5 8
// 1 3 4 5 8
// 1 2 5 8
// 1 3 5 8
// 1 4 5 8

// { 5: 7, 4: 4, 3: 2 }

// 1 2 3 4 7
// 1 2 4 7
// 1 3 4 7
// 1 4 7

// 4 6 7
// 4 7

// 1 2 3 4 6 7
// 1 2 4 6 7
// 1 3 4 6 7
// 1 2 4 6 7
// 1 3 4 6 7
// 1 3 6 7
// 1 4 6 7
// 1 4 7

// 1 2 3 4 5 6 7
// 1 2 3 4 5 7
// 1 2 3 4 6 7
// 1 2 3 4 7
// 1 2 4 5 6 7
// 1 3 4 5 6 7
// 1 4 5 6 7
// 1 2 4 5 7
// 1 3 4 5 7
// 1 2 4 6 7
// 1 2 4 7
// 1 3 4 7
// 1 4 5 7
// 1 4 6 7
// 1 4 7

// 1 2 3 4 5 6 7
