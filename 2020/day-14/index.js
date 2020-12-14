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
const getMasAddrLookup = (mask) => {
  let lookup = {};
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0') {
      continue;
    } else {
      const { [mask[i]]: val = [] } = lookup;
      lookup = { ...lookup, [mask[i]]: [...val, i] };
    }
  }

  return lookup;
}

const changeVal = (str, idx, char) => {
  const start = str.slice(0, str.length - idx - 1);
  return `${start}${char}${str.slice(str.length - idx)}`;
};

const replaceAt = (str, idx, char) => {
  const start = str.slice(0, idx);
  return `${start}${char}${str.slice(idx + 1)}`;
};

const main1 = (data) => {
  let mask;
  const memory = data.reduce((acc, cmd) => {
    if (cmd.startsWith('mask')) {
      ([, mask] = cmd.split(' = '));
    } else {
      const [, memAddr, value] = cmd.match(CMD_PATTERN);

      let updatedBinStr = (value >>> 0).toString(2).padStart(mask.length, '0');
      Object.entries(getMaskLookup(mask)).forEach(([bit, maskVal]) => {
        updatedBinStr = changeVal(updatedBinStr, bit, maskVal);
      })

      return { ...acc, [memAddr]: updatedBinStr };

    }
    return acc;
  }, {});

  return Object.values(memory).reduce((count, val) => {
    return count + Number(`0b${val}`);
  }, 0);
};

const main2 = (data) => {
  let mask;
  const memory = data.reduce((acc, cmd) => {
    if (cmd.startsWith('mask')) {
      ([, mask] = cmd.split(' = '));
    } else {
      const [, memAddr, value] = cmd.match(CMD_PATTERN);

      const lookup = getMasAddrLookup(mask);
      let updatedBinStr = (memAddr >>> 0).toString(2).padStart(mask.length, '0');

      (lookup['1'] || []).forEach((i) => {
        updatedBinStr = replaceAt(updatedBinStr, i, '1');
      });

      const map = lookup['X'].reduce((opts, idx) => {
        const x = opts.map((a) => ([
          replaceAt(a, idx, '0'),
          replaceAt(a, idx, '1'),
        ]));

        return x.flatMap(a => a);
      }, [updatedBinStr]);

      return {
        ...acc,
        ...map.reduce((mem, addr) => ({
          ...mem,
          [Number(`0b${addr}`)]: value,
        }), {}),
      };
    }
    return acc;
  }, {});

  return Object.values(memory).reduce((count, val) => {
    return count + Number(val);
  }, 0);
};

const addrTestData = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1',
]

console.log(main1(inputData));
console.log(main2(inputData));
