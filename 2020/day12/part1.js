const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function getNewCoordinates(arr, coords, i) {
  let x = coords[0];
  let y = coords[1];
  let degrees = coords[2];

  let direction = arr[i].substr(0, 1);
  let value = parseInt(arr[i].substr(1));

  switch (direction) {
    case "N":
      y += value;
      break;
    case "S":
      y -= value;
      break;
    case "E":
      x += value;
      break;
    case "W":
      x -= value;
      break;
    case "L":
      degrees -= value;
      if (degrees < 0) {
        degrees += 360;
      }
      break;
    case "R":
      degrees += value;
      if (degrees >= 360) {
        degrees -= 360;
      }
      break;
    case "F":
      if (degrees === 0) {
        y += value;
      } else if (degrees === 90) {
        x += value;
      } else if (degrees === 180) {
        y -= value;
      } else if (degrees === 270) {
        x -= value;
      }
  }

  return [x, y, degrees];
}

function navigate(arr) {
  // [x, y, degrees]
  // degrees: 0=North, 90=E, 180=S, 270=W
  let coords = [0, 0, 90];

  let c = arr.length;
  for (let i = 0; i < c; i++) {
    coords = getNewCoordinates(arr, coords, i);
  }

  console.log(coords);
  return Math.abs(coords[0]) + Math.abs(coords[1]);
}

console.log(navigate(text));
