const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11',
];

const N = 0;
const E = 90;
const S = 180;
const W = 270;

const compass = { N, E, S, W };


const getAbsAngle = (angle) => {
  return (angle + 360) % 360;
};

const main1 = (data) => {
  let dir = E;

  const counts = data.reduce((acc, action) => {
    const [, cmd, numStr] = action.match(/([LRFNWES])(\d+)/);

    const num = Number(numStr);

    if (cmd === 'F') {
      return { ...acc, [dir]: acc[dir] + num };
    } else if (cmd === 'R') {
      dir = getAbsAngle(dir + num);
    } else if (cmd === 'L') {
      dir = getAbsAngle(dir - num);
    } else {
      return { ...acc, [compass[cmd]]: acc[compass[cmd]] + num };
    }
    return acc;

  }, { [N]: 0, [E]: 0, [S]: 0, [W]: 0 });

  const x = Math.abs(counts[N] - counts[S]);
  const y = Math.abs(counts[E] - counts[W]);

  return x + y;
};


const lookup = {
  N: 'NS',
  E: 'EW',
  S: 'NS',
  W: 'EW',
}
const reverseLookup = { // TODO: throw up!
  [N]: 'N',
  [E]: 'E',
  [S]: 'S',
  [W]: 'W',
};

const main2 = (data) => {
  let waypoint = [E, [10, 1]];

  const counts = data.reduce((acc, action) => {
    const [, cmd, numStr] = action.match(/([LRFNWES])(\d+)/);

    const num = Number(numStr);
    const [dir, vector] = waypoint;

    if (cmd === 'F') {
      const otherDir = getAbsAngle(dir - 90);
      return {
        ...acc,
        [dir]: acc[dir] + (num * vector[0]),
        [otherDir]: acc[otherDir] + (num * vector[1]),
      };
    } else if (cmd === 'R') {
      waypoint = [getAbsAngle(dir + num), vector];
    } else if (cmd === 'L') {
      waypoint = [getAbsAngle(dir - num), vector];
    } else {
      if (lookup[cmd].includes(reverseLookup[dir])) {
        if (compass[cmd] === dir) {
          waypoint = [dir, [vector[0] + num, vector[1]]];
        } else {
          waypoint = [dir, [vector[0] - num, vector[1]]];
        }
      } else {
        if (getAbsAngle(dir - 90) === compass[cmd]) {
          waypoint = [dir, [vector[0], vector[1] + num]];
        } else {
          waypoint = [dir, [vector[0], vector[1] - num]];
        }
      }
    }
    return acc;

  }, { [N]: 0, [E]: 0, [S]: 0, [W]: 0 });

  const x = Math.abs(counts[S] - counts[N]);
  const y = Math.abs(counts[W] - counts[E]);

  console.log(counts, waypoint);
  return x + y;
};

console.log(main1(inputData));
console.log(main2(inputData));
