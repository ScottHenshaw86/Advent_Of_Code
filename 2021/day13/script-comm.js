// Advent Of Code 2021 - Day 13: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample.txt", "latin1").split(/\n/g);
// console.log(input);
// [
//   '6,10',           '0,14',
//   '9,10',           '0,3',
//   '10,4',           '4,11',
//   '6,0',            '6,12',
//   '4,1',            '0,13',
//   '10,12',          '3,4',
//   '3,0',            '8,4',
//   '1,10',           '2,14',
//   '8,10',           '9,0',
//   '',               'fold along y=7',
//   'fold along x=5'
// ]

const dots = input.filter((a) => parseInt(a) > -1).map((b) => b.split(","));
// console.log(dots);
// [
//   [ '6', '10' ],  [ '0', '14' ],
//   [ '9', '10' ],  [ '0', '3' ],
//   (... 7 more items)
// ]

const folds = input.filter((a) => a.includes("fold"));
// console.log(folds);
// [ 'fold along y=7', 'fold along x=5' ]

const paper = []; // this will be my paper grid

let maxX = 0; // will be used to store the horizontal size of the paper
let maxY = 0; // will be used to store the vertical size of the paper

const c = dots.length;
for (let i = 0; i < c; i++) {
  // loop through the dots to find the largest values
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

// create my paper grid with all locations initialized to "."
for (let y = 0; y < maxY + 1; y++) {
  paper.push([]);
  for (let x = 0; x < maxX + 1; x++) {
    paper[y].push(".");
  }
}

// loop through the dots and put them on the paper
for (let i = 0; i < dots.length; i++) {
  const x = parseInt(dots[i][0]);
  const y = parseInt(dots[i][1]);
  paper[y][x] = "#";
}

const foldY = (foldLine) => {
  // ASSUMPTION: paper is always folded precisely in half
  let newY = 0; // starting with the top row, I'll add elements from the side that gets folded
  for (let y = paper.length - 1; y > foldLine; y--) {
    // start searching from the bottom row. Bottom will get folded up onto the top row.
    for (let x = 0; x < paper[0].length; x++) {
      // loop through each location in the row
      if (paper[y][x] === "#") {
        paper[newY][x] = "#"; // if the current element is a dot, I will add it to its corresponding place in the top half of the paper
      }
    }
    newY++; // as the search moves up the rows, the row where I add elements will move down accordingly
  }
  paper.splice(foldLine); // fold is finished. I remove everything below the fold line
};

// very similar to foldY. Now I'll search through the right half of the paper
// and add the dots to their corresponding position on the left half
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
    // need to loop through each row and cut off the right half
    paper[i].splice(foldLine);
  }
};

for (let i = 0; i < 1; i++) {
  // loop through the fold instructions.
  // didn't need a loop since I only care about the 1st fold,
  // but I guessed that I would need all of the instructions for part 2
  const foldLine = parseInt(folds[i].split("=")[1]); // capture the line that will get folded on
  if (folds[i].includes("x")) {
    foldX(foldLine); // fold on the X axis
  } else {
    foldY(foldLine); // fold on the Y axis
  }
}

// flatten the paper array and reduce to get the total number of dots
const numDots = paper.flat().reduce((a, b) => (b === "#" ? a + 1 : a), 0);
console.log(numDots);
