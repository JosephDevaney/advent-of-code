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
const testDataP2 = [
  'class: 0-1 or 4-19',
  'row: 0-5 or 8-19',
  'seat: 0-13 or 16-19',
  '',
  'your ticket:',
  '11,12,13',
  '',
  'nearby tickets:',
  '3,9,18',
  '15,1,5',
  '5,14,9',
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

const RULE_PATTERN =  /(.*):\s(\d*-\d*)\sor\s(\d*-\d*)/;
const buildRulesRanges = (rules) => {
  return rules.reduce((acc, rule) => {
    const [, name, r1, r2] = rule.match(RULE_PATTERN);

    return {
      ...acc,
      [name]: [r1.split('-').map(Number), r2.split('-').map(Number)],
    };
  }, []);
};

const checkRangeInc = (x, min, max) => {
  return min <= x && x <= max;
};

const main1 = ({ rules, tickets }) => {
  const rulesValues = Object.values(buildRulesRanges(rules)).flatMap(a => a);

  return tickets
    .map((ticket) => {
      return ticket
        .split(',')
        .map(Number);
    })
    .reduce((ticketErrorRate, ticket) => {
    const invalidFields = ticket
      .filter((field) => rulesValues.every(([min, max]) => !checkRangeInc(field, min, max)));

    return invalidFields.reduce((count, f) => count + f, ticketErrorRate);
  }, 0);

};

const main2 = ({ rules, myTicket, tickets }) => {
  const rulesObj = buildRulesRanges(rules);
  const rulesValues = Object.values(rulesObj).flatMap(a => a);
  const myTicketArr = myTicket[0].split(',').map(Number);

  const possibleRules = tickets
    .map((ticket) => ticket
      .split(',')
      .map(Number)
    )
    .filter((ticket) => {
      return ticket
        .every((field) => rulesValues.some(([min, max]) => checkRangeInc(field, min, max)));
    })
    .reduce((acc, ticket) => {
      let update = [...acc];

      ticket.forEach((field, idx) => {
        const fieldAcc = acc[idx] || [];
        update[idx] = [...fieldAcc, field];
      });
      return update;

    }, [])
    .map((fields) => {
      return Object.entries(rulesObj)
        .filter(([, rule]) => fields.every((field) => rule.some(([min, max]) => checkRangeInc(field, min, max))))
        .map(([name]) => name);
    });

  let deDupedRules = [...possibleRules];
  for (let i = 0; i < deDupedRules.length; i++) {
    const x = possibleRules.findIndex((pr) => pr.length === i + 1);

    deDupedRules = deDupedRules.map((pr, prInd) => {
      if (prInd === x) {
        return pr;
      } else {
        return pr.filter((rule) => deDupedRules[x][0] !== rule);
      }
    })

  }

  return deDupedRules
    .flatMap(a => a)
    .reduce((mult, rule, idx) => {
      if (rule.startsWith('departure')) {
        return mult * myTicketArr[idx];
      }
      return mult;
    }, 1);
};

console.log(main1(getDataGroups(inputData)));
console.log(main2(getDataGroups(inputData)));
