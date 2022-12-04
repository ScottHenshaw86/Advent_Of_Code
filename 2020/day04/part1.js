const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .split(/(\n){2,}/g);

function numValid(arr) {
  let valid = 0;
  for (let i = 0; i < text.length; i += 2) {
    if (
      arr[i].indexOf("byr") > -1 &&
      arr[i].indexOf("iyr") > -1 &&
      arr[i].indexOf("eyr") > -1 &&
      arr[i].indexOf("hgt") > -1 &&
      arr[i].indexOf("hcl") > -1 &&
      arr[i].indexOf("ecl") > -1 &&
      arr[i].indexOf("pid") > -1
    ) {
      valid++;
    }
  }
  return valid;
}

console.log(numValid(text));
