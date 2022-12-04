const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\n)/g)
  .filter((el) => el !== "\n")
  .map((el) => el.split(""));

function lookInDirection(arr, i, j, direction) {
  let icounter, jcounter;
  switch (direction) {
    case "N":
      i--;
      icounter = -1;
      jcounter = 0;
      break;
    case "NE":
      i--;
      j++;
      icounter = -1;
      jcounter = 1;
      break;
    case "E":
      j++;
      icounter = 0;
      jcounter = 1;
      break;
    case "SE":
      i++;
      j++;
      icounter = 1;
      jcounter = 1;
      break;
    case "S":
      i++;
      icounter = 1;
      jcounter = 0;
      break;
    case "SW":
      i++;
      j--;
      icounter = 1;
      jcounter = -1;
      break;
    case "W":
      j--;
      icounter = 0;
      jcounter = -1;
      break;
    case "NW":
      i--;
      j--;
      icounter = -1;
      jcounter = -1;
      break;
  }
  for (let x = i; x >= 0 && x < arr.length; x += icounter) {
    if (jcounter != 0) {
      for (let y = j; y >= 0 && y < arr[x].length; y += jcounter) {
        if (arr[x][y] === "#") {
          return 1;
        } else if (arr[x][y] === "L") {
          return 0;
        } else if (icounter != 0) {
          break;
        }
      }
      j += jcounter;
    } else {
      if (arr[x][j] === "#") {
        return 1;
      } else if (arr[x][j] === "L") {
        return 0;
      } else {
      }
    }
    if (icounter === 0) {
      break;
    }
  }

  return 0;
}

function findAdjacent(arr, i, j) {
  let numAdjacent = 0;

  if (i === 0 && j === 0) {
    numAdjacent += lookInDirection(arr, i, j, "E");
    numAdjacent += lookInDirection(arr, i, j, "SE");
    numAdjacent += lookInDirection(arr, i, j, "S");
  } else if (i === 0 && j === arr[i].length - 1) {
    numAdjacent += lookInDirection(arr, i, j, "W");
    numAdjacent += lookInDirection(arr, i, j, "SW");
    numAdjacent += lookInDirection(arr, i, j, "S");
  } else if (i === 0) {
    numAdjacent += lookInDirection(arr, i, j, "W");
    numAdjacent += lookInDirection(arr, i, j, "SW");
    numAdjacent += lookInDirection(arr, i, j, "S");
    numAdjacent += lookInDirection(arr, i, j, "SE");
    numAdjacent += lookInDirection(arr, i, j, "E");
  } else if (i === arr.length - 1 && j === 0) {
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NE");
    numAdjacent += lookInDirection(arr, i, j, "E");
  } else if (i === arr.length - 1 && j === arr[i].length - 1) {
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NW");
    numAdjacent += lookInDirection(arr, i, j, "W");
  } else if (i === arr.length - 1) {
    numAdjacent += lookInDirection(arr, i, j, "W");
    numAdjacent += lookInDirection(arr, i, j, "NW");
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NE");
    numAdjacent += lookInDirection(arr, i, j, "E");
  } else if (j === 0) {
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NE");
    numAdjacent += lookInDirection(arr, i, j, "E");
    numAdjacent += lookInDirection(arr, i, j, "SE");
    numAdjacent += lookInDirection(arr, i, j, "S");
  } else if (j === arr[i].length - 1) {
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NW");
    numAdjacent += lookInDirection(arr, i, j, "W");
    numAdjacent += lookInDirection(arr, i, j, "SW");
    numAdjacent += lookInDirection(arr, i, j, "S");
  } else {
    numAdjacent += lookInDirection(arr, i, j, "N");
    numAdjacent += lookInDirection(arr, i, j, "NE");
    numAdjacent += lookInDirection(arr, i, j, "E");
    numAdjacent += lookInDirection(arr, i, j, "SE");
    numAdjacent += lookInDirection(arr, i, j, "S");
    numAdjacent += lookInDirection(arr, i, j, "SW");
    numAdjacent += lookInDirection(arr, i, j, "W");
    numAdjacent += lookInDirection(arr, i, j, "NW");
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
