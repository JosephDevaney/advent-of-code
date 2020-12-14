const fs = require('fs');
const { join } = require('path');

const noop = (a) => a;

const main = () => {
  const data = fs.readFileSync(join(__dirname, 'input.txt'))
    .toString()
    .trimEnd()
    .split('\n');

  return data.reduce((count, passwordEntry) => {
    const [range, letter, password] = passwordEntry.replace(':', '').split(/\s/);
    const positions = range.split('-').map(Number);

    const containsValue = positions.map((pos) => password.charAt(pos - 1) === letter);

    if (!containsValue.every(noop) && containsValue.some(noop)) {
      return count + 1;
    }
    return count;

  }, 0);
};

console.log(main());
