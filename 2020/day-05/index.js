const fs = require('fs');
const { join } = require('path');

const boardingPasses = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const convertBinaryStrToNum = (bin) => Number(`0b${bin}`);

const calcRowNumber = (row) => convertBinaryStrToNum(row.replace(/F/g, '0').replace(/B/g, '1'));
const calcColNumber = (col) => convertBinaryStrToNum(col.replace(/L/g, '0').replace(/R/g, '1'));

const calculateSeatId = (seat) => {
  return calcRowNumber(seat.slice(0, 7)) * 8 + calcColNumber(seat.slice(7));
}

const main1 = () => {
  return boardingPasses.reduce((highest, boardingPass) => {
    const seatId = calculateSeatId(boardingPass);
    return seatId > highest ? seatId : highest;
  }, 0);
};

const main2 = () => {
  return boardingPasses
    .map(calculateSeatId)
    .sort((a, b) => a - b)
    .find((curSeatId, index, seatList) => {
      return seatList[index + 1] === curSeatId + 2;
    }) + 1;
};

console.log(main1());
console.log(main2());
