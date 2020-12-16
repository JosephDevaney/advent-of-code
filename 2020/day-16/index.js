const fs = require('fs');
const { join } = require('path');

const inputData = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'class: 1-3 or 5-7',
  'row: 6-11 or 33-44',
  'seat: 13-40 or 45-50',
  '',
  'your ticket:',
  '7,1,14',
  '',
  'nearby tickets:',
  '7,3,47',
  '40,4,50',
  '55,2,20',
  '38,6,12',
];

const getDataGroups = (data) => {
  let curGroup = 'rules';

  return data.filter((line) => !!line).reduce((groups, line) => {
    if (line === 'your ticket:') {
      curGroup = 'myTicket';
    } else if (line === 'nearby tickets:') {
      curGroup = 'tickets';
    } else {
      return { ...groups, [curGroup]: [...groups[curGroup], line] };
    }
    return groups;
  }, { rules: [], myTicket: [], tickets: [] });
};

const RULE_PATTERN =  /.*:\s(\d*-\d*)\sor\s(\d*-\d*)/;
const buildRulesRanges = (rules) => {
  return rules.reduce((acc, rule) => {
    const [, r1, r2] = rule.match(RULE_PATTERN);
    return [...acc, r1.split('-').map(Number), r2.split('-').map(Number)];
  }, []);
};

const checkRangeInc = (x, min, max) => {
  return min <= x && x <= max;
};

const main1 = ({ rules, tickets }) => {
  const rulesValues = buildRulesRanges(rules);

  return tickets.reduce((ticketErrorRate, ticket) => {
    const invalidFields = ticket
      .split(',')
      .map(Number)
      .filter((field) => rulesValues.every(([min, max]) => !checkRangeInc(field, min, max)));

    return invalidFields.reduce((count, f) => count + f, ticketErrorRate);
  }, 0);

};

console.log(main1(getDataGroups(inputData)));
