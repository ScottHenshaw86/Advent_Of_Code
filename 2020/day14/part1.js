const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n)/g)
  .filter((el) => el !== "\r\n");

let binary = [];

for (let i = 0; i < 36; i++) {
  binary[35 - i] = 2 ** i;
}

function convertToBinary(num) {
  let converted = [];

  for (let i = 0; i < binary.length; i++) {
    if (num >= binary[i]) {
      converted[i] = 1;
      num -= binary[i];
    } else {
      converted[i] = 0;
    }
  }
  return converted;
}

function convertToDecimal(arr) {
  let num = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      num += binary[i];
    }
  }
  return num;
}

function applyMask(arr, mask) {
  for (let i = 0; i < arr.length; i++) {
    if (mask[i] != "X") {
      arr[i] = parseInt(mask[i]);
    }
  }
  return arr;
}

function initialize(arr) {
  let mask = [];
  let mem = [];

  for (let i = 0; i < arr.length; i++) {
    // true for bitmask
    if (arr[i].substr(0, 4) === "mask") {
      mask = arr[i].substr(7);
    } else {
      // true for mem
      let address = parseInt(arr[i].match(/(?<=\[).+?(?=\])/)[0]);
      let start = parseInt(arr[i].indexOf("=")) + 2;
      let value = parseInt(arr[i].substr(start));
      let binaryValue = convertToBinary(value);
      let newBinaryValue = applyMask(binaryValue, mask);
      let decimalValue = convertToDecimal(newBinaryValue);
      mem[address] = decimalValue;
    }
  }
  let sum = mem.reduce((a, b) => a + b, 0);
  return sum;
}

console.log(initialize(text));
