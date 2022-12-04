// Advent Of Code 2021 - Day 12: Part 1
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

let numPaths = 0;

const findNext = (current, paths) => {
  for (let i = 0; i < input.length; i++) {
    let a = input[i][0];
    let b = input[i][1];
    if (a !== current && b !== current) continue;
    if (a === a.toLowerCase() && paths.includes(a)) continue;
    if (b === b.toLowerCase() && paths.includes(b)) continue;

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
