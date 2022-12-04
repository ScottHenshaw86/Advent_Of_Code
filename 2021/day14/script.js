// Advent Of Code 2021 - Day 14: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/\n/g);

let polymer = input.shift();
input.shift();
const rulesArr = input.map((a) => a.split(" -> "));
const rules = Object.fromEntries(rulesArr);

const STEPS = 10;
for (let step = 0; step < STEPS; step++) {
  for (let i = 0; i < polymer.length; i++) {
    if (rules[`${polymer[i]}${polymer[i + 1]}`]) {
      polymer =
        polymer.slice(0, i + 1) +
        rules[`${polymer[i]}${polymer[i + 1]}`] +
        polymer.slice(i + 1);
      i++;
    }
  }
}

const letters = [...new Set(Object.values(rules))];

let min = 999999;
let max = 0;

const c = letters.length;
for (let i = 0; i < c; i++) {
  const letterRegex = new RegExp(letters[i], "g");
  const count = polymer.match(letterRegex).length;
  if (count > 0 && count < min) {
    min = count;
  }
  if (count > max) {
    max = count;
  }
}

console.log(max - min);
