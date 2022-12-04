const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .replace(/\s/g, "")
  .replace(/(bags)/g, "bag")
  .replace(/^/, '{"')
  .replace(/\.$/, '"}')
  .replace(/,/g, "")
  .replace(/contain/g, '":"')
  .replace(/\./g, '","');

let rules = JSON.parse(text);

function countBagsInside(obj, bag) {
  let str = obj[bag];

  if (str === "nootherbag") {
    return 0;
  } else {
    let arr = str.match(/[0-9]/g) || [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      count += parseInt(arr[i]);
    }

    let bags = str
      .replace(/[0-9]/g, "")
      .replace(/bag/g, "bag?")
      .split("?")
      .filter((el) => el != "");

    for (let i = 0; i < bags.length; i++) {
      let bagsInside = parseInt(arr[i]) * countBagsInside(obj, bags[i]);
      count += bagsInside;
    }

    return count;
  }
}

function bagsInBagsInBags(obj, bag) {
  let numBags = countBagsInside(obj, bag);
  return numBags;
}

console.log("TOTAL: ", bagsInBagsInBags(rules, "shinygoldbag"));
