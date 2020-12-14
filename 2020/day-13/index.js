const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  939,
  '7,13,x,x,59,x,31,19',
];

const formatdata = ([target, buses]) => {
  const x = buses.split(',').filter((b) => b !== 'x').map(Number);

  console.log({ x, buses });
  return [Number(target), x];
};

const calculateBusTimes = (target, buses) => {
  console.log(buses);
  return buses.reduce((acc, bus) => {
    let i = 0;

    while (bus * i <= target) {
      i++;
    }
    return {...acc, [bus]: bus * i };
  }, {});
}

const main1 = (data) => {
  const [target, buses] = formatdata(data);

  const timetable = calculateBusTimes(target, buses);

  console.log(timetable);

  const [nextBus, nextTime] = Object.entries(timetable)
    .sort(([,timeA], [,timeB]) => timeA - timeB)
    .find(([, nextTime]) => nextTime >= target);

  const wait = nextTime - target;

  return wait * nextBus;

}

const main2 = (data = [67,7,59,61]) => {
  let t = 0;
  let factors = 1;
  let prevBus = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i] === 'x') continue;
    let j = 0;
    factors = factors * prevBus;
    while((t + factors * j + i) % data[i] !== 0) {
      j++;
    }
    console.log(prevBus * j);
    const x = t + factors * j;
    t = x;
    prevBus = data[i];
  }
  return t;
}

console.log(main1(inputData))
console.log(main2(inputData[1].split(',').map(b => {
  if (b !== 'x') {
    return Number(b);
  } else {
    return b;
  }
})))

// 335 + 1, (336 * 23) 7728 + 1, (7729 * 17) 131393 + 1,
// console.log((131393 * i) / 67, i);

// 335, 18760 (+ 2), 206360 ( +3)

let i = 1;
while ( (335 + (469 * i) + 2) % 59 !== 0) {
  i++;
}
console.log(i);

i = 1;
while ( (6901 + (27671 * i) + 3) % 61 !== 0) {
  i++;
}

console.log(i);

// for (let i = 1; i < 200; i++) {
//
//   console.log(67 * i , 7 * i);
// }

// while (true) {
//   if (7 * i , 13 * i + 1, 59 * i + 4, 31 * i + 6, 19 * i + 7) {
//
//   }
// }

// 77, 168, 259, 350

// 67 * 7 === 469
// 335 + (469 * i) -> i = 14
// 6901 + (469 * 59)
// 6901 + (27671 * i)


