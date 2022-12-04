// Advent Of Code 2021 - Day #: Part 1

// sample data 
// const target = {
//   x1: 20,
//   x2: 30,
//   y1: -10,
//   y2: -5
// }

// my input
const target = {
  x1: 25,
  x2: 67,
  y1: -260,
  y2: -200
}

// for Part 1: X and Y can be considered as independent

// find min X velocity
let minX = 999;
for (let i=1; i< target.x1; i++) {
  const sum = (i/2)*(1 + i);
  console.log(sum);
  if (sum > target.x1) {
    minX = i; 
    break;
  }
}

// console.log(minX);

// find Y
let maxY = 0;
let max = 0;
for (let i=5000; i > 0; i--) {
  let currentY = 0;
  let vy = i;
  for (let j=0; j< 5000; j++) {
    // console.log(`i: ${i}, j: ${j}`)
    // console.log(currentY);
    currentY = currentY + vy;
    if (vy > 0 ) max = currentY;
    if (currentY >= target.y1 && currentY <= target.y2) {
      maxY = i;
      break;
    }
    if (currentY < target.y1) break;
    vy--;
  }
  if (maxY !== 0) break;
}

console.log(`minX: ${minX}, maxY: ${maxY}`)
console.log(max)