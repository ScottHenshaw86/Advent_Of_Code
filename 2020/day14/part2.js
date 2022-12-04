const fs = require("fs");
const { PerformanceObserver, performance } = require("perf_hooks");

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
  let numX = (mask.match(/X/g) || []).length;
  // get bit value of each X in mask
  let xarr = [];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "X") {
      xarr.push(2 ** (35 - i));
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (mask[i] == 1) {
      arr[i] = 1;
    } else if (mask[i] === "X") {
      arr[i] = "X";
    }
  }

  //get the decimal value if all 'X's are 0.
  let firstValue = convertToDecimal(arr);
  let addresses = [firstValue];
  // console.log('addresses - initial: ', addresses)
  for (let i = xarr.length - 1; i >= 0; i--) {
    let tempArr = [];
    addresses.forEach((el) => tempArr.push(el + parseInt(xarr[i])));
    addresses = addresses.concat(tempArr);
  }

  return addresses;
}
function initialize(arr) {
  let mask = [];
  let mem = [];
  let addresses = [];
  for (let i = 0; i < arr.length; i++) {
    // true for bitmask
    if (arr[i].substr(0, 4) === "mask") {
      mask = arr[i].substr(7);
    } else {
      // true for mem
      let address = parseInt(arr[i].match(/(?<=\[).+?(?=\])/)[0]);
      let start = parseInt(arr[i].indexOf("=")) + 2;
      let value = parseInt(arr[i].substr(start));
      let binaryAddress = convertToBinary(address);
      let addressesArr = applyMask(binaryAddress, mask);
      addressesArr.forEach((el) => {
        if (addresses.indexOf(el) < 0) {
          addresses.push(el);
          mem.push(value);
        } else {
          mem[addresses.indexOf(el)] = value;
        }
      });
    }
  }

  let sum = mem.reduce((a, b) => {
    a[b.id] = b;
    return a + b;
  }, 0);
  return sum;
}

const t0 = performance.now();
console.log("SUM: ", initialize(text));
const t1 = performance.now();
console.log(`Initialization took ${t1 - t0} milliseconds.`);
