// Advent Of Code 2021 - Day 7: Part 2
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(',')
  .map(Number);

  const sorted = input.sort((a,b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

let least = 99999999; // will save the lowest sum found

const c = sorted.length;
for (let i=min; i<max; i++) {
  let count = 0; // the sum of fuel used to get to position i
  for (let j=0; j<c; j++) {
    const steps = Math.abs(i - sorted[j]); // the number of steps the crab has to take
    for (let i=1; i<steps + 1; i++) {
      count+= i;
    }
  }
  least = count < least ? count : least;
}

console.log(least);
