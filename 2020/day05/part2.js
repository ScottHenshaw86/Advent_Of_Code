const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el != "\r\n");

function getRow(str) {
  let min = 0;
  let max = 127;

  for (let i = 0, j = 64; i < str.length; i++, j /= 2) {
    if (str[i] === "F") {
      max -= j;
    } else {
      min += j;
    }
  }

  return min;
}

function getCol(str) {
  let min = 0;
  let max = 7;

  for (let i = 0, j = 4; i < str.length; i++, j /= 2) {
    if (str[i] === "L") {
      max -= j;
    } else {
      min += j;
    }
  }

  return min;
}

function getId(row, col) {
  return row * 8 + col;
}

function findMySeat(arr) {
  let ids = [];

  for (let i = 0; i < arr.length; i++) {
    let rowStr = arr[i].substr(0, 7);
    let colStr = arr[i].substr(7);

    let row = getRow(rowStr);
    let column = getCol(colStr);
    let seatId = getId(row, column);

    ids.push(seatId);
  }

  ids.sort(function (a, b) {
    return a - b;
  });
  console.log(ids);

  let mySeat;
  for (let i = 0; i < 1024; i++) {
    if (
      ids.indexOf(i - 1) > -1 &&
      ids.indexOf(i) === -1 &&
      ids.indexOf(i + 1) > -1
    ) {
      mySeat = i;
    }
  }

  return mySeat;
}

console.log(findMySeat(text));
