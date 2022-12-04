const fs = require("fs");

let data = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function getNeighbors(arr, w, x, y, z) {
  let neighbors = [];
  for (let m = w - 1; m <= w + 1; m++) {
    if (typeof arr[m] === "undefined") {
      continue;
    }
    for (let i = x - 1; i <= x + 1; i++) {
      if (typeof arr[m][i] === "undefined") {
        continue;
      }
      for (let j = y - 1; j <= y + 1; j++) {
        if (typeof arr[m][i][j] === "undefined") {
          continue;
        }
        for (let k = z - 1; k <= z + 1; k++) {
          if (m === w && i === x && j === y && k === z) {
            continue;
          } else if (typeof arr[m][i][j][k] === "undefined") {
            continue;
          } else {
            neighbors.push(arr[m][i][j][k]);
          }
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

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}
function cycle(arr, cycle) {
  let container = JSON.parse(JSON.stringify(arr));
  let newXArr = [];
  let newWArr = [];
  let newDots = "";

  for (let i = 0; i < container[0][0][0].length + 2; i++) {
    newDots = newDots + ".";
  }

  for (let i = 0; i < newDots.length; i++) {
    newXArr.push(newDots);
  }

  for (let i = 0; i < cycle * 2 + 1; i++) {
    newWArr.push(newXArr);
  }

  for (let m = 0; m < container.length; m++) {
    for (let i = 0; i < container[0].length; i++) {
      for (let j = 0; j < container[0][0].length; j++) {
        container[m][i][j] = "." + container[m][i][j] + ".";
      }
    }
  }

  for (let m = 0; m < container.length; m++) {
    for (let i = 0; i < container[0].length; i++) {
      container[m][i].unshift(newDots);
      container[m][i].push(newDots);
    }
  }

  for (let m = 0; m < container.length; m++) {
    container[m].unshift(newXArr);
    container[m].push(newXArr);
  }

  container.unshift(newWArr);
  container.push(newWArr);

  let newState = JSON.parse(JSON.stringify(container));

  let countActive = 0;
  for (let m = 0; m < container.length; m++) {
    for (let i = 0; i < container[0].length; i++) {
      for (let j = 0; j < container[0][0].length; j++) {
        for (let k = 0; k < container[0][0][0].length; k++) {
          let neighbors = getNeighbors(container, m, i, j, k);
          let numActive = countActiveNeighbors(neighbors);
          let nextState = getNextState(container[m][i][j][k], numActive);
          countActive += nextState[1];
          newState[m][i][j] = setCharAt(newState[m][i][j], k, nextState[0]);
        }
      }
    }
  }
  return [newState, countActive];
}
function bootUp(arr) {
  let container = [[arr]];
  let cycle1 = cycle(container, 1);
  let cycle2 = cycle(cycle1[0], 2);
  let cycle3 = cycle(cycle2[0], 3);
  let cycle4 = cycle(cycle3[0], 4);
  let cycle5 = cycle(cycle4[0], 5);
  let cycle6 = cycle(cycle5[0], 6);
  return cycle6[1];
}

console.log("Num cubes in active state: ", bootUp(data));
