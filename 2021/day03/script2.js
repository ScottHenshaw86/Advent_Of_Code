// Advent Of Code 2021 - Day 3: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs.readFileSync("./input.txt", "latin1").split(/[(\r\n)]/g);

let ogr = ""; // oxygen generator rating
let csr = ""; // CO2 scrubber rating

const getOGR = (arr, i) => {
  const c = arr[0].length;
  let total = 0;
  for (let j = 0; j < arr.length; j++) {
    total += parseInt(arr[j][i]);
  }
  if (total < arr.length / 2) {
    ogr = ogr + "0";
  } else {
    ogr = ogr + "1";
  }
  const ogrArr = arr.filter((a) => a.substr(0, i + 1) === ogr);
  if (ogr.length === ogrArr[0].length) return ogr;
  getOGR(ogrArr, i + 1);
};

const getCSR = (arr, i) => {
  const c = arr[0].length;
  let total = 0;
  for (let j = 0; j < arr.length; j++) {
    total += parseInt(arr[j][i]);
  }
  if (total < arr.length / 2) {
    csr = csr + "1";
  } else {
    csr = csr + "0";
  }
  const csrArr = arr.filter((a) => a.substr(0, i + 1) === csr);
  if (csrArr.length === 0) {
    csr = arr[0];
    return;
  }
  getCSR(csrArr, i + 1);
};

getOGR(input, 0);
getCSR(input, 0);

console.log(parseInt(ogr, 2) * parseInt(csr, 2));
