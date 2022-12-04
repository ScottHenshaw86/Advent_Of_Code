const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/[(\r\n)(,)]/g)
  .filter((el) => el !== "" && el !== "x");

console.log(text);

function findBus(arr) {
  let earliest = arr.shift();

  for (let i = earliest; ; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i % arr[j] === 0) {
        let busTime = Math.ceil(earliest / arr[j]) * arr[j];
        return (busTime - earliest) * arr[j];
      }
    }
  }
}

console.log(findBus(text));
