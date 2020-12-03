const fs = require('fs');
const { join } = require('path');

const X_OFFSET = 3;
const TREE = '#';
const OPEN = '.';

const main1 = () => {
  const data = fs.readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .trimEnd()
    .split('\n');

  return data.slice(0.10).reduce((count, line, index) => {
    const indexToCheck = (index * X_OFFSET) % (line.length);
    if (line[indexToCheck] === TREE) return count + 1;

    return count;
  }, 0);
};

console.log(main1());

