// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
let input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g).map(a => a.split(""))

// console.log(input);
// [
//   [
//     'v', '.', '.', '.',
//     '>', '>', '.', 'v',
//     'v', '>'
//   ],
//   [
//     '.', 'v', 'v', '>',
//     '>', '.', 'v', 'v',
//     '.', '.'
//   ],
//   [
//     '>', '>', '.', '>',
//     'v', '>', '.', '.',
//     '.', 'v'
//   ],
//   (... 6 more items)
// ]

const c = input.length;
const d = input[0].length;
let newInput = [];

const moveEast = (j, k) => {
  if (k + 1 === d) {
    if (input[j][0] === ".") {
      newInput[j][0] = ">";
      newInput[j][k] = "."
      moved++;
    }
  } else {
    if (input[j][k+1] === ".") {
      newInput[j][k+1] = ">";
      newInput[j][k] = ".";
      moved++;
    }
  }
}

const moveSouth = (j, k) => {
  if (j + 1 === c) {
    if (input[0][k] === ".") {
      newInput[0][k] = "v";
      newInput[j][k] = ".";
      moved++;
    }
  } else {
    if (input[j+1][k] === ".") {
      newInput[j+1][k] = "v";
      newInput[j][k] = ".";
      moved++;
    }
  }
}

let step = 0;
let moved = 0;

for (let i = 0; i < 70000; i++) {
  console.log(input.map(a => a.join("")))
  newInput = JSON.parse(JSON.stringify(input));
  moved = 0;
  for (let j = 0; j < c; j++) {
    for (let k = 0; k < d; k++) {
      if (input[j][k] === ">") {
        moveEast(j, k);
      }
    }
  }
  input = JSON.parse(JSON.stringify(newInput));
  for (let j = 0; j < c; j++) {
    for (let k = 0; k < d; k++) {
      if (input[j][k] === "v") {
        moveSouth(j, k);
      }
    }
  }
  step++;
  if (moved === 0) {
    console.log(`STEP: ${step}`);
    break;
  }
  input = JSON.parse(JSON.stringify(newInput));
}


