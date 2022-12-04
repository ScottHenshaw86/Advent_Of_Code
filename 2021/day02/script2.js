// Advent Of Code 2021 - Day 2: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)]/g)
  .map((a) => a.split(" "));

let x = 0;
let y = 0;
let aim = 0;

input.forEach((b) => {
  if (b[0] === "up") {
    aim -= parseInt(b[1]);
  } else if (b[0] === "down") {
    aim += parseInt(b[1]);
  } else {
    x += parseInt(b[1]);
    y += parseInt(b[1]) * aim;
  }
});

console.log(x * y);
