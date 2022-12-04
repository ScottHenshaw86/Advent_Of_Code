// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample1.txt", "latin1")
  .split("\n")
  .map((a) =>
    a.split(/[, ]/g).map((b) => {
      let c = b.replace(/[xyz]=/g, "");
      if (c.includes("..")) c = c.split("..").map(Number);
      return c;
    })
  );

input.splice(1); // only use first 20 elements for part 1
// console.log(input);
// [
//   [ 'on', [ '10', '12' ], [ '10', '12' ], [ '10', '12' ] ],
//   [ 'on', [ '11', '13' ], [ '11', '13' ], [ '11', '13' ] ],
//   [ 'off', [ '9', '11' ], [ '9', '11' ], [ '9', '11' ] ],
//   [ 'on', [ '10', '10' ], [ '10', '10' ], [ '10', '10' ] ]
// ]

// const grid = [
//   [
//     ["x0y0z0", "x0y0z1", "x0y0z2"],
//     ["x0y1z0", "x0y1z1", "x0y1z2"],
//     ["x0y2z0", "x0y2z1", "x0y2z2"],
//   ],
//   [
//     ["x1y0z0", "x1y0z1", "x1y0z2"],
//     ["x1y1z0", "x1y1z1", "x1y1z2"],
//     ["x1y2z0", "x1y2z1", "x1y2z2"],
//   ],
//   [
//     ["x2y0z0", "x2y0z1", "x2y0z2"],
//     ["x2y1z0", "x2y1z1", "x2y1z2"],
//     ["x2y2z0", "x2y2z1", "x2y2z2"],
//   ],
// ];

const grid = [];

const initialize = (cuboid) => {
  const action = cuboid[0];
  const x1 = cuboid[1][0] + 50; // add 50 to get rid of negatives
  const x2 = cuboid[1][1] + 50; // by shifting everything 50 in all directions
  const y1 = cuboid[2][0] + 50;
  const y2 = cuboid[2][1] + 50;
  const z1 = cuboid[3][0] + 50;
  const z2 = cuboid[3][1] + 50;
  // console.log(
  //   `action: ${action}, x1: ${x1}, x2: ${x2}, y1: ${y1}, y2: ${y2}, z1: ${z1}, z2: ${z2}`
  // );
  for (let i = x1; i < x2 + 1; i++) {
    if (!grid[i]) grid[i] = [];
    for (let j = y1; j < y2 + 1; j++) {
      if (!grid[i][j]) grid[i][j] = [];
      for (let k = z1; k < z2 + 1; k++) {
        grid[i][j][k] = action === "on" ? "O" : "X";
      }
    }
  }
};

const c = input.length;
for (let i = 0; i < c; i++) {
  initialize(input[i]);
}

let count = 0;
//count elements turned ON
for (let i = 0; i < 100 + 1; i++) {
  for (let j = 0; j < 100 + 1; j++) {
    for (let k = 0; k < 100 + 1; k++) {
      if (grid[i]?.[j]?.[k] === "O") count++;
    }
  }
}

// console.log(grid);
console.log(count);
