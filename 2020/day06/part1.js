const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n){2,}/g)
  .filter((el) => el != "\r\n")
  .map((el) => el.replace(/[\r\n]/g, ""));

function findNumYes(str) {
  let unique = new Set();

  for (let i = 0; i < str.length; i++) {
    unique.add(str[i]);
  }

  return unique.size;
}

function findTotalYes(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += findNumYes(arr[i]);
  }

  return total;
}

console.log(findTotalYes(text));
