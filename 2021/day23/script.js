// #############
// #...........#
// ###B#A#A#D###
//   #D#C#B#C#
//   #########

const input = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ["#", "#", "B0", "#", "A0", "#", "A1", "#", "D0", "#", "#"],
  ["#", "#", "D1", "#", "C0", "#", "B1", "#", "C1", "#", "#"],
];

const targets = {
  A: ["1-2", "2-2"],
  B: ["1-4", "2-4"],
  C: ["1-6", "2-6"],
  D: ["1-8", "2-8"],
};

const multipliers = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const amphipods = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

let totalEnergyUsed = 999999;

const checkFinished = (array, energyUsed) => {
  console.log(energyUsed);
  if (array[1][2][0] !== "A") return false;
  if (array[2][2][0] !== "A") return false;
  if (array[1][4][0] !== "B") return false;
  if (array[2][4][0] !== "B") return false;
  if (array[1][6][0] !== "C") return false;
  if (array[2][6][0] !== "C") return false;
  if (array[1][8][0] !== "D") return false;
  if (array[2][8][0] !== "D") return false;
  if (energyUsed < totalEnergyUsed) {
    totalEnergyUsed = energyUsed;
  }
  return true;
};

const getEnergyUsage = (starti, startj, endi, endj, amph_type) => {
  // console.log("do something");
  const horizontal = Math.abs(startj - endj);
  let vertical = 0;
  if (starti === 0 || endi === 0) {
    vertical = Math.abs(starti - endi);
  } else {
    vertical = starti + endi;
  }
  const total = horizontal + vertical;
  return total * multipliers[amph_type];
};

const moveAmphipod = (
  amphipod,
  amph_i,
  amph_j,
  array,
  amph_moves,
  energyUsed
) => {
  // for (let i = 0; i < array.length; i++) {
  //   console.log(array[i].join(""));
  // // }
  // console.log(" ");
  // console.log(" ");
  // console.log("MOVE AMPHIPOD");
  // amph_moves[amphipod] ? amph_moves[amphipod] + 1 : 0;
  const amph_type = amphipod[0];
  // console.log(`AMPH-TYPE: ${amph_type}`);
  let moves = amph_moves[amphipods[amphipod]];

  if (moves > 1) return; // already moved twice, can't move again
  if (targets[amph_type][1] === `${amph_i}-${amph_j}`) return; // already in target location

  // both amphipods already in correct room
  if (
    targets[amph_type][0] === `${amph_i}-${amph_j}` &&
    array[amph_i + 1][amph_j][0] === amph_type
  )
    return;

  if (moves === 0 && arr[amph_i - 1][amph_j] !== ".") return; // blocked in, can't move

  // check range L and R this amphipod can move
  let range = [];

  // look left for amphipods blocking the hallway
  for (let i = amph_j; i >= 0; i--) {
    if (i === 2 || i === 4 || i === 6 || i === 8) continue; // can't stop in front of rooms
    if (array[0][i] !== ".") break; // blocked by another amphipod
    range.push(i);
  }

  // look right for amphipods blocking the hallway
  for (let i = amph_j; i < 11; i++) {
    if (i === 2 || i === 4 || i === 6 || i === 8) continue; // can't stop in front of rooms
    if (array[0][i] !== ".") break; // blocked by another amphipod
    range.push(i);
  }

  // console.log("RANGE RANGE RANGE");
  // console.log(range);

  if (range.length === 0) return; // this amphipod can't move anywhere

  range = range.sort((a, b) => a - b);

  // check if can go into own room
  let wentIntoRoom = false;
  const target_column = targets[amph_type][0][2];
  if (range.includes(target_column)) {
    if (targets[amph_type][0] === "." && targets[amph_type][1] === ".") {
      const col = targets[amph_type][1][3];
      array[amph_i][amph_j] = ".";
      array[2][col] = amphipod;
      wentIntoRoom = true;
      // console.log(`${amphipod} WENT INTO ROOM 2`);
      const energy = getEnergyUsage(amph_i, amph_j, 2, col, amph_type);
      energyUsed += energy;
      if (checkFinished(array, energyUsed)) return;
      amph_moves[amphipods[amphipod]] = amph_moves[amphipods[amphipod]] + 1;
    } else if (
      targets[amph_type][0] === "." &&
      targets[amph_type][1][0] === amph_type
    ) {
      const col = targets[amph_type][1][3];
      array[amph_i][amph_j] = ".";
      array[1][col] = amphipod;
      wentIntoRoom = true;
      // console.log(`${amphipod} WENT INTO ROOM 1`);
      const energy = getEnergyUsage(amph_i, amph_j, 1, col, amph_type);
      energyUsed += energy;
      if (checkFinished(array, energyUsed)) return;
      amph_moves[amphipods[amphipod]] = amph_moves[amphipods[amphipod]] + 1;
    }
  }
  // console.log("line 135");

  if (!wentIntoRoom) {
    for (let i = 0; i < range.length; i++) {
      // console.log(`${amphipod} line 139`);
      const j = range[i];
      const energy = getEnergyUsage(amph_i, amph_j, 0, j, amph_type);
      energyUsed += energy;
      array[amph_i][amph_j] = ".";
      array[0][j] = amphipod;
      amph_moves[amphipods[amphipod]] + 1;
      // call recursive function for all other amphipods
      for (let j = 0; j < amphipods.length; j++) {
        console.log("NEXT AMPHIPOD");
        console.log(amphipods[j]);
        if (amphipods[j] === amphipod) continue;
        if (array[0].includes(amphipods[j])) {
          moveAmphipod(
            amphipods[j],
            0,
            array[0].indexOf(amphipods[j]),
            array,
            amph_moves,
            energyUsed
          );
        } else if (array[1].includes(amphipods[j])) {
          moveAmphipod(
            amphipods[j],
            1,
            array[0].indexOf(amphipods[j]),
            array,
            amph_moves,
            energyUsed
          );
        } else if (array[2].includes(amphipods[j])) {
          moveAmphipod(
            amphipods[j],
            2,
            array[0].indexOf(amphipods[j]),
            array,
            amph_moves,
            energyUsed
          );
        }
      }
    }
  } else {
    // call recursive function for all other amphipods
    for (let j = 0; j < amphipods.length; j++) {
      if (amphipods[j] === amphipod) continue;
      if (array[0].includes(amphipods[j])) {
        moveAmphipod(
          amphipods[j],
          0,
          array[0].indexOf(amphipods[j]),
          array,
          amph_moves,
          energyUsed
        );
      } else if (array[1].includes(amphipods[j])) {
        moveAmphipod(
          amphipods[j],
          1,
          array[0].indexOf(amphipods[j]),
          array,
          amph_moves,
          energyUsed
        );
      } else if (array[2].includes(amphipods[j])) {
        moveAmphipod(
          amphipods[j],
          2,
          array[0].indexOf(amphipods[j]),
          array,
          amph_moves,
          energyUsed
        );
      }
    }
  }

  // check if top and bottom rooms are free
  // if bottom room is taken, check if it is the right amphipod
  // check if path is clear
};

moveAmphipod("A0", 1, 4, input, [0, 0, 0, 0, 0, 0, 0, 0], 0);

console.log(totalEnergyUsed);
