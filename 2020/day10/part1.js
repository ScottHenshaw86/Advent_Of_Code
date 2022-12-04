const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n")
  .map((el) => parseInt(el))
  .sort(function (a, b) {
    return a - b;
  });

console.log(text);

function findDifferences(arr, i) {
  let diff1 = 0;
  let diff2 = 0;
  let diff3 = 0;

  if (arr[i] - arr[i - 1] === 1) {
    diff1++;
  } else if (arr[i] - arr[i - 1] === 2) {
    diff2++;
  } else if (arr[i] - arr[i - 1] === 3) {
    diff3++;
  }

  return [diff1, diff2, diff3];
}

function useAdapters(arr) {
  let builtInAdapter = arr[arr.length - 1] + 3;
  arr.push(builtInAdapter);
  arr.unshift(0);

  let diff1 = 0;
  let diff2 = 0;
  let diff3 = 0;

  for (let i = 1; i < arr.length; i++) {
    let results = findDifferences(arr, i);
    diff1 += results[0];
    diff2 += results[1];
    diff3 += results[2];
  }

  console.log("diff1: ", diff1);
  console.log("diff2: ", diff2);
  console.log("diff3: ", diff3);
  return diff1 * diff3;
}

console.log("ANSWER: ", useAdapters(text));
