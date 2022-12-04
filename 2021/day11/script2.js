// Advent Of Code 2021 - Day 11: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => {
    return a.trim().split("").map((d) => parseInt(d));
  });

let count = 0;

// exactly same as Part 1
const checkNeighbors = (i, j) => {
  input[i][j] = 0;
  count++;
  const neighbors = [
    { i: i - 1, j: j - 1 },
    { i: i - 1, j: j },
    { i: i - 1, j: j + 1 },
    { i: i, j: j - 1 },
    { i: i, j: j + 1 },
    { i: i + 1, j: j - 1 },
    { i: i + 1, j: j },
    { i: i + 1, j: j + 1 },
  ]
  for (let k = 0; k < neighbors.length; k++) {
    const a = neighbors[k];
    if (!input[a.i]?.[a.j]) continue;
    let octopus = input[a.i][a.j]
    if (octopus === 0) continue;
    input[a.i][a.j]++;
    if (octopus > 8) {
      checkNeighbors(a.i, a.j);
    } 
  }
}

// lines 41 to 56 are ALMOST same as Part 1
const c = input[0].length;
for (let step = 1;; step++) { // no longer need to loop a specific number of times
  count = 0; // new for part 2. Reset counter to 0 after each step 
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < c; j++) {
      input[i][j] = input[i][j] + 1;
    }
  }

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < c; j++) {
      if (input[i][j] > 9) {
        checkNeighbors(i, j);
      }
    }
  }

  // if count is 100, that means all dumbo octopuses flashed during this step!
  // so I just need to log the current step
  if (count === 100) {
    console.log(step)
    break;
  }
}