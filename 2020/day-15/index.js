const TARGET = 2020;

const main1 = (data, target) => {
  let memory = {};
  let lastSpoken = null;

  for (let i = 0; i < target; i++) {
    if (i < data.length) {
      lastSpoken = data[i];
      const { [lastSpoken]: spoken = [] } = memory;
      memory = { ...memory, [lastSpoken]: [...spoken, i] };

      console.log(i, data[i]);
      // lastSpoken = 0;
      continue;
    }

    const { [lastSpoken]: spoken = [] } = memory;
    // console.log(lastSpoken, memory, i);

    let say;
    if (spoken.length > 1) {
      const [prevTime, lastTime] = spoken.slice(-2);
      // console.log(i, lastSpoken, lastTime, spoken);
      say = lastTime - prevTime;
    } else {
      say = 0;
    }

    const { [say]: sayMem = [] } = memory;

    // console.log(lastSpoken, memory, spoken, i);
    memory = { ...memory, [say]: [...sayMem, i] };
    lastSpoken = say;

    // console.log(memory);
  }

  return lastSpoken;
}

const testData = [0, 3, 6];
const inputData = [12,20,0,6,1,17,7]

// console.log(main1([2,1,3], 30000000));
console.log(main1(inputData, TARGET));
// console.log(main1(inputData, 30000000));
