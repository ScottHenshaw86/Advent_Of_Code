const { PerformanceObserver, performance } = require("perf_hooks");
const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .filter((el) => el !== "");

function findBus(arr) {
  arr.shift();
  let buses = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != "x") {
      buses.push(i);
    }
  }

  let i = parseInt(arr[buses[0]]);
  let counter = parseInt(arr[buses[0]]);
  let j = 1;
  while (true) {
    if ((i + buses[j]) % parseInt(arr[buses[j]]) === 0) {
      counter *= arr[buses[j]];
      j++;
    }
    if (j === buses.length) {
      return i;
    }
    i += counter;
  }
}

const t0 = performance.now();
console.log("ANSWER: ", findBus(text));
const t1 = performance.now();
console.log(`FindBus took ${t1 - t0} milliseconds.`);
