// Advent Of Code 2021 - Day 13: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/\n/g);

const dots = input.filter((a) => parseInt(a) > -1).map((b) => b.split(","));
const folds = input.filter((a) => a.includes("fold"));

const paper = [];

let maxX = 0;
let maxY = 0;

const c = dots.length;
for (let i = 0; i < c; i++) {
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

for (let y = 0; y < maxY + 1; y++) {
  paper.push([]);
  for (let x = 0; x < maxX + 1; x++) {
    paper[y].push(".");
  }
}

for (let i = 0; i < dots.length; i++) {
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  paper[y][x] = "#";
}

const foldY = (foldLine) => {
  let newY = 0;
  for (let y = paper.length - 1; y > foldLine; y--) {
    for (let x = 0; x < paper[0].length; x++) {
      if (paper[y][x] === "#") {
        paper[newY][x] = "#";
      }
    }
    newY++;
  }
  paper.splice(foldLine);
};

const foldX = (foldLine) => {
  for (let y = 0; y < paper.length; y++) {
    let newX = 0;
    for (let x = paper[0].length - 1; x > foldLine; x--) {
      if (paper[y][x] === "#") {
        paper[y][newX] = "#";
      }
      newX++;
    }
  }
  for (let i = 0; i < paper.length; i++) {
    paper[i].splice(foldLine);
  }
};

const d = folds.length;
for (let i = 0; i < folds.length; i++) {
  // for part 2, I need to complete all of the folds
  const foldLine = parseInt(folds[i].split("=")[1]);
  if (folds[i].includes("x")) {
    foldX(foldLine);
  } else {
    foldY(foldLine);
  }
}

// no longer care about this counter
// let count = 0;

// for (let i = 0; i < paper.length; i++) {
//   for (let j = 0; j < paper[0].length; j++) {
//     if (paper[i][j] === "#") count++;
//   }
// }

console.log(paper);

// copy and paste the results into a text editor, then format and read.
