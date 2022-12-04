// Advent Of Code 2021 - Day 10: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/\n/g);

input.forEach(function (a, i) {
  while (this[i].match(/(\(\))|(\[\])|(\{\})|(<>)/g)?.length > 0) {
    this[i] = this[i].replace(/(\(\))|(\[\])|(\{\})|(<>)/g, "");
  }
}, input);

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const a = input[i][j];
    const b = input[i][j - 1];
    if (a === ")" || a === "]" || a === "}" || a === ">") {
      if (b === "(" || b === "[" || b === "{" || b === "<") {
        input.splice(i, 1);
        i = i - 1;
        break;
      }
    }
  }
}

const counts = [];

const c = input.length;
for (let i = 0; i < c; i++) {
  let count = 0;
  for (let j = input[i].length - 1; j >= 0; j--) {
    count *= 5;
    const a = input[i][j];
    if (a === "(") count += 1;
    if (a === "[") count += 2;
    if (a === "{") count += 3;
    if (a === "<") count += 4;
  }
  counts.push(count);
}
console.log(counts);

const sortedCounts = counts.sort((a, b) => a - b);
const answer = sortedCounts[(counts.length - 1) / 2];
console.log(answer);

const 𓃰 = "elephant";
const 𓃟 = "pig";
const 𓆡 = "pufferfish?";
const 𓅰 = "duck";
const 𓃸 = "monkey;";
const 𓃹 = "hare";
const 𓃵 = "goat";
const 𓆣 = "scarab";
