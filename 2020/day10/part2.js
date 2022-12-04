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

function useAdapters(arr) {
  let builtInAdapter = arr[arr.length - 1] + 3;
  arr.push(builtInAdapter);
  arr.unshift(0);

  let branches = [1];

  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i - 3] >= arr[i] - 3) {
      branches[i] = branches[i - 1] + branches[i - 2] + branches[i - 3];
    } else if (arr[i - 2] >= arr[i] - 3) {
      branches[i] = branches[i - 1] + branches[i - 2];
    } else if (arr[i - 1] >= arr[i] - 3) {
      branches[i] = branches[i - 1];
    }
  }

  console.log(branches);
  return branches[branches.length - 1];
}

console.log("ANSWER: ", useAdapters(text));
