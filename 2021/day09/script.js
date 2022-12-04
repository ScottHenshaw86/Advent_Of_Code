// Advent Of Code 2021 - Day 9: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample.txt", "latin1").split(/\r\n/g);

// console.log(input);
// [
//   '2199943210',
//   '3987894921',
//   '9856789892',
//   '8767896789',
//   '9899965678'
// ];

const c = input.length;
const d = input[0].length;

let count = 0;

// loop through the outer elements
for (let i = 0; i < c; i++) {
  // loop through the numbers in each string
  for (let j = 0; j < d; j++) {
    const num = parseInt(input[i][j]);
    const up = parseInt(input[i - 1]?.[j]);
    const down = parseInt(input[i + 1]?.[j]);
    const left = parseInt(input[i][j - 1]);
    const right = parseInt(input[i][j + 1]);
    console.log(right);
    if (num >= up) continue;
    if (num >= down) continue;
    if (num >= left) continue;
    if (num >= right) continue;
    count += num + 1; // if it gets here, it means this number is lower than its neighbors, so increment the counter
  }
}

console.log(count);
