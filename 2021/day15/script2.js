// Advent Of Code 2021 - Day 15: Part 2
const fs = require("fs");
const { performance } = require("perf_hooks");

const start = performance.now();

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("")) // maybe not necessary
  .map((a) => a.map(Number));

const c = input.length; // save the length of the original array

// add the necessary rows to my input array
for (let i = 0; i < c * 4; i++) {
  input.push([]);
}

// extend the initial input horizontally
for (let i = 0; i < c; i++) {
  for (let j = 0; j < c; j++) {
    input[i][c + j] = input[i][j] + 1; // add one to the #'s in the grid next to the original
    input[i][c * 2 + j] = input[i][j] + 2; // add 2 to the #'s in the next grid
    input[i][c * 3 + j] = input[i][j] + 3; // add 3 to the #'s in the next one
    input[i][c * 4 + j] = input[i][j] + 4; // etc.
  }
}

// save the new length of the array. Will be used many times
const d = input.length;

// extend the initial input vertically
for (let i = 0; i < c; i++) {
  // loop through the original number of rows
  for (let j = 0; j < d; j++) {
    // loop through the new number of columns
    input[c + i][j] = input[i][j] + 1; // add 1 to the #'s in the grids below the original
    input[c * 2 + i][j] = input[i][j] + 2; // add 2 to the next
    input[c * 3 + i][j] = input[i][j] + 3; // etc.
    input[c * 4 + i][j] = input[i][j] + 4; // etc.
  }
}

// now a lot of my numbers will be 11, 12, 13, etc. gotta bring them back down to below 10
for (let i = 0; i < d; i++) {
  // loop through entire new array
  for (let j = 0; j < d; j++) {
    // loop through sub-array
    if (input[i][j] > 9) {
      // if any number is greater than 9, subtract 9 from it
      input[i][j] = input[i][j] - 9;
    }
  }
}

let total = 999999;

const bestPathRisk = [];

for (let i = 0; i < d; i++) {
  bestPathRisk.push([]);
  for (let j = 0; j < d; j++) {
    bestPathRisk[i][j] = 999999;
  }
}

const checkNeighbors = (i, j, count) => {
  // if (!bestPathRisk[i]) bestPathRisk[i] = [];
  // if (!bestPathRisk[i][j]) {
  //   bestPathRisk[i][j] = 99999999999999;
  // }
  if (i > 0 && j > 0 && i > j * 5) return; // limit my range a little. started this at j * 2, but had to adjust
  if (i > 0 && j > 0 && j > i * 5) return; // " "
  if (i === d - 1 && j === d - 1) {
    if (count < total) {
      total = count;
      console.log(total); // this is where my final answer will print
      // because of the setTimeouts, I can't print it at the end of my code
      // or it will run before the rest of my code finishes
      const end = performance.now();
      console.log(`${(end - start) / 1000} seconds`);
    }
    return;
  }
  if (count < bestPathRisk[i][j]) {
    bestPathRisk[i][j] = count;
  } else return;
  if (input[i][j + 1] > 0) {
    setTimeout(() => {
      // added setTimeouts so the parent functions could complete.
      // Previously, I was getting "Maximum Call Stack Exceeded"
      // I assume it's because I kept calling my function repeatedly without any
      // instances ever closing. setTimeout will allow them to finish.
      checkNeighbors(i, j + 1, count + input[i][j + 1]);
    }, 0);
  }
  if (input[i + 1]?.[j] > 0) {
    setTimeout(() => {
      checkNeighbors(i + 1, j, count + input[i + 1][j]);
    }, 0);
  }
  if (input[i - 1]?.[j] > 0) {
    setTimeout(() => {
      checkNeighbors(i - 1, j, count + input[i - 1][j]);
    }, 0);
  }
  if (input[i][j - 1] > 0) {
    setTimeout(() => {
      checkNeighbors(i, j - 1, count + input[i][j - 1]);
    }, 0);
  }
};

checkNeighbors(0, 0, 0);

// This code took a long time to run...  ~9.5 minutes
// before it logged anything at all.
// But at least all of the setTimeouts helped me avoid
// the "Maximum Call Stack Exceeded" errors I was getting before.
