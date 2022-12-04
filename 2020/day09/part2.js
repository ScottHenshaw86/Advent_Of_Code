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

function findWeakness(num, arr) {
  let sum = 0;
  let range = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (sum < num) {
        sum += arr[j];
        range.push(arr[j]);
      } else if (sum === num) {
        return range;
      } else {
        sum = 0;
        range = [];
      }
    }
  }
}

function startHack(arr) {
  for (let i = 25; i < arr.length; i++) {
    let results = isValid(arr.slice(i - 25, i), arr[i], i);
    if (!results) {
      const range = findWeakness(arr[i], arr).sort(function (a, b) {
        return a - b;
      });

      return range[0] + range[range.length - 1];
    }
  }
}

console.log(startHack(text));
