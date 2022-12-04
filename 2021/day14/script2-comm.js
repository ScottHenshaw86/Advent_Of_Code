// Advent Of Code 2021 - Day 14: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/[(\r\n)(,)]/g);

const template = input.shift();
input.shift();
const rulesArr = input.map((a) => a.split(" -> "));

const rules = Object.fromEntries(rulesArr);

let polymer = Object.fromEntries(rulesArr);
for (const a in polymer) {
  polymer[a] = 0;
}

// set the initial polymer pairs
for (let i = 0; i < template.length - 1; i++) {
  const pair = `${template[i]}${template[i + 1]}`;
  polymer[pair] = polymer[pair] + 1;
}

// console.log(polymer);
// {
//   CH: 0,
//   HH: 0,
//   CB: 1,
//   NH: 0,
//   HB: 0,
//   HC: 0,
//   HN: 0,
//   NN: 1,
//   BH: 0,
//   NC: 1,
//   NB: 0,
//   BN: 0,
//   BB: 0,
//   BC: 0,
//   CC: 0,
//   CN: 0
// }

const STEPS = 40;

for (let i = 0; i < STEPS; i++) {
  // loop 40 times
  let newPolymer = JSON.parse(JSON.stringify(polymer)); // create a copy of my polymer object

  for (pair in polymer) {
    // loop through each entry in my polymer object
    if (polymer[pair] > 0) {
      // check if a pair appears in the polymer
      // if so, then this pair will get split, and a new element will be in the middle
      const newPair1 = `${pair[0]}${rules[pair]}`; // the first element in the pair + the new insertion value
      const newPair2 = `${rules[pair]}${pair[1]}`; // the new insertion value + the second element in the pair

      newPolymer[newPair1] = newPolymer[newPair1] + polymer[pair]; // increase the valuer for both new pairs by the count of the original pair
      newPolymer[newPair2] = newPolymer[newPair2] + polymer[pair];

      newPolymer[pair] = newPolymer[pair] - polymer[pair]; // the original pair got split, so subtract from its value
    }
  }
  polymer = JSON.parse(JSON.stringify(newPolymer)); // copy the newPolymer
}

// console.log(polymer);
// {
//   CH: 1050598772,
//   HH: 823172187,
//   CB: 1554005966,
//   NH: 485345134,
//   HB: 1388425825,
//   HC: 1152932927,
//   HN: 485345134,
//   NN: 0,
//   BH: 1490759980,
//   NC: 1089686941,
//   NB: 1094472770278,
//   BN: 1093021098466,
//   BB: 1094624367533,
//   BC: 2903343622,
//   CC: 1451671811,
//   CN: 2541358752
// }

const letters = [...new Set(Object.values(rules))]; // get a list of all letters that appear in my polymer

const totals = {}; // create an object to store the count for each letter. initialize each value to 0
for (let i = 0; i < letters.length; i++) {
  totals[letters[i]] = 0;
}

for (let i = 0; i < letters.length; i++) {
  // iterate through the letters
  for (pair in polymer) {
    // search through each pair in my polymer object. If the current letter is part of the pair,
    // add its count to the total for that letter
    if (pair[0] === letters[i]) {
      totals[letters[i]] = totals[letters[i]] + polymer[pair];
    }
    if (pair[1] === letters[i]) {
      totals[letters[i]] = totals[letters[i]] + polymer[pair];
    }
  }

  // all of the letter totals will be double their real value, because each letter will be a part of 2 pairs
  // except for the very first letter and the very last letter. They are only a part of 1 pair.
  // EX: 'ABC has 2 pairs, AB and BC. B is in the middle, so it is included in 2 pairs.
  // A and C are only in 1 pair each.
  if (
    letters[i] === template[0] ||
    letters[i] === template[template.length - 1]
  ) {
    totals[letters[i]] = (totals[letters[i]] + 1) / 2;
  } else {
    totals[letters[i]] = totals[letters[i]] / 2;
  }
}

const values = Object.values(totals);

const min = Math.min(...values);
const max = Math.max(...values);

console.log("ANSWER");
console.log(max - min);
