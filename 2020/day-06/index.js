const fs = require('fs');
const { join } = require('path');

const customsGroupAnswers = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n\n');

const calcGroupCounts = (group) => {
  return new Set(group.replace('\n', '').match(/[a-z]/g)).size
};

const calcGroupConsensus = (group) => {
  const groupArr = group.split('\n');
  const groupCountsObj = groupArr
    .reduce((arr, person = '') => arr.concat(Array.from(person)), [])
    .reduce((counts, ans) => ({ ...counts, [ans]: counts[ans] ? counts[ans] + 1 : 1 }), {});

  return Object.values(groupCountsObj)
    .filter((count) => count === groupArr.length)
    .length;
};

const main1 = () => {
  return customsGroupAnswers.reduce((count, group) => count + calcGroupCounts(group), 0);
};

const main2 = () => {
  return customsGroupAnswers.reduce((count, group) => count + calcGroupConsensus(group), 0);
};

console.log(main1());
console.log(main2());
