const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n")
  .map((el) => el.split(""));

function findAdjacent(arr, i, j) {
  let numAdjacent = 0;

  if (i === 0 && j === 0) {
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j + 1] === "#" ? 1 : 0;
  } else if (i === 0 && j === arr[i].length - 1) {
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
  } else if (i === 0) {
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j + 1] === "#" ? 1 : 0;
  } else if (i === arr.length - 1 && j === 0) {
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
  } else if (i === arr.length - 1 && j === arr[i].length - 1) {
    numAdjacent += arr[i - 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
  } else if (i === arr.length - 1) {
    numAdjacent += arr[i - 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
  } else if (j === 0) {
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j + 1] === "#" ? 1 : 0;
  } else if (j === arr[i].length - 1) {
    numAdjacent += arr[i - 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
  } else {
    numAdjacent += arr[i - 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i - 1][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i][j + 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j - 1] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j] === "#" ? 1 : 0;
    numAdjacent += arr[i + 1][j + 1] === "#" ? 1 : 0;
  }

  return numAdjacent;
}

function shouldChange(arr, i, j, result) {
  if (result === 0 && arr[i][j] === "L") {
    return "#";
  } else if (result >= 4 && arr[i][j] === "#") {
    return "L";
  } else {
    return arr[i][j];
  }
}
function changeSeats(arr) {
  let change = false;
  let newSeatChart = [];

  for (let i = 0; i < arr.length; i++) {
    let newSubSeatChart = [];
    for (let j = 0; j < arr[i].length; j++) {
      let result = false;
      if (arr[i][j] === "L" || arr[i][j] === "#") {
        result = findAdjacent(arr, i, j);
        let willChange = shouldChange(arr, i, j, result);
        newSubSeatChart.push(willChange);
        if (willChange != arr[i][j]) {
          change = true;
        }
      } else {
        newSubSeatChart.push(arr[i][j]);
      }
    }
    newSeatChart.push(newSubSeatChart);
  }
  if (!change) {
    let occupied = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "#") {
          occupied++;
        }
      }
    }
    console.log("occupied: ", occupied);
    return occupied;
  } else {
    changeSeats(newSeatChart);
  }
}

changeSeats(text);
