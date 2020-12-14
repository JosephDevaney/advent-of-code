const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0',
];

const CMD_PATTERN = /^mem\[(\d+)] = (\d+)/;

const getMaskLookup = (mask) => {
  let lookup = {};
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') continue;
    lookup = { ...lookup, [mask.length - i - 1]: mask[i] };
  }

  return lookup;
}

const replaceAt = (str, idx, char) => {
  const start = str.slice(0, str.length - idx - 1);
  return `${start}${char}${str.slice(str.length - idx)}`;
}

const main1 = (data) => {
  let mask;
  const memory = data.reduce((acc, cmd) => {
    if (cmd.startsWith('mask')) {
      ([, mask] = cmd.split(' = '));
    } else {
      const [, memAddr, value] = cmd.match(CMD_PATTERN);

      let updatedBinStr = (value >>> 0).toString(2).padStart(mask.length, '0');
      Object.entries(getMaskLookup(mask)).forEach(([bit, maskVal]) => {
        updatedBinStr = replaceAt(updatedBinStr, bit, maskVal);
      })

      return { ...acc, [memAddr]: updatedBinStr };

    }
    return acc;
  }, {});

  return Object.values(memory).reduce((count, val) => {
    return count + Number(`0b${val}`);
  }, 0);
};

console.log(main1(inputData));
