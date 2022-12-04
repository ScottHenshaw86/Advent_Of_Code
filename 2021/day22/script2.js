// Advent Of Code 2021 - Day #: Part 1
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split("\n")
  .map((a) =>
    a.split(/[, ]/g).map((b) => {
      let c = b.replace(/[xyz]=/g, "");
      if (c.includes("..")) c = c.split("..").map(Number);
      return c;
    })
  );

// TODO: remove this
// input.splice(20); // only use first 20 elements for part 1

// cuboid = [[x1,x2], [y1,y2], [z1,z2]]
const getOverlapPoints = (cuboid1, cuboid2) => {
  const x = cuboid1[0];
  const y = cuboid1[1];
  const z = cuboid1[2];

  const x2 = cuboid2[0];
  const y2 = cuboid2[1];
  const z2 = cuboid2[2];

  if (x2[0] > x[1] || x2[1] < x[0]) return null;
  if (y2[0] > y[1] || y2[1] < y[0]) return null;
  if (z2[0] > z[1] || z2[1] < z[0]) return null;

  const overlap_point1 = [
    Math.max(x[0], x2[0]),
    Math.max(y[0], y2[0]),
    Math.max(z[0], z2[0]),
  ];
  const overlap_point2 = [
    Math.min(x[1], x2[1]),
    Math.min(y[1], y2[1]),
    Math.min(z[1], z2[1]),
  ];

  const x3 = [overlap_point1[0], overlap_point2[0]];
  const y3 = [overlap_point1[1], overlap_point2[1]];
  const z3 = [overlap_point1[2], overlap_point2[2]];

  const overlapCuboid = [x3, y3, z3];

  return overlapCuboid;
};

// cuboid = [[x1,x2], [y1,y2], [z1,z2]]
const getVolume = (cuboid) => {
  const x = cuboid[0];
  const y = cuboid[1];
  const z = cuboid[2];
  return (x[1] - x[0] + 1) * (y[1] - y[0] + 1) * (z[1] - z[0] + 1);
};

const getOverwriteVolume = (cuboid, i) => {
  const x = cuboid[0];
  const y = cuboid[1];
  const z = cuboid[2];

  let totalVolume = 0;

  for (let j = i + 1; j < c; j++) {
    const x2 = input[j][1];
    const y2 = input[j][2];
    const z2 = input[j][3];

    const overlap = getOverlapPoints([x, y, z], [x2, y2, z2]);
    if (!overlap) continue;
    totalVolume += getVolume(overlap) - getOverwriteVolume(overlap, j);
  }

  return totalVolume;
};

///////////////////////////////////////////////////////////////////////
/////////////////////////////  MAIN LOOP  /////////////////////////////
///////////////////////////////////////////////////////////////////////

let total = 0;
const c = input.length;
for (let i = 0; i < c; i++) {
  if (input[i][0] === "off") continue;

  const x = input[i][1];
  const y = input[i][2];
  const z = input[i][3];

  let cuboid_volume = getVolume([x, y, z]);

  total += cuboid_volume - getOverwriteVolume([x, y, z], i);
}

console.log(total);
