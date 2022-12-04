// Advent Of Code 2021 - Day 19: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/--- scanner [0-9][0-9]? ---\r\n/g)
  .map((a) => a.split("\r\n"))
  .map((b) => b.filter((d) => d !== ""))
  .map((c) => c.map((d) => d.split(",")));

input.shift();

let diffs = [];

const c = input.length;
for (let i = 0; i < c; i++) {
  // loop through input arrays
  diffs.push([]);
  for (let j = 0; j < input[i].length; j++) {
    // loop through beacons
    diffs[i].push([]);
    for (let k = 0; k < input[i].length; k++) {
      // loop through rest of beacons
      if (j === k) continue; // don't need distance from self
      const x = input[i][j][0] - input[i][k][0];
      const y = input[i][j][1] - input[i][k][1];
      const z = input[i][j][2] - input[i][k][2];
      let totalDiff = [Math.abs(x), Math.abs(y), Math.abs(z)].sort((a, b) => a - b).join(",");
      diffs[i][j].push(totalDiff);
    }
  }
}

const uselessVariable = 99999999999;

diffs = diffs.flat();

flatInput = input.flat();

const scanners = [];

for (let i = 0; i < c; i++) {
  for (let j = 0; j < input[i].length; j++) {
    scanners.push(i);
  }
}

const numScanners = new Set(scanners).size;

const overlappingBeacons = {};
const alreadyKey = []

const d = diffs.length;
for (let i = 0; i < d; i++) {
  for (let j = i + 1; j < d; j++) {
    let overlaps = 0;
    diffs[i].forEach((a) => {
      if (diffs[j].indexOf(a) > -1) overlaps++;
    });
    if (overlaps > 10) {


      if (!overlappingBeacons[scanners[i]]) {
        overlappingBeacons[scanners[i]] = {};
      }
      if (!overlappingBeacons[scanners[i]][scanners[j]]) {
        overlappingBeacons[scanners[i]][scanners[j]] = [];
      }
      overlappingBeacons[scanners[i]][scanners[j]].push(i, j);

      if (!overlappingBeacons[scanners[j]]) {
        overlappingBeacons[scanners[j]] = {};
      }
      if (!overlappingBeacons[scanners[j]][scanners[i]]) {
        overlappingBeacons[scanners[j]][scanners[i]] = [];
      }
      overlappingBeacons[scanners[j]][scanners[i]].push(j, i);

    }
  }
}

const completed = [0];

const scannerPositions = [[0, 0, 0]];

