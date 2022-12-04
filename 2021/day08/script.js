// Advent Of Code 2021 - Day 8: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/\n/g)
  .map((a) => {
    return a.split("|");
  })
  .filter((b) => b[0].length > 0);

// console.log(input);
let count = 0;

const c = input.length;
for (let i = 0; i < c; i++) {
  const signals = input[i][1].split(" ");
  console.log(signals);
  for (let i = 1; i < 5; i++) {
    const signal = signals[i].replace("\r", "");
    const len = signal.length;
    if (len === 2 || len === 3 || len === 4 || len === 7) {
      // console.log(signals[i])
      count++;
    }
  }
}

// console.log(count)
