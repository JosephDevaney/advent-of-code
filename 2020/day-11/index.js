const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

const FLOOR = '.';
const EMPTY = 'L';
const OCCUPIED = '#';

const calcAdjacentEmpty = (data, row, col) => {
  const numRows = data.length;
  const numCols = data[0].length;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0){
        continue;
      }
      if (row + i >= numRows || row + i < 0) break;
      if (col + j >= numCols || col + j < 0) continue;

      if (data[row + i][col + j] === OCCUPIED) {
        return false;
      }
    }
  }

  return true;
};


const calcIsSeatComfy = (data, row, col) => {
  let count = 0;
  const numRows = data.length;
  const numCols = data[0].length;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0){
        continue;
      }
      if (row + i >= numRows || row + i < 0) break;
      if (col + j >= numCols || col + j < 0) continue;

      if (data[row + i][col + j] === OCCUPIED) {
        count += 1;
      }
    }
  }

  return count < 4;
};

const changeSeat = (data, row, col) => {
  const pos = data[row][col];
  if (pos === FLOOR) {
    return pos;
  } else if (pos === EMPTY) {
    if (calcAdjacentEmpty(data, row, col)) {
      return OCCUPIED;
    } else {
      return EMPTY;
    }
  } else if (pos === OCCUPIED) {
    if (calcIsSeatComfy(data, row, col)) {
      return OCCUPIED; // no change
    } else {
      return EMPTY;
    }
  } else {
    throw new Error(`Shit joe, it happened: ${pos}, ${row}, ${col}`);
  }
};

const calcState = (data) => {
  return data.map((row, rowIdx) => row.map((col, colIdx) => changeSeat(data, rowIdx, colIdx)));
}

const stringify = (s) => s.map(r => r.join('')).join('');
const compareStates = (s1, s2) => {
  if (stringify(s1) === stringify(s2)) {
    return true;
  }
  return false;
}

const countSeats = (s) => {
  return stringify(s).match(/#/g).length;
}

const main1 = (data) => {
  let state = [...calcState(data)];
  let prevState;

  do {
    prevState = [...state];
    state = [...calcState(state)];
  } while(!compareStates(state, prevState));

  return countSeats(state);
};

const main2 = () => {

};


console.log(main1(inputData.map((row) => row.split(''))));
// console.log(main1(testData.map((row) => row.split(''))));
console.log(main2(inputData));





const printData = (data) => {
  console.log(data.map((row) => row.join('')));
};

const getAdjacent = (data, row, col) => {
  const numRows = data.length;
  const numCols = data[0].length;
  const startRow = Math.max(0, row - 1);
  const endRow = Math.min(numRows, row + 1);
  const startCol = Math.max(0, col - 1);
  const endCol = Math.min(numCols, col + 1);

  const x = data.slice(startRow, endRow + 1).map(r => r.slice(startCol, endCol + 1).join('')).join('\n');

  return x;

};
