const fs = require("fs");

let text = fs
  .readFileSync("./input.txt")
  .toString()
  .replace(/ /g, '","')
  .replace(/:/g, '":"')
  .split(/(\n){2,}/g)
  .filter((el) => el != "\r\n")
  .map((el) => '{"' + el + '"}')
  .map((el) => el.replace(/[\n]/g, '"'))
  .map((el) => el.replace(/""/g, '","'))
  .map((el) => JSON.parse(el));

function checkByr(byr) {
  if (parseInt(byr) >= 1920 && parseInt(byr) <= 2002) {
    return true;
  } else {
    return false;
  }
}

function checkIyr(iyr) {
  if (parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020) {
    return true;
  } else {
    return false;
  }
}

function checkEyr(eyr) {
  if (parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030) {
    return true;
  } else {
    return false;
  }
}

function checkHgt(hgt) {
  const value = parseInt(hgt);
  const units = hgt.substring(hgt.length - 2);
  if (units === "cm" && parseInt(value) >= 150 && parseInt(value) <= 193) {
    return true;
  } else if (units === "in" && parseInt(value) >= 59 && parseInt(value) <= 76) {
    return true;
  } else {
    return false;
  }
}

function checkHcl(hcl) {
  const regex = /^#([0-9a-f]){6}$/gi;
  return regex.test(hcl) ? true : false;
}

function checkEcl(ecl) {
  if (
    ecl === "amb" ||
    ecl === "blu" ||
    ecl === "brn" ||
    ecl === "gry" ||
    ecl === "grn" ||
    ecl === "hzl" ||
    ecl === "oth"
  ) {
    return true;
  } else {
    return false;
  }
}

function checkPid(pid) {
  const regex = /^([0-9]){9}$/g;
  return regex.test(pid) ? true : false;
}

function numValid(arr) {
  let valid = 0;

  for (let i = 0; i < arr.length; i++) {
    if (
      "byr" in arr[i] &&
      "iyr" in arr[i] &&
      "eyr" in arr[i] &&
      "hgt" in arr[i] &&
      "hcl" in arr[i] &&
      "ecl" in arr[i] &&
      "pid" in arr[i]
    ) {
      if (
        checkByr(arr[i].byr) &&
        checkIyr(arr[i].iyr) &&
        checkEyr(arr[i].eyr) &&
        checkHgt(arr[i].hgt) &&
        checkHcl(arr[i].hcl) &&
        checkEcl(arr[i].ecl) &&
        checkPid(arr[i].pid)
      ) {
        valid++;
      }
    }
  }

  return valid;
}

console.log(numValid(text));
