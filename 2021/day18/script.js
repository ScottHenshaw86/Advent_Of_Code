// Advent Of Code 2021 - Day 18: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\r\n/g).map(a => a.split(""))

// TESTING splits and explodes with sample inputs
// let input = [['11']];
// let input = '[[[[4,3],4],4],[7,[[8,4],9]]]';
// let addend = ['[', '1', ',', '1', ']'];
// input = input.split(/\r\n/g).map(a => a.split(""));


// console.log(input);
// [
//   [ '[', '1', ',', '1', ']' ],
//   [ '[', '2', ',', '2', ']' ],
//   [ '[', '3', ',', '3', ']' ],
//   [ '[', '4', ',', '4', ']' ]
// ]

// initial pair will be the top row
let pair = input[0]

const explode = () => {
  let depth = 0 // track how deeply nested the inner pairs are
  for (let i =0; i< pair.length; i++) { // search through all the elements
    if (pair[i] === "[") depth++; // if a new pair opens, increment the depth
    if (pair[i] === "]") depth--; // if a pair closes, decrement the depth
    // if depth is greater than 4, the pair will explode
    if (depth > 4) {
      // console.log('EXPLODE')
      const left = parseInt(pair[i+1]);
      const right = parseInt(pair[i+3]);
      // console.log(`left: ${left}`)
      // console.log(`right: ${right}`)
      // search left for the nearest number
      for (let j=i-1; j>0; j--) {
        if (Number(pair[j]) > -1) {
          pair[j] = parseInt(pair[j]) + left // add the left value to this number
          break;
        }
      }
      //search right for the nearest number
      for (let j=i+4; j<pair.length; j++) {
        if (Number(pair[j]) > -1) {
          pair[j] = parseInt(pair[j]) + right // add right value to this number
          break;
        }
      }
      //after adding the numbers (if possible), we can now set this pair to 0
      pair.splice(i+1, 4); // remove the exploded pair, except the opening bracket
      pair[i] = 0; // replace the opening bracket with 0. so EX: '[', '9', ',', '8', ']' becomes just '0'
      return true;
    }
  }
  return false;
}

const split = () => {
  // console.log(pair)
  for (let i=0; i<pair.length; i++) {
    if (Number(pair[i]) > 9) {
      // console.log(`SPLIT: ${pair[i]}`);
      const left = Math.floor(parseInt(pair[i]) / 2);
      const right = Math.ceil(parseInt(pair[i]) / 2);
      pair.splice(i, 1, '[', left, ',', right, ']');
      return true;
    }
  }
  return false;
}

const add = (addend) => {
  // console.log('ADD')
  pair.push(',');
  for (let i=0; i< addend.length; i++) {
    pair.push(addend[i])
  }
  pair.push(']')
  pair.unshift('[');
}

const c = input.length;
for (let i = 1; i < c; i++) {
  add(input[i]); // 1st, add the next line to the current pair

  // reduce the pair
  let canExplode = true;
  while(canExplode) {
    canExplode = explode()
  }
  let canSplit = true;
  while(canSplit) {
    canSplit = split();
    if (canSplit) {
      explode()
    }
  }
}

// finished adding all the snailfish numbers
// now need to calculate magnitude

const getMagnitude = () => {
  for (let i=0; i< pair.length; i++) {
      if (pair[i] === "[" && pair[i+4] === "]") {
          console.log('YES')
          const left = pair[i+1];
          const right = pair[i+3];
          pair.splice(i, 5, (3 * left) + (2 * right));
          return true;
      }
  }
  return false;
}

let calculating = true;
while(calculating) {
  calculating = getMagnitude();
}

console.log(pair)