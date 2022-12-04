// Advent Of Code 2021 - Day 3: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)]/g)
  .map((a) => a.split(""));

// console.log(input);

const rotate = (arr) => {
  const c = arr.length;
  const d = arr[0].length;
  const newArr = [];
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < d; j++) {
      if (newArr.length === j) newArr.push([]);
      newArr[j].push(arr[i][j]);
    }
  }
  // console.log(newArr);
  return newArr;
};

const getValues = (arr) => {
  let γ = "";
  let ε = "";
  const c = arr.length;
  for (let i = 0; i < c; i++) {
    const x = arr[i].reduce((a, b) => parseInt(a) + parseInt(b));
    if (x < arr[i].length / 2) {
      γ = γ + "0";
      ε = ε + "1";
    } else {
      γ = γ + "1";
      ε = ε + "0";
    }
  }
  return parseInt(γ, 2) * parseInt(ε, 2);
};

console.log(getValues(rotate(input)));
