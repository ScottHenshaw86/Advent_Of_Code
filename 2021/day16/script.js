// Advent Of Code 2021 - Day 16: Part 1
const fs = require("fs");

let binary = fs.readFileSync("./input.txt", "latin1");

const binaryMap = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

arr.forEach((a) => {
  const regex = new RegExp(a, "g");
  binary = binary.replace(regex, binaryMap[a]);
});

const versions = [];

const c = binary.length;
for (let i = 0; i < c; ) {
  if (!binary.slice(i).includes(1)) break;
  const V = binary.substring(i, i + 3);
  versions.push(V);

  const T = binary.substring(i + 3, i + 6);
  if (parseInt(T, 2) == 4) {
    let j = i + 6;
    while (binary[j] != 0) {
      j += 5;
    }
    i = j + 5;
    continue;
  } else {
    if (binary[i + 6] == 0) {
      i += 22;
    } else {
      i += 18;
    }
  }
}

let count = 0;
versions.forEach((a) => (count += parseInt(a, 2)));

console.log(count);
