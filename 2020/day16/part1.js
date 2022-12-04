const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n\r\n)/g)
  .filter((el) => el !== "\r\n\r\n");

function handleRules(arr) {
  let rules = arr[0].match(/[0-9]+-[0-9]+/g).map((el) => el.split("-"));
  let validNums = new Set();

  for (let i = 0; i < rules.length; i++) {
    for (let j = parseInt(rules[i][0]); j <= parseInt(rules[i][1]); j++) {
      validNums.add(j);
    }
  }

  return validNums;
}

function handleTickets(arr) {
  let ticketsData = arr[2].split("\r\n");
  ticketsData.shift();
  let tickets = ticketsData.map((el) => el.split(","));

  return tickets;
}

function checkTSER(arr) {
  let tickets = handleTickets(arr);
  let validNums = handleRules(arr);
  let TSER = 0;
  for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < tickets[i].length; j++) {
      TSER = !validNums.has(parseInt(tickets[i][j]))
        ? TSER + parseInt(tickets[i][j])
        : TSER;
    }
  }

  return TSER;
}

console.log("TSER: ", checkTSER(text));
