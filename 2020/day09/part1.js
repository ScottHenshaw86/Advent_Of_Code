const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n")
  .map((el) => parseInt(el));

function isValid(arr, num, index) {
  let testSet = new Set(arr);

  for (let i = 0; i < arr.length; i++) {
    const complement = num - arr[i];
    if (testSet.has(complement)) {
      return true;
    }
  }
  return false;
}

function findInvalid(arr) {
  for (let i = 25; i < arr.length; i++) {
    let results = isValid(arr.slice(i - 25, i), arr[i], i);
    if (!results) {
      return arr[i];
    }
  }
}

console.log(findInvalid(text));
