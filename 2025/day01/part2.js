// Advent of Code 2025 - Day 1: Part 1
const fs = require("fs");

// import my puzzle input and format it
const rotations = fs.readFileSync("./input.txt", "latin1").split(/\n/g)

// console.log(input);

let currentValue = 50;
let numTimesStopOnZero = 0;

for (let rotation of rotations) {
  const direction = rotation[0];
  const amountToRotate = parseInt(rotation.slice(1));

  if (direction === "L") {
    for (let i = 0; i < amountToRotate; i++) {
      currentValue--;
      if (currentValue < 0) {
        currentValue = 99;
      }
      if (currentValue === 0) numTimesStopOnZero++;
    }
  } 

  if (direction === "R") {
    for (let i = 0; i < amountToRotate; i++) {
      currentValue++;
      if (currentValue > 99) {
        currentValue = 0;
      }
      if (currentValue === 0) numTimesStopOnZero++;
    }
  }

}

// We want to find out how many times it stops on zero.
console.log("numTimesStopOnZero:", numTimesStopOnZero)