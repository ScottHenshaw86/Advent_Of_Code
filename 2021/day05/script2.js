// Advent Of Code 2021 - Day 5: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/[(\r\n)]/g)
  .filter((a, i) => i%2 === 0)
  .map((a) => a.split(' -> '))
  .map((b) => [b[0].split(','), b[1].split(',')]);


  
const grid = [];

const c = input.length;
  for (let i=0; i<c; i++) {
    const x1 = parseInt(input[i][0][0]);
    const y1 = parseInt(input[i][0][1]);
    const x2 = parseInt(input[i][1][0]);
    const y2 = parseInt(input[i][1][1]);
    if (x1 === x2) {
      const x = x1;
      const start = Math.min(y1, y2)
      for (let j=0; j < Math.abs(y1 - y2) + 1; j++) {
        if (!grid[start + j]) grid[start + j] = [];
        grid[start + j][x] = grid[start + j][x] ? grid[start + j][x] + 1 : 1;
      }
    } else if (y1 === y2) {
      const y = y1;
      const start = Math.min(x1, x2)
      for (let j=0; j < Math.abs(x1 - x2) + 1; j++) {
        if (!grid[y]) grid[y] = [];
        grid[y][start + j] = grid[y][start + j] ? grid[y][start + j] + 1 : 1;
      }
    } else {
      for (let j=0; j < Math.abs(x1 - x2) + 1; j++) {
        if (y1 < y2) {
          if (!grid[y1 + j]) grid[y1 + j] = [];
          if (x1 < x2) {
            grid[y1 + j][x1 + j] = grid[y1 + j][x1 + j] ? grid[y1 + j][x1 + j] + 1 : 1;
          } else {
            grid[y1 + j][x1 - j] = grid[y1 + j][x1 - j] ? grid[y1 + j][x1 - j] + 1 : 1;
          }
        } else {
          if (!grid[y1 - j]) grid[y1 - j] = [];
          if (x1 < x2) {
            grid[y1 - j][x1 + j] = grid[y1 - j][x1 + j] ? grid[y1 - j][x1 + j] + 1 : 1;
          } else {
            grid[y1 - j][x1 - j] = grid[y1 - j][x1 - j] ? grid[y1 - j][x1 - j] + 1 : 1;
          }
        }
      }
    }
  }

  const d = grid.length;
  let count = 0;
  for (let i=0; i<d; i++ ) {
    if (grid[i]?.length > 0) {
      count += grid[i].filter((a) => a > 1).length;
    }
  }

  console.log(grid)

  console.log(count);