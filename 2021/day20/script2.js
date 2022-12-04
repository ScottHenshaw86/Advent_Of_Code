// Advent Of Code 2021 - Day 20: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
let input = fs.readFileSync("./input.txt", "latin1").split("\n");

const algo = input.shift();
input.shift(); // remove empty element

let c = input.length;
// need to add extra array to top and bottom
const tempStr = ".".repeat(c + 200);
const plus = ".".repeat(100);

for (let i = 0; i < c; i++) {
  input[i] = `${plus}${input[i]}${plus}`;
  input[i] = input[i].replace('\r', "");
}

for (let i=0; i<100; i++) {
  input.unshift(tempStr);
  input.push(tempStr);
}

// console.log(input)

input = input.map(a => a.split(""));

let enhancedImage = JSON.parse(JSON.stringify(input));

const analyzePixel = (i, j, inArr, outArr, k) => {

  if ( i -1 < 0 || i + 1 >= inArr.length || j - 1 < 0 || j + 1 >= inArr.length ) {
    if (k % 2 === 0) {
      outArr[i][j] = '.'
      return;
    } else {
      outArr[i][j] = '#'
      return;
    }
  }

  const upLeft = inArr[i - 1][j - 1]
  const up = inArr[i - 1][j]
  const upRight = inArr[i - 1][j + 1]
  const left = inArr[i][j - 1]
  const current = inArr[i][j]
  const right = inArr[i][j + 1]
  const downLeft = inArr[i + 1][j - 1]
  const down = inArr[i + 1][j]
  const downRight = inArr[i + 1][j + 1]
  let total = `${upLeft}${up}${upRight}${left}${current}${right}${downLeft}${down}${downRight}`;
  total = total.replace(/\./g, "0");
  total = total.replace(/#/g, "1");
  outArr[i][j] = algo[parseInt(total, 2)];
};

const d = input.length;
for (let k=0; k< 50; k++) {
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      if (k % 2 === 0) {
        analyzePixel(i, j, input, enhancedImage, k);
      } else {
        analyzePixel(i, j, enhancedImage, input, k);
      }
    }
  }
}

for (let i=0; i< 50; i++) {
  input.shift();
  // input.pop();
}

input.pop();

const z = input.length;
for (let i = 0; i < z; i++) {
  input[i].shift()
  input[i].shift()
  input[i].shift()
  input[i].shift()
  input[i].shift()
  input[i].pop()
  input[i].pop()
  input[i].pop()
  input[i].pop()
  input[i].pop()
}

let count = 0;
let e = input.length;
for (let i = 0; i < e; i++) {
  for (let j = 0; j < e; j++) {
    if (input[i][j] === "#") {
      count++;
    }
  }
}

const final = input.map(a => a.join(""))
// console.log(final)

for (let i=0; i < final.length; i++) {
  console.log(final[i])
}

console.log(count);


// 18439 too high
// 13715 too low
// 14688 too low

// 17763 ? 