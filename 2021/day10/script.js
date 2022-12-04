// Advent Of Code 2021 - Day 10: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/\n/g);

input.forEach(function (a, i) {
  while (this[i].match(/(\(\))|(\[\])|(\{\})|(<>)/g)?.length > 0) {
    this[i] = this[i].replace(/(\(\))|(\[\])|(\{\})|(<>)/g, "");
  }
}, input);

const illegal = {
  ")": 0,
  "]": 0,
  "}": 0,
  ">": 0,
};

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const a = input[i][j];
    const b = input[i][j - 1];
    if (a === ")" || a === "]" || a === "}" || a === ">") {
      if (b === "(" || b === "[" || b === "{" || b === "<") {
        illegal[a] = illegal[a] + 1;
      }
    }
  }
}

const answer =
  illegal[")"] * 3 +
  illegal["]"] * 57 +
  illegal["}"] * 1197 +
  illegal[">"] * 25137;

console.log(answer);
