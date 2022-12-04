// Advent Of Code 2021 - Day 6: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(",").map(Number);

// console.log(input);
// [ 3, 4, 3, 1, 2 ]

for (let i = 0; i < 80; i++) {
  // loop 80 times
  let c = input.length; // get the length of the array at the start of the current iteration
  for (let j = 0; j < c; j++) {
    // loop through the input array
    if (input[j] > 0) {
      // if a lanternfish has a value > 0, decrement it
      input[j] = input[j] - 1;
    } else {
      // if the lanternfish is at 0, set it to 6 and add a new 8 lanternfish to the end of the array
      input[j] = 6;
      input.push(8);
    }
  }
}

// console.log(input);
console.log(`ANSWER: ${input.length}`);
