const fs = require("fs");

let data = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function getNeighbors(arr, x, y, z) {
  let neighbors = [];
  for (let i = x - 1; i <= x + 1; i++) {
    if (typeof arr[i] === "undefined") {
      continue;
    }
    for (let j = y - 1; j <= y + 1; j++) {
      if (typeof arr[i][j] === "undefined") {
        continue;
      }
      for (let k = z - 1; k <= z + 1; k++) {
        if (i === x && j === y && k === z) {
          continue;
        } else if (typeof arr[i][j][k] === "undefined") {
          continue;
        } else {
          neighbors.push(arr[i][j][k]);
        }
      }
    }
  }
  return neighbors;
}

function countActiveNeighbors(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "#") {
      count++;
    }
  }
  return count;
}

function getNextState(cube, numActive) {
  if (cube === "#") {
    if (numActive === 2 || numActive === 3) {
      return ["#", 1];
    } else {
      return [".", 0];
    }
  } else {
    if (numActive === 3) {
      return ["#", 1];
    } else {
      return [".", 0];
    }
  }
}

// Thanks to rahul on Stackoverflow for this handy helper function
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}
function cycle(arr) {
  let container = JSON.parse(JSON.stringify(arr));
  let newArray = [];
  for (let i = 0; i < container[0].length; i++) {
    newArray.push([]);
    for (let j = 0; j < container[0][0].length; j++) {
      newArray[i] = newArray[i] + ".";
    }
  }

  container.unshift(JSON.parse(JSON.stringify(newArray)));
  container.push(JSON.parse(JSON.stringify(newArray)));

  let newDots = "";
  for (let i = 0; i < container[0].length; i++) {
    newDots = newDots + ".";
  }

  for (let i = 0; i < container.length; i++) {
    container[i].unshift(newDots);
    container[i].push(newDots);
  }

  for (let i = 0; i < container.length; i++) {
    for (let j = 0; j < container[i].length; j++) {
      container[i][j] = "." + container[i][j] + ".";
    }
  }

  let newState = JSON.parse(JSON.stringify(container));
  let countActive = 0;
  for (let i = 0; i < container.length; i++) {
    for (let j = 0; j < container[0].length; j++) {
      for (let k = 0; k < container[0][0].length; k++) {
        let neighbors = getNeighbors(container, i, j, k);
        let numActive = countActiveNeighbors(neighbors);
        let nextState = getNextState(container[i][j][k], numActive);
        countActive += nextState[1];
        newState[i][j] = setCharAt(newState[i][j], k, nextState[0]);
      }
    }
  }
  // console.log('countActive: ', countActive);
  return [newState, countActive];
  // return newState;
}

function bootUp(arr) {
  let container = [arr];
  let cycle1 = cycle(container);
  let cycle2 = cycle(cycle1[0]);
  let cycle3 = cycle(cycle2[0]);
  let cycle4 = cycle(cycle3[0]);
  let cycle5 = cycle(cycle4[0]);
  let cycle6 = cycle(cycle5[0]);

  return cycle6[1];
}

console.log("Number of cubes in active state: ", bootUp(data));
