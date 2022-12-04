// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~ WARNING ~~ WARNING ~~ WARNING ~~ WARNING ~~ WARNING ~~ WARNING ~~ WARNING ~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ This code is terrible ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~ It will probably take weeks or months to complete ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");
const { performance } = require("perf_hooks");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split(" "));

// console.log(input);

const max = 99999999999999; // largest possible 14 digit number
const min = 11111111111111; // smallest possible 14 digit number with no 0s

let count = 0;

const start = performance.now();
const c = input.length;
for (let i = max; i >= min; i--) {
  // loop through possible numbers
  let digit = 0; // need to start at the leftmost digit
  const string = i.toString(); // convert to string so I can get values by index
  if (string.includes("0")) continue;

  const values = {
    // keep track of the current values for wxyz
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  for (let j = 0; j < c; j++) {
    // loop through input instructions
    const operation = input[j][0]; // inp, add, mul, div, mod, or eql
    const a = input[j][1]; // the variable that will store the result

    if (operation === "inp") {
      values.w = parseInt(string[digit]); // set w to the current digit, then increment the digit counter
      digit++;
      continue;
    }

    const b = input[j][2]; // if the operation is NOT inp, there will be a 2nd value

    if (operation === "add") {
      values[a] += Object.keys(values).includes(b) ? values[b] : parseInt(b);
      continue;
    }
    if (operation === "mul") {
      // need to check if b is a variable value or a number value
      values[a] *= Object.keys(values).includes(b) ? values[b] : parseInt(b);
      continue;
    }
    if (operation === "div") {
      values[a] = Object.keys(values).includes(b)
        ? Math.floor(values[a] / values[b]) // round down after dividing
        : Math.floor(values[a] / parseInt(b));
      continue;
    }
    if (operation === "mod") {
      values[a] = values[a] % parseInt(b);
      continue;
    }
    if (operation === "eql") {
      if (values[a] && Object.keys(values).includes(b)) {
        values[a] = values[a] === values[b] ? 1 : 0;
      } else {
        values[a] = values[a] === parseInt(b) ? 1 : 0;
      }
      continue;
    }
  }
  // at the end of the instructions, check if z === 0
  if (values.z === 0) {
    console.log(i);
    break;
  }
  const oldCount = count;
  count++;
  const end = performance.now();
  if (oldCount.toString().length < count.toString().length)
    console.log(`${count} : ${((end - start) / 1000).toFixed(2)} seconds`);
}
