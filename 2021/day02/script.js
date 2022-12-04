// Advent Of Code 2021 - Day 2: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)]/g)
  .map((a) => a.split(" "));

console.log(input);

let x = 0;
let y = 0;

input.forEach((b) => {
  if (b[0] === "forward") {
    x += parseInt(b[1]);
  } else if (b[0] === "down") {
    y += parseInt(b[1]);
  } else {
    y -= parseInt(b[1]);
  }
});

console.log(x * y);
