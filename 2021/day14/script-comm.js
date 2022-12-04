// Advent Of Code 2021 - Day 14: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/\n/g);

let polymer = input.shift();
input.shift();
const rulesArr = input.map((a) => a.split(" -> "));

// const template = NNCB

// const rulesArr = [
//   [ 'CH', 'B' ], [ 'HH', 'N' ],
//   [ 'CB', 'H' ], [ 'NH', 'C' ],
//   [ 'HB', 'C' ], [ 'HC', 'B' ],
//   [ 'HN', 'C' ], [ 'NN', 'C' ],
//   [ 'BH', 'H' ], [ 'NC', 'B' ],
//   [ 'NB', 'B' ], [ 'BN', 'B' ],
//   [ 'BB', 'N' ], [ 'BC', 'B' ],
//   [ 'CC', 'N' ], [ 'CN', 'C' ]
// ]

const rules = Object.fromEntries(rulesArr);
// console.log(rules)
// {
//   CH: 'B',
//   HH: 'N',
//   CB: 'H',
//   NH: 'C',
//   (... more items)
// }

// console.log(rules);

const STEPS = 10; // 10 steps for Part 1;

for (let step = 0; step < STEPS; step++) {
  // loop 10 times
  for (let i = 0; i < polymer.length; i++) {
    // loop through each element in my polymer
    if (rules[`${polymer[i]}${polymer[i + 1]}`]) {
      // check the current element and the next element
      polymer = // insert the new element in-between
        polymer.slice(0, i + 1) +
        rules[`${polymer[i]}${polymer[i + 1]}`] +
        polymer.slice(i + 1);
      i++; // an item has been added, so need to increment the counter again in order to skip the new elements
    }
  }
}

// now my polymer is complete, I just need to count how many of each letter there are

const letters = [...new Set(Object.values(rules))]; // use a Set to remove duplicates, then spread it into an array

let min = 999999;
let max = 0;

const c = letters.length;
for (let i = 0; i < c; i++) {
  const letterRegex = new RegExp(letters[i], "g");
  const count = polymer.match(letterRegex).length; // count how many times this letter is in the polymer
  if (count > 0 && count < min) {
    min = count;
  }
  if (count > max) {
    max = count;
  }
}

console.log(max - min);
