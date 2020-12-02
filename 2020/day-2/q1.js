const fs = require('fs');
const { join } = require('path');

const main = () => {
  const data = fs.readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .trimEnd()
    .split('\n');

  return data.reduce((count, passwordEntry) => {
    const [range, letter, password] = passwordEntry.replace(':', '').split(/\s/);
    const [minCount, maxCount] = range.split('-').map(Number);

    const matches = [...password.matchAll(new RegExp(letter, 'g'))];

    if (matches.length >= minCount && matches.length <= maxCount) {
      return count + 1;
    }

    return count;
  }, 0);
};

console.log(main());