const getRotation = (x, y, z, x2, y2, z2) => {
  const string = `${x},${y},${z}`;
  // console.log(string)
  // console.log(`${x2},${y2},${z2}`)

  if (`${x2},${y2},${z2}` === string) return [0, 1, 2, 1, 1, 1];
  if (`${x2},${y2},${-1 * z2}` === string) return [0, 1, 2, 1, 1, -1];
  if (`${x2},${-1 * y2},${z2}` === string) return [0, 1, 2, 1, -1, 1];
  if (`${x2},${-1 * y2},${-1 * z2}` === string) return [0, 1, 2, 1, -1, -1];
  if (`${-1 * x2},${y2},${z2}` === string) return [0, 1, 2, -1, 1, 1];
  if (`${-1 * x2},${y2},${-1 * z2}` === string) return [0, 1, 2, -1, 1, -1];
  if (`${-1 * x2},${-1 * y2},${z2}` === string) return [0, 1, 2, -1, -1, 1];
  if (`${-1 * x2},${-1 * y2},${-1 * z2}` === string) return [0, 1, 2, -1, -1, -1];

  if (`${x2},${z2},${y2}` === string) return [0, 2, 1, 1, 1, 1];
  if (`${x2},${z2},${-1 * y2}` === string) return [0, 2, 1, 1, 1, -1];
  if (`${x2},${-1 * z2},${y2}` === string) return [0, 2, 1, 1, -1, 1];
  if (`${x2},${-1 * z2},${-1 * y2}` === string) return [0, 2, 1, 1, -1, -1];
  if (`${-1 * x2},${z2},${y2}` === string) return [0, 2, 1, -1, 1, 1];
  if (`${-1 * x2},${z2},${-1 * y2}` === string) return [0, 2, 1, -1, 1, -1];
  if (`${-1 * x2},${-1 * z2},${y2}` === string) return [0, 2, 1, -1, -1, 1];
  if (`${-1 * x2},${-1 * z2},${-1 * y2}` === string) return [0, 2, 1, -1, -1, -1];

  if (`${y2},${x2},${z2}` === string) return [1, 0, 2, 1, 1, 1];
  if (`${y2},${x2},${-1 * z2}` === string) return [1, 0, 2, 1, 1, -1];
  if (`${y2},${-1 * x2},${z2}` === string) return [1, 0, 2, 1, -1, 1];
  if (`${y2},${-1 * x2},${-1 * z2}` === string) return [1, 0, 2, 1, -1, -1];
  if (`${-1 * y2},${x2},${z2}` === string) return [1, 0, 2, -1, 1, 1];
  if (`${-1 * y2},${x2},${-1 * z2}` === string) return [1, 0, 2, -1, 1, -1];
  if (`${-1 * y2},${-1 * x2},${z2}` === string) return [1, 0, 2, -1, -1, 1];
  if (`${-1 * y2},${-1 * x2},${-1 * z2}` === string) return [1, 0, 2, -1, -1, -1];

  if (`${y2},${z2},${x2}` === string) return [1, 2, 0, 1, 1, 1];
  if (`${y2},${z2},${-1 * x2}` === string) return [1, 2, 0, 1, 1, -1];
  if (`${y2},${-1 * z2},${x2}` === string) return [1, 2, 0, 1, -1, 1];
  if (`${y2},${-1 * z2},${-1 * x2}` === string) return [1, 2, 0, 1, -1, -1];
  if (`${-1 * y2},${z2},${x2}` === string) return [1, 2, 0, -1, 1, 1];
  if (`${-1 * y2},${z2},${-1 * x2}` === string) return [1, 2, 0, -1, 1, -1];
  if (`${-1 * y2},${-1 * z2},${x2}` === string) return [1, 2, 0, -1, -1, 1];
  if (`${-1 * y2},${-1 * z2},${-1 * x2}` === string) return [1, 2, 0, -1, -1, -1];

  if (`${z2},${x2},${y2}` === string) return [2, 0, 1, 1, 1, 1];
  if (`${z2},${x2},${-1 * y2}` === string) return [2, 0, 1, 1, 1, -1];
  if (`${z2},${-1 * x2},${y2}` === string) return [2, 0, 1, 1, -1, 1];
  if (`${z2},${-1 * x2},${-1 * y2}` === string) return [2, 0, 1, 1, -1, -1];
  if (`${-1 * z2},${x2},${y2}` === string) return [2, 0, 1, -1, 1, 1];
  if (`${-1 * z2},${x2},${-1 * y2}` === string) return [2, 0, 1, -1, 1, -1];
  if (`${-1 * z2},${-1 * x2},${y2}` === string) return [2, 0, 1, -1, -1, 1];
  if (`${-1 * z2},${-1 * x2},${-1 * y2}` === string) return [2, 0, 1, -1, -1, -1];

  if (`${z2},${y2},${x2}` === string) return [2, 1, 0, 1, 1, 1];
  if (`${z2},${y2},${-1 * x2}` === string) return [2, 1, 0, 1, 1, -1];
  if (`${z2},${-1 * y2},${x2}` === string) return [2, 1, 0, 1, -1, 1];
  if (`${z2},${-1 * y2},${-1 * x2}` === string) return [2, 1, 0, 1, -1, -1];
  if (`${-1 * z2},${y2},${x2}` === string) return [2, 1, 0, -1, 1, 1];
  if (`${-1 * z2},${y2},${-1 * x2}` === string) return [2, 1, 0, -1, 1, -1];
  if (`${-1 * z2},${-1 * y2},${x2}` === string) return [2, 1, 0, -1, -1, 1];
  if (`${-1 * z2},${-1 * y2},${-1 * x2}` === string) return [2, 1, 0, -1, -1, -1];
}

