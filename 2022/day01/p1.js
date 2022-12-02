// Advent Of Code 2022 - Day 1: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split("\n") // split on the newlines
  .map(Number); // this converts every entry into a number

const t0 = performance.now();// start a timer. just to see how long it takes to run

let highestSum = 0;
let currentSum = 0;
input.forEach(calories => {
    if (!calories) {
        if (currentSum > highestSum) {
            highestSum = currentSum;
        }
        currentSum = 0;
    } else {
        currentSum += calories;
    }
})

console.log(`Highest Sum: ${highestSum}`)
const t1 = performance.now(); // stop the timer
console.log(`Algo took ${(t1 - t0).toFixed(2)} milliseconds.`);