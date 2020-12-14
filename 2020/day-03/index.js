const fs = require('fs');
const { join } = require('path');

const TREE = '#';

const testData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
]

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
]

const data = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const countTrees = ({ right, down, forest = data }) => forest.reduce((count, line, index) => {
  if (index % down === 0) {
    const indexToCheck = (index / down * right) % (line.length);
    if (line[indexToCheck] === TREE) {
      return count + 1;
    }
  }

  return count;
}, 0);

const main1 = () => {
  return countTrees({ right: 3, down: 1});
};

const main2 = () => {
  return slopes.reduce((total, slope) => total * countTrees(slope), 1);
};

console.log(main1());
console.log(main2());

// console.log(countTrees({ right: 1, down: 1, forest: testData }));
// console.log(countTrees({ right: 3, down: 1, forest: testData }));
// console.log(countTrees({ right: 5, down: 1, forest: testData }));
// console.log(countTrees({ right: 7, down: 1, forest: testData }));
// console.log(countTrees({ right: 1, down: 2, forest: testData }));