const rotateAndOffset = (scanner) => {
  // console.log(`SCANNER SCANNER: ${scanner}`)
  const numCompleted = new Set(completed).size;
  if (numCompleted === numScanners) {
    // console.log("====== !FINISHED! ======");
    return;
  } // finished!

  if (!completed.includes(parseInt(scanner))) {
    console.log('this scanner has not been processed yet.')
    return
  };

  for (let overlapScanner in overlappingBeacons[scanner]) {

    if (completed.includes(parseInt(overlapScanner))) {
      console.log('this overlapScanner has ALREADY been processed');
      continue;
    }

    // console.log(`scanner: ${scanner}`)
    // console.log(`overlapScanner: ${overlapScanner}`)
    const beacons = overlappingBeacons[scanner][overlapScanner];

    //   console.log(beacons)
    //   [
    //     0, 28,  1, 33,  3, 37,  4, 26,
    //     5, 49,  6, 43,  7, 35,  9, 25,
    //    12, 27, 14, 30, 19, 40, 24, 44
    //  ]
    let s1b1, s1b2, s2b1, s2b2, start, end;

      s1b1 = flatInput[beacons[0]].map(Number);
      s1b2 = flatInput[beacons[2]].map(Number);
      s2b1 = flatInput[beacons[1]].map(Number);
      s2b2 = flatInput[beacons[3]].map(Number);

      start = scanners.indexOf(parseInt(overlapScanner));
      end = scanners.lastIndexOf(parseInt(overlapScanner));

      completed.push(parseInt(overlapScanner));

    x = s1b1[0] - s1b2[0];
    y = s1b1[1] - s1b2[1];
    z = s1b1[2] - s1b2[2];

    x2 = s2b1[0] - s2b2[0];
    y2 = s2b1[1] - s2b2[1];
    z2 = s2b1[2] - s2b2[2];

    const rotation = getRotation(x, y, z, x2, y2, z2)

    // console.log(`rotation: ${rotation}`)

    const offsetX = s1b1[0] - rotation[3] * s2b1[rotation[0]];
    const offsetY = s1b1[1] - rotation[4] * s2b1[rotation[1]];
    const offsetZ = s1b1[2] - rotation[5] * s2b1[rotation[2]];

    // console.log(`overlapScanner: ${overlapScanner}`)
    // console.log(`offsetX: ${offsetX}`);
    // console.log(`offsetY: ${offsetY}`);
    // console.log(`offsetZ: ${offsetZ}`);

    scannerPositions.push([offsetX, offsetY, offsetZ]);

    // offset Beacons


    for (let i = start; i < end; i++) {
      const temp = [...flatInput[i]];
      const newX = rotation[3] * temp[rotation[0]] + offsetX;
      const newY = rotation[4] * temp[rotation[1]] + offsetY;
      const newZ = rotation[5] * temp[rotation[2]] + offsetZ;
      flatInput[i] = [newX, newY, newZ];
    }
    
    rotateAndOffset(overlapScanner);
  }
};

rotateAndOffset(0);

// console.log(overlappingBeacons);



// const sortedFlatInput = flatInput.sort((a,b) => {
//   return parseInt(a[0]) - parseInt(b[0])
// })

// console.log(flatInput)

// console.log(flatInput);

// console.log(completed)
// console.log(scannerPositions);
console.log(overlappingBeacons)

let manhattan = 0;

for (let i=0; i<scannerPositions.length; i++) {
  for (let j=0; j< scannerPositions.length; j++) {
    if (j === i) continue;
    // console.log(scannerPositions[i])
    // console.log(scannerPositions[j])

    const x = Math.abs(scannerPositions[i][0] - scannerPositions[j][0])
    const y = Math.abs(scannerPositions[i][1] - scannerPositions[j][1])
    const z = Math.abs(scannerPositions[i][2] - scannerPositions[j][2])

    const total = x + y + z;

    if (total > manhattan) {
      manhattan = total;
    }

  }
}

console.log(`MANHATTAN DISTANCE: ${manhattan}`)
// GUESSES
// 10,000   - too low
// 30,000  - too high
// 20,000 - too high
