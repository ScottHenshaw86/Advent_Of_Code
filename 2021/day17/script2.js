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

// max X velocity can't be greater than the far edge of the target
const maxX = target.x2;

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

// min Y can't be deeper than the deepest edge of the target
const minY = target.y1;

// find max Y velocity
let maxY = 0;
let max = 0;
for (let i=5000; i > 0; i--) {
  let currentY = 0;
  let vy = i;
  for (let j=0; j< 5000; j++) {
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

// console.log(`minX: ${minX}, maxX: ${maxX}`)
// console.log(`minY: ${minY}, maxY: ${maxY}`)

const options = [];

for (let i=minX; i< maxX + 1; i++) {
  for (let j=minY; j< maxY + 1; j++) {
    let currentX = 0;
    let currentY = 0;
    let vx = i;
    let vy = j;
    for (let k = 0; k < 5000; k++) {
      currentX = currentX + vx;
      currentY = currentY + vy;
      if (currentY >= target.y1 && currentY <= target.y2) {
        if (currentX >= target.x1 && currentX <= target.x2) {
          options.push(`${i},${j}`);
          break;
        }
      }
      if (currentX > target.x2) break;
      if (currentY < target.y1) break;

      if (vx > 0) vx--;
      vy--;
    }
  }
}

console.log(options)
console.log(options.length)