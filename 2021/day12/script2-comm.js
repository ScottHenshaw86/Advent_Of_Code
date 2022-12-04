// Advent Of Code 2021 - Day 12: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of arrays of strings
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

let numPaths = 0;

const findNext = (current, paths) => {
  if (current === "start" && paths.includes(current)) return; // don't go back to start
  if (current === current.toLowerCase() && paths.includes(current)) {
    // if lowercase and already in paths, need to make sure it doesn't get visited more than twice
    const check = paths.filter((x) => x === x.toLowerCase()); // check only the lowercase rooms that have been visited
    const checkSet = new Set(check); // get rid of duplicates
    if (check.length > checkSet.size) {
      return; // if a lowercase room has already been visited twice, this path fails
    }
  }

  for (let i = 0; i < input.length; i++) {
    let a = input[i][0];
    let b = input[i][1];
    if (a !== current && b !== current) continue;
    const pathsCopy = [...paths];
    if (a === "end" || b === "end") {
      numPaths++;
      pathsCopy.push("end");
      continue;
    }
    pathsCopy.push(current);

    if (a === current) {
      findNext(b, pathsCopy);
    } else {
      findNext(a, pathsCopy);
    }
  }
};

findNext("start", []);

console.log(`ANSWER: ${numPaths}`);
