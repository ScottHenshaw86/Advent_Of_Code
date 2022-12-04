const fs = require("fs");

const text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

function runProgram(arr) {
  let acc = 0;
  let usedInstructions = [];
  let i = 0;

  while (usedInstructions.indexOf(i) === -1 && i < arr.length) {
    usedInstructions.push(i);
    let operation = arr[i].substr(0, 3);
    let argument = arr[i].substr(4);

    if (operation === "acc") {
      acc = acc + parseInt(argument);
      i++;
    } else if (operation === "jmp") {
      i = i + parseInt(argument);
    } else {
      i++;
    }
  }
  return [acc, usedInstructions[usedInstructions.length - 1]];
}

function findAndFixError(arr) {
  let finish = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    let operation = arr[i].substr(0, 3);
    if (operation === "nop" || operation === "jmp") {
      let argument = arr[i].substr(4);
      if (!(operation === "nop" && (argument === "+0" || argument === "-0"))) {
        let newArr = [...arr];
        newArr[i] = (operation === "nop" ? "jmp " : "nop ") + argument;
        let newResults = runProgram(newArr);
        if (newResults[1] === finish) {
          return newResults[0];
        }
      }
    }
  }
  // return finish;
}

console.log(findAndFixError(text));
