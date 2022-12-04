// Advent Of Code 2021 - Day 11: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => {
    return a.split("").map(Number);
  });

// console.log(input)
// [
//   [
//     4, 7, 8, 1, 6, 2, 3, 8, 8, 8
//   ],
//   [
//     1, 7, 8, 4, 1, 5, 6, 1, 1, 4
//   ],
//   (... 8 more items)
// ]

let count = 0; // initialize a counter to track # of flashes

const checkNeighbors = (i, j) => {
  input[i][j] = 0; // set the octopus who flashed to 0
  count++; // increment counter because an octopus flashed
  const neighbors = [
    { i: i - 1, j: j - 1 },
    { i: i - 1, j: j },
    { i: i - 1, j: j + 1 },
    { i: i, j: j - 1 },
    { i: i, j: j + 1 },
    { i: i + 1, j: j - 1 },
    { i: i + 1, j: j },
    { i: i + 1, j: j + 1 },
  ];
  for (let k = 0; k < neighbors.length; k++) {
    // loop through all neighbors
    const a = neighbors[k]; // for convenience
    if (!input[a.i]?.[a.j]) continue; // neighbor doesn't exist
    let octopus = input[a.i][a.j]; // for convenience
    input[a.i][a.j]++; // this octopus won't flash yet, so just increment it
    if (octopus > 8) {
      // this octopus will flash, so check its neighbors
      checkNeighbors(a.i, a.j);
    }
  }
};

const c = input[0].length;
for (let step = 0; step < 100; step++) {
  // loop 100 times
  for (let i = 0; i < c; i++) {
    // loop through input array
    for (let j = 0; j < c; j++) {
      // loop through nested arrays
      input[i][j] = input[i][j] + 1; // increment each dumbo octopus' counter
    }
  }

  for (let i = 0; i < c; i++) {
    // loop through input array again
    for (let j = 0; j < c; j++) {
      // loop through nested array again
      if (input[i][j] > 9) {
        // if a counter is above 9, it's going to flash
        checkNeighbors(i, j); // increment neighbors and check if they will flash, too
      }
    }
  }
}

console.log(count);
