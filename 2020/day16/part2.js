const fs = require("fs");

var text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\r\n\r\n)/g)
  .filter((el) => el !== "\r\n\r\n");

function handleRules(str) {
  let rules = str.match(/[0-9]+-[0-9]+/g).map((el) => el.split("-"));
  let validNums = new Set();

  for (let i = 0; i < rules.length; i++) {
    for (let j = parseInt(rules[i][0]); j <= parseInt(rules[i][1]); j++) {
      validNums.add(j);
    }
  }

  return validNums;
}

function handleTickets(str) {
  let ticketsData = str.split("\r\n");
  ticketsData.shift();
  let tickets = ticketsData.map((el) => el.split(","));

  return tickets;
}

function tossInvalid(arr) {
  let tickets = handleTickets(arr[2]);
  let validNums = handleRules(arr[0]);

  for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < tickets[i].length; j++) {
      if (!validNums.has(parseInt(tickets[i][j]))) {
        tickets.splice(i, 1);
        i--;
      }
    }
  }
  return tickets;
}

function getNewRules(str) {
  let rules = str.match(/[0-9]+-[0-9]+/g).map((el) => el.split("-"));
  return rules;
}

function testRules(tickets, newRules, k) {
  let nums = [];
  for (let i = 0; i < tickets[0].length; i++) {
    nums.push(i);
  }
  for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < newRules.length; j += 2) {
      let a = parseInt(tickets[i][k]);
      let b = parseInt(newRules[j][0]);
      let c = parseInt(newRules[j][1]);
      let d = parseInt(newRules[j + 1][0]);
      let e = parseInt(newRules[j + 1][1]);
      if (a < b || (a > c && a < d) || a > e) {
        let index = nums.indexOf(j / 2);
        nums.splice(index, 1);
        if (nums.length === 1) {
          return nums;
        }
      }
    }
  }
  return nums;
}
function start(arr) {
  let tickets = tossInvalid(arr);
  let newRules = getNewRules(arr[0]);

  let rulesArr = [];
  for (let k = 0; k < tickets[0].length; k++) {
    let result = testRules(tickets, newRules, k);
    rulesArr.push(result);
  }

  let orderedRules = [];

  let i = 0;
  let k = 0;
  let filtered = [];
  while (filtered.length < rulesArr.length) {
    filtered = orderedRules.filter((el) => el != undefined);
    if (filtered.length > 0) {
      rulesArr[i] = rulesArr[i].filter(function (el) {
        return !orderedRules.includes(el);
      });
    }
    if (rulesArr[i].length === 1) {
      orderedRules[i] = rulesArr[i][0];
      rulesArr[i].splice(0, 1);
    }
    if (i === rulesArr.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }

  let getTicket = arr[1].split("\r\n");
  let myTicket = getTicket[1].split(",").map((el) => parseInt(el));
  let product = 1;
  // departure fields = first 6 fields on the rules list
  for (let i = 0; i < 6; i++) {
    let index = orderedRules.indexOf(i);
    product *= myTicket[index];
  }

  return product;
}

console.log("RESULT: ", start(text));
