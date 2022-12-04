const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .replace(/\s/g, "")
  .replace(/[0-9]/g, "")
  .replace(/(bags)/g, "bag")
  .replace(/^/, '{"')
  .replace(/\.$/, '"}')
  .replace(/,/g, "")
  .replace(/contain/g, '":"')
  .replace(/\./g, '","');

let rules = JSON.parse(text);

function findShinyGold(str, obj) {
  if (str === "nootherbag") {
    console.log("no gold...");
    return false;
  } else {
    let newStr = str.replace(/bag/g, "bag?");
    let bags = newStr.split("?").filter((el) => el != "");

    for (let i = 0; i < bags.length; i++) {
      if (bags[i] === "shinygoldbag") {
        return true;
      } else {
        let newBag = bags[i];
        if (findShinyGold(obj[newBag], obj)) {
          return true;
        }
      }
    }
  }
}

function numGoldInside(obj) {
  let count = 0;

  Object.values(obj).forEach((val) => {
    if (findShinyGold(val, obj)) {
      count++;
    }
  });

  return count;
}

console.log(numGoldInside(rules));
