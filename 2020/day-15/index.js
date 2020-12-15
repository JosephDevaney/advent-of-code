const TARGET = 2020;

const main1 = (data, target) => {
  let memory = new Map();
  let lastSpoken = null;

  for (let i = 0; i < target; i++) {
    if (i < data.length) {
      lastSpoken = data[i];
      const spoken = memory.get(lastSpoken) || [];
      memory.set(lastSpoken, [...spoken, i]);

      continue;
    }

    const spoken = memory.get(lastSpoken) || [];

    let say;
    if (spoken.length > 1) {
      const [prevTime, lastTime] = spoken.slice(-2);
      say = lastTime - prevTime;
    } else {
      say = 0;
    }

    const sayMem = memory.get(say) || [];

    memory.set(say, [...sayMem.slice(-1), i]);
    lastSpoken = say;
  }

  return lastSpoken;
}

const testData = [0, 3, 6];
const inputData = [12,20,0,6,1,17,7]

console.log(main1(inputData, TARGET));
console.log(main1(inputData, 30000000));
