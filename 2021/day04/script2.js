// Advent Of Code 2021 - Day 4: Part 2
const fs = require("fs");

// import and process data into usable format
const input = fs
  .readFileSync("./input.txt", "latin1")
  .split(/\n+/g)
  .map((a) => {
    const b = a.split(" ");
    return b.filter((el) => el.length > 0);
  });

// console.log(input);
// const input = [
//   ["7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1"],
//   ["22", "13", "17", "11", "0"],
//   ["8", "2", "23", "4", "24"],
//   ["21", "9", "14", "16", "7"],
//   ["6", "10", "3", "18", "5"],
//   ["1", "12", "20", "15", "19"],
//   ["3", "15", "0", "2", "22"],
//   ["9", "18", "13", "17", "5"],
//   ["19", "8", "7", "25", "23"],
//   ["20", "11", "10", "24", "4"],
//   ["14", "21", "16", "12", "6"],
//   ["14", "21", "17", "24", "4"],
//   ["10", "16", "15", "9", "19"],
//   ["18", "8", "23", "26", "20"],
//   ["22", "11", "13", "6", "5"],
//   ["2", "0", "12", "3", "7"],
// ];

// split off the call order into a separate array
const order = input.shift().shift().split(",");

// separate each board into an array of arrays of strings
let boards = [];
for (let i = 0; i < input.length - 1; i += 5) {
  const newArr = [];
  newArr.push(input[i], input[i + 1], input[i + 2], input[i + 3], input[i + 4]);
  boards.push(newArr);
}

// I decided to remove the subarrays in each board.
// so now each board is simply an array of 25 strings.
let newBoards = [];
for (let i = 0; i < boards.length; i++) {
  newBoards.push(boards[i].join().split(","));
}

// CHANGED FROM PART 1
let winRound = 0; // to find the highest round where a board gets its 1st bingo.
let winner = 0; // to store the index of the winning board

// these are all of possible ways to win
const row1 = [0, 1, 2, 3, 4];
const row2 = [5, 6, 7, 8, 9];
const row3 = [10, 11, 12, 13, 14];
const row4 = [15, 16, 17, 18, 19];
const row5 = [20, 21, 22, 23, 24];
const col1 = [0, 5, 10, 15, 20];
const col2 = [1, 6, 11, 16, 21];
const col3 = [2, 7, 12, 17, 22];
const col4 = [3, 8, 13, 18, 23];
const col5 = [4, 9, 14, 19, 24];

// i put all of the possible win scenarios in an array so I can loop through them
const winCombos = [row1, row2, row3, row4, row5, col1, col2, col3, col4, col5];

// loop through the boards
for (let i = 0; i < newBoards.length; i++) {
  const matches = []; // this will store the values that the board has as they are called
  let highIndex = 0; // store the round when a board gets a bingo

  const c = newBoards[0].length;
  // loop through the call order
  for (let j = 0; j < order.length; j++) {
    // if the board has the called number, add its INDEX to the matches array
    if (newBoards[i].includes(order[j])) {
      matches.push(newBoards[i].indexOf(order[j]));
      highIndex = j; // save the index of the currently called number
      let hasWon = false;
      // loop through the possible win combinations and check if the board is a winner
      for (let k = 0; k < 10; k++) {
        if (winCombos[k].every((val) => matches.indexOf(val) !== -1)) {
          hasWon = true; // if there's a bingo, set hasWon to true and break out of the loop
          break;
        }
      }
      // if there is a bingo, stop checking this board.
      if (hasWon) {
        break;
      }
    }
  }
  // CHANGED FROM PART 1
  // if this board won in more rounds than any previous board,
  // save the round that it won, and the board index
  if (highIndex >= winRound) {
    winRound = highIndex;
    winner = i;
  }
}

// get the list of numbers that were called up to the 1st bingo
const winningOrder = order.slice(0, winRound + 1);

let count = 0;

// loop through the numbers in the winning board.
// If they are not in the winning order, add them to the running total
for (let i = 0; i < newBoards[0].length; i++) {
  if (!winningOrder.includes(newBoards[winner][i])) {
    count += parseInt(newBoards[winner][i]);
  }
}

// calculate the final answer. sum of unmarked numbers * last number called
console.log(count * parseInt(winningOrder[winningOrder.length - 1]));
