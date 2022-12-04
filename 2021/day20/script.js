// Advent Of Code 2021 - Day 20: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./sample.txt", "latin1").split("\n");

const algo = input.shift();
input.shift(); // remove empty element

let c = input.length;
// need to add extra array to top and bottom
const tempStr = ".".repeat(c + 20);

for (let i = 0; i < c; i++) {
  input[i] = `..........${input[i]}..........`;
  input[i] = input[i].replace('\r', "");
}


input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.unshift(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);
input.push(tempStr);

// console.log(input)

let enhancedImage = [];

const analyzePixel = (i, j, arr) => {

  if ( i -1 < 0 || i + 1 >= input.length || j - 1 < 0 || j + 1 >= input.length ) return '.'

  const upLeft = arr[i - 1][j - 1]
  const up = arr[i - 1][j]
  const upRight = arr[i - 1][j + 1]
  const left = arr[i][j - 1]
  const current = arr[i][j]
  const right = arr[i][j + 1]
  const downLeft = arr[i + 1][j - 1]
  const down = arr[i + 1][j]
  const downRight = arr[i + 1][j + 1]
  let total = `${upLeft}${up}${upRight}${left}${current}${right}${downLeft}${down}${downRight}`;
  total = total.replace(/\./g, "0");
  total = total.replace(/#/g, "1");
  return algo[parseInt(total, 2)];
};

const d = input.length;
for (let i = 0; i < d; i++) {
  for (let j = 0; j < d; j++) {
    const value = analyzePixel(i, j, input);
    if (!enhancedImage[i]) {
      enhancedImage.push([]);
    }
    enhancedImage[i][j] = value;
  }
}

enhancedImage = enhancedImage.map((a) => a.join(""));
// console.log(enhancedImage)

let doublyEnhancedImage = [];

for (let i = 0; i < d; i++) {
  for (let j = 0; j < d; j++) {
    const value = analyzePixel(i, j, enhancedImage);
    if (!doublyEnhancedImage[i]) {
      doublyEnhancedImage.push([]);
    }
    doublyEnhancedImage[i][j] = value;
  }
}

doublyEnhancedImage.shift()
doublyEnhancedImage.shift()
doublyEnhancedImage.shift()
doublyEnhancedImage.shift()
doublyEnhancedImage.shift()
doublyEnhancedImage.pop()
doublyEnhancedImage.pop()
doublyEnhancedImage.pop()
doublyEnhancedImage.pop()
doublyEnhancedImage.pop()

for (let i=0; i<doublyEnhancedImage.length; i++ ) {
  doublyEnhancedImage[i].shift()
  doublyEnhancedImage[i].shift()
  doublyEnhancedImage[i].shift()
  doublyEnhancedImage[i].shift()
  doublyEnhancedImage[i].shift()
  doublyEnhancedImage[i].pop()
  doublyEnhancedImage[i].pop()
  doublyEnhancedImage[i].pop()
  doublyEnhancedImage[i].pop()
  doublyEnhancedImage[i].pop()
}

let count = 0;
let e = doublyEnhancedImage.length;
for (let i = 0; i < e; i++) {
  for (let j = 0; j < e; j++) {
    if (doublyEnhancedImage[i][j] === "#") {
      count++;
    }
  }
}

doublyEnhancedImage = doublyEnhancedImage.map((a) => a.join(""));
console.log(doublyEnhancedImage)


console.log(count);
