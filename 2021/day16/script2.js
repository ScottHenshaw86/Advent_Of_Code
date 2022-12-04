// Advent Of Code 2021 - Day 16: Part 2

const fs = require("fs");

let binary = fs.readFileSync("./input.txt", "latin1");


// let binary = "C200B40A82";
// let binary = '04005AC33890'
// let binary = '880086C3E88112'
// let binary = 'CE00C43D881120'
// let binary = 'D8005AC2A8F0'
// let binary = 'F600BC2D8F'
// let binary = '9C005AC2F8F0'
// let binary = '9C0141080250320F1802104A08'
// let binary = '32F5DF3B128'

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

binary = `${binary}0`;
console.log(binary)

const stack = [];

const actions = ["+", "*", ",", ",", "literal", ">", "<", "=="];

let string = "";

const c = binary.length;
for (let i = 0; i < c; i++) {
  let current;

  let packetComplete = true;
  while (packetComplete) {
    current = stack[stack.length - 1];
    if (stack.length > 0 && current.bitCount > 0) {
      if (current.targetLength == current.bitCount || current.targetLength == current.subPackets) {
        if (current.action === ">" || current.action === "<" || current.action === "==") {
          string = `${string} ? 1 : 0)`;
        } else {
          string = `${string})`;
        }
        stack.pop()
      } else {
        packetComplete = false;
      }
    } else {
      packetComplete = false;
    }
  }

  if (!binary.slice(i).includes(1)) break;
  // const V = binary.substring(i, i + 3);

  const T = binary.substring(i + 3, i + 6);

  if (parseInt(T, 2) == 4) {
    /////////////////////////////
    // this is a literal value //
    /////////////////////////////
    let j = i + 6;
    let litValue = binary.substring(j + 1, j + 5);
    console.log(litValue)
    while (binary[j] != 0) {
      j += 5;
      litValue = `${litValue}${binary.substring(j + 1, j + 5)}`;
      console.log(litValue)
    }
    // bitCount += j + 5 - i;
    // packetCount++;
    stack.forEach(a =>{ a.bitCount = a.bitCount + j + 5 - i})
    current.subPackets++; // TODO: uncomment this
    i = j + 4;
    if (string[string.length - 1] === "(") {
      string = `${string}${parseInt(litValue, 2)}`;
    } else {
      // TODO: uncmoment this
      string = `${string}${current.action}${parseInt(litValue, 2)}`;
      // string = `${string}${parseInt(litValue, 2)}`;
    }
    continue;
  }

  // must be an operator packet
  const action = actions[parseInt(T, 2)];
  const I = binary[i + 6];

  if (parseInt(T, 2) == 2) {
    if (current.bitCount > 0) {
      string = `${string}${current.action}Math.min(`;
    } else {
      string = `${string}Math.min(`;
    }
  } else if (parseInt(T, 2) == 3) {
    if (current.bitCount > 0) {
      string = `${string}${current.action}Math.max(`;
    } else {
      string = `${string}Math.max(`;
    }
  } else if (stack.length > 0 && current.bitCount > 0) {
    string = `${string}${current.action}(`;
  } else {
    string = `${string}(`;
  }

  if (stack.length > 0) stack[stack.length - 1].subPackets += 1
  if (I == 1)
    stack.push({
      targetLength: parseInt(binary.substring(i + 7, i + 18), 2),
      action: action,
      bitCount: 0,
      subPackets: 0
    });
  if (I == 0)
    stack.push({
      targetLength: parseInt(binary.substring(i + 7, i + 22), 2),
      action: action,
      bitCount: 0,
      subPackets: 0
    });

  let x = 0;
  if (I == 0) {
    x = 21;
  } else {
    x = 17;
  }
  if (stack.length > 0) {
    for (let j =0; j< stack.length - 1; j++) {
      stack[j].bitCount += x + 1;
    }
  }
  i += x;
}

console.log(string);
console.log(eval(string));


// 001 100  0111 0101 1011 1100 1101 0001 0101
// 123 456  8901 3456 8901 3456 8901 3456 8901 
// 000 000  0011 1111 1122 2222 2233 3333 3344