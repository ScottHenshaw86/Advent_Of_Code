const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function getNewCoordinates(str, coords, waypoint) {
  let x = coords[0];
  let y = coords[1];

  let wayx = waypoint[0];
  let wayy = waypoint[1];

  let direction = str.substr(0, 1);
  let value = parseInt(str.substr(1));

  let oldx = waypoint[0];

  switch (direction) {
    case "N":
      wayy += value;
      break;
    case "S":
      wayy -= value;
      break;
    case "E":
      wayx += value;
      break;
    case "W":
      wayx -= value;
      break;
    case "L":
    case "R":
      if (value === 180) {
        wayx = -wayx;
        wayy = -wayy;
      } else if (
        (value === 90 && direction === "R") ||
        (value === 270 && direction === "L")
      ) {
        wayx = wayy;
        wayy = -oldx;
      } else if (
        (value === 270 && direction === "R") ||
        (value === 90 && direction === "L")
      ) {
        wayx = -wayy;
        wayy = oldx;
      }
      break;
    case "F":
      x += value * wayx;
      y += value * wayy;
  }

  return [x, y, wayx, wayy];
}

function navigate(arr) {
  // [x, y]
  let coords = [0, 0];
  let waypoint = [10, 1];

  let c = arr.length;
  for (let i = 0; i < c; i++) {
    let results = getNewCoordinates(arr[i], coords, waypoint);
    coords[0] = results[0];
    coords[1] = results[1];

    waypoint[0] = results[2];
    waypoint[1] = results[3];
  }

  return Math.abs(coords[0]) + Math.abs(coords[1]);
}

console.log(navigate(text));
