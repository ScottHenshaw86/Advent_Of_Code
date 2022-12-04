// Advent Of Code 2021 - Day 12: Part 2
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n/g)
  .map((a) => a.split("-"));

let numPaths = 0;
const findNext = (current, paths) => {
  if (current === "start" && paths.includes(current)) return;
  if (current === current.toLowerCase() && paths.includes(current)) {
    const check = paths.filter((x) => x === x.toLowerCase());
    const checkSet = new Set(check);
    if (check.length > checkSet.size) {
      return;
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
    // console.log(newPaths)
  }
};

findNext("start", []);

console.log(`ANSWER: ${numPaths}`);
