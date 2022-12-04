// Advent Of Code 2021 - Day 9: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split("\n");

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

const basins = []; // store the size of each basin found
let basinArr = []; // will temporarily keep a list of indeces inside current basin

const checkNeighbors = (i, j) => {
  if (!input[i]?.[j]) return;
  if (basinArr.includes(`i${i}j${j}`)) return;
  if (input[i][j] == 9) return;
  basinArr.push(`i${i}j${j}`);
  const num = parseInt(input[i][j]);
  const up = parseInt(input[i - 1]?.[j]);
  const down = parseInt(input[i + 1]?.[j]);
  const left = parseInt(input[i][j - 1]);
  const right = parseInt(input[i][j + 1]);
  if (up < 9) {
    checkNeighbors(i - 1, j);
  }
  if (down < 9) {
    checkNeighbors(i + 1, j);
  }
  if (left < 9) {
    checkNeighbors(i, j - 1);
  }
  if (right < 9) {
    checkNeighbors(i, j + 1);
  }
};

// loop through the outer elements
for (let i = 0; i < c; i++) {
  // loop through the numbers in each string
  for (let j = 0; j < d; j++) {
    basinArr = [];
    const num = parseInt(input[i][j]);
    const up = parseInt(input[i - 1]?.[j]);
    const down = parseInt(input[i + 1]?.[j]);
    const left = parseInt(input[i][j - 1]);
    const right = parseInt(input[i][j + 1]);
    if (num >= up) continue;
    if (num >= down) continue;
    if (num >= left) continue;
    if (num >= right) continue;

    // add the current location to basinArr
    // basinArr.push(`i${i}j${j}`);

    // check the neighboring locations
    checkNeighbors(i, j);
    // checkNeighbors(i + 1, j);
    // checkNeighbors(i, j - 1);
    // checkNeighbors(i, j + 1);
    // console.log(basinArr)
    basins.push(basinArr.length);
  }
}

basins.sort((a, b) => b - a);
// console.log(basins);

basins.forEach((a) => console.log(a));
// console.log(basins);
console.log(`ANSWER: ${basins[0] * basins[1] * basins[2]}`);
