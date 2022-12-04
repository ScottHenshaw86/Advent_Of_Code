const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n){2,}/g)
  .filter((el) => el != "\r\n")
  .map((el) => el.replace(/(\r\n)/g, ","));

function findNumYes(str) {
  let numAllYes = 0;
  let groupSize = str.split(",").length;
  let unique = new Set();

  for (let i = 0; i < str.length; i++) {
    unique.add(str[i]);
  }

  unique.forEach(function (el) {
    const regex = new RegExp(el, "g");
    let numYes = (str.match(regex) || []).length;

    if (numYes === groupSize) {
      numAllYes++;
    }
  });

  return numAllYes;
}

function findTotalYes(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += findNumYes(arr[i]);
  }

  return total;
}

console.log(findTotalYes(text));
