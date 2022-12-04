// Advent Of Code 2021 - Day 12: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of arrays of strings
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

// console.log(input);
// [
//   [ 'start', 'A' ],
//   [ 'start', 'b' ],
//   [ 'A', 'c' ],
//   [ 'A', 'b' ],
//   [ 'b', 'd' ],
//   [ 'A', 'end' ],
//   [ 'b', 'end' ]
// ]

// track the number of paths found
let numPaths = 0;

// recursive function to check paths that connect to the current room
// accepts the current room and an array of visited rooms
const findNext = (current, paths) => {
  for (let i = 0; i < input.length; i++) {
    let a = input[i][0];
    let b = input[i][1];

    // if neither room is the one I'm looking for, move on
    if (a !== current && b !== current) continue;

    // check if a room is lowercase.
    // if it is lowercase and I've already visited it, I can't visit it again
    if (a === a.toLowerCase() && paths.includes(a)) continue;
    if (b === b.toLowerCase() && paths.includes(b)) continue;

    const pathsCopy = [...paths]; // copy the visited rooms array

    // if the connected room is "end", the path is complete.
    // so increment numPathser
    if (a === "end" || b === "end") {
      numPaths++;
      pathsCopy.push("end");
      continue;
    }

    // not at the end yet. Add the current room to the path copy.
    pathsCopy.push(current);

    // call findNext with the room connected to the current room
    if (a === current) {
      findNext(b, pathsCopy);
    } else {
      findNext(a, pathsCopy);
    }
  }
};

findNext("start", []);

console.log(`ANSWER: ${numPaths}`);
