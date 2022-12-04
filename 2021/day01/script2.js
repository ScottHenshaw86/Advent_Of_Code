// Advent Of Code 2021 - Day 1: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)(,)]/g)
  .map(Number);

let count = 0;

input.forEach((n, i) => {
  if (
    n + input[i - 1] + input[i - 2] >
    input[i - 1] + input[i - 2] + input[i - 3]
  )
    count++;
});

console.log(count);
