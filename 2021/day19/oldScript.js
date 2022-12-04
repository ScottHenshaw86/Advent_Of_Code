// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/--- scanner [0-9] ---\n/g)
  .map((a) => a.split("\n"))
  .map((b) => b.filter((d) => d !== ""))
  .map((c) => c.map((d) => d.split(",")));

input.shift();

// console.log(input);
// [
//   [
//     [404, -588, -901],
//     [528, -643, 409],
//   ],
//   [
//     [686, 422, 578],
//     [605, 423, 415],
//   ],
// ];
let totalBeacons = input.reduce((a, b) => a + b.length, 0);

let diffs = [];

const c = input.length;
for (let i = 0; i < c; i++) {
  // loop through input arrays
  diffs.push([]);
  for (let j = 0; j < input[i].length; j++) {
    // loop through beacons
    diffs[i].push([]);
    for (let k = 0; k < input[i].length; k++) {
      // loop through rest of beacons
      if (j === k) continue; // don't need distance from self
      const x = Math.abs(input[i][j][0] - input[i][k][0]);
      const y = Math.abs(input[i][j][1] - input[i][k][1]);
      const z = Math.abs(input[i][j][2] - input[i][k][2]);
      let totalDiff = x * y * z;
      diffs[i][j].push(totalDiff);
    }
  }
}

diffs = diffs.flat();

const d = diffs.length;
console.log(d);
for (let i = 0; i < d; i++) {
  console.log(`i: ${i}`);
  for (let j = i + 1; j < d; j++) {
    let overlaps = 0;
    diffs[i].forEach((a) => {
      if (diffs[j].indexOf(a) > -1) overlaps++;
    });
    if (overlaps > 10) totalBeacons--;
  }
}

console.log(totalBeacons);
