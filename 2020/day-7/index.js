const fs = require('fs');
const { join } = require('path');

const data = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n');

const testData = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.',
];

const MY_BAG = 'shiny gold';

const rulePattern = /(?<count>\d*)\s?(?<color>[a-zA-Z\s]*) bag(s?)/;

const parseRule = (rule) => {
  const [outer, inner] = rule.split(' contain ');

  // console.log(inner);
  // console.log(outer);
  const { groups: outerBag } = rulePattern.exec(outer);
  const innerBags = inner.split(',').map((bag) => rulePattern.exec(bag).groups);

  return { innerBags, outerBag };
};

const buildOuterBagLookup = (rules) => {
  return rules.reduce((ruleMap, { innerBags, outerBag }) => {
    const x = innerBags.reduce((acc, { color }) => {
      const { [color]: outerBags = [] } = ruleMap;
      return { ...acc, [color]: [...outerBags, outerBag.color] };
    }, {});

    return { ...ruleMap, ...x };
  }, {});
};

const countOuterBags = (starterBag = MY_BAG, lookup) => {
  let bagsToCheck = [starterBag];

  let bags = new Set();

  while (bagsToCheck.length) {
    const bag = bagsToCheck.shift();
    if (bag !== starterBag) {
      bags.add(bag);
    }

    const { [bag]: outerBags = [] } = lookup;
    bagsToCheck.push(...outerBags);
  }

  return bags.size;
};

const main1 = () => {
  const lookup = buildOuterBagLookup(data.map(parseRule));

  return countOuterBags(MY_BAG, lookup);
};

const main2 = () => {
  // return parseRule('dotted black bags contain no other bags.');
};

console.log(main1());
console.log(main2());
