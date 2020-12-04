const fs = require('fs');
const { join } = require('path');

const REQUIRED_FIELDS = ['byr', 'ecl', 'eyr', 'hcl', 'hgt', 'iyr', 'pid'];

const validateNumber = (value, lower, upper) => {
  const n = Number(value);
  return n >= lower && n <= upper;
}

const measurementsValues = {
  cm: [150, 193],
  in: [59, 73],
};

const validations = {
  byr: (f) => validateNumber(f, 1920, 2002)
  iyr: (f) => validateNumber(f, 2010, 2020),
  eyr: (f) => validateNumber(f, 2020, 2030),
  hcl: (f) => /#[0-9"a-f]{6}/.test(f),
  hgt: (f) => {
    const [, num, measurement] = f.match(/(\d+)(cm|in)/) || [];
    return num && validateNumber(num, ...measurementsValues[measurement]);
  },
  ecl: (f) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(f),
  pid: (f) => /\d{9}/.test(f),
};

const data = fs.readFileSync(join(__dirname, 'input.txt'))
  .toString()
  .trimEnd()
  .split('\n\n');

const passports = data.map(
  (passport) => Object.fromEntries(
    passport
      .split(/\\n|\s/g)
      .map((field) => field.split(':'))
  )
);

const checkPassportFields = (passport = {}) => REQUIRED_FIELDS.every((field) => !!passport[field]);
const validatePassportFields = (passport = {}) => REQUIRED_FIELDS.every((field) => !!passport[field] && validations[field](passport[field]));


const main1 = () => {
  const valid = passports.filter(checkPassportFields);
  return valid.length;
};

const main2 = () => {
  const valid = passports.filter(validatePassportFields);
  return valid.length;
};

console.log(main1());
console.log(main2());
