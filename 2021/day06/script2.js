// Advent Of Code 2021 - Day 6: Part 1
const fs = require("fs");

const input = fs.readFileSync("./input.txt", "latin1").split(",").map(Number);

// console.log(input);
// [ 3, 4, 3, 1, 2 ]

// This DID NOT work. Threw FATAL Javascript error.
// for (let i=0; i< 256; i++) {
//   let c = input.length;
//   for (let j=0; j<c; j++) {
//     if (input[j] > 0) {
//       input[j] = input[j] - 1
//     } else {
//       input[j] = 6;
//       input.push(8);
//     }
//   }
// }

// this object will hold the total number of fish that have a specified internal timer
const fishies = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

// populate fishies object with initial values
input.forEach((a) => {
  fishies[a] = fishies[a] ? fishies[a] + 1 : 1;
});

for (let i = 0; i < 256; i++) {
  // loop 256 times
  const temp = JSON.parse(JSON.stringify(fishies)); // create a copy of my fishies object
  fishies[0] = temp[1]; // all fish with timer 1 will have their timer go to 0
  fishies[1] = temp[2]; // all fish with timer 2 will have their timer go to 1
  fishies[2] = temp[3]; // etc.
  fishies[3] = temp[4];
  fishies[4] = temp[5];
  fishies[5] = temp[6];
  fishies[6] = temp[7] + temp[0]; // fish that were at 7 will now be 6. Also, fish that were 0 will now be at 6
  fishies[7] = temp[8];
  fishies[8] = temp[0]; // fish that were 0 will spawn a new fish with timer 8
}

let sum = 0;
for (const a in fishies) {
  sum += fishies[a]; // loop through object and sum all the values
}

console.log(sum);
