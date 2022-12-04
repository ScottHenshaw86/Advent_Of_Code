const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function runProgram(arr) {
  let acc = 0;
  let usedInstructions = [];
  let i = 0;

  while (usedInstructions.indexOf(i) === -1) {
    usedInstructions.push(i);
    let operation = arr[i].substr(0, 3);
    let argument = arr[i].substr(4);

    switch (operation) {
      case "acc":
        acc = acc + parseInt(argument);
        i++;
        break;
      case "jmp":
        i = i + parseInt(argument);
        break;
      case "nop":
        i++;
      default:
      // do nothing
    }
  }

  return acc;
}

console.log(runProgram(text));
