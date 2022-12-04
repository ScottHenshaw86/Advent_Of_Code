// Advent Of Code 2021 - Day 8: Part 2
const fs = require("fs");

// import my puzzle input and format it into an array of numbers
const input = fs
  .readFileSync("./sample.txt", "latin1")
  .split(/\n/g)
  .map((a) => {
    return a.split("|");
  })
  .filter((b) => b[0].length > 0);

// console.log(input);
// [
//   ['be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb ', ' fdgacbe cefdb cefbgd gcbe'],
//   ['edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec ', ' fcgedb cgb dgebacf gc'],
//   ['fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef ',' cg cg fdcagb cbg'],
//   ['fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega ',' efabcd cedba gadfec cb'],
//   ['aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga ',' gecf egdcabf bgf bfgea'],
//   ['fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf ',' gebdcfa ecba ca fadegcb'],
//   ['dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf ',' cefg dcbef fcge gbcadfe'],
//   ['bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd ',' ed bcgafe cdgba cbgef'],
//   ['egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg ',' gbdfcae bgc cg cgb'],
//   ['gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc ',' fgae cfgab fg bagce']
// ]

const letters = ["a", "b", "c", "d", "e", "f", "g"];

const numMap = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdefg",
  7: "acf",
  8: "abcdefg",
  9: "abcdfg",
};

let count = 0;

const c = input.length;
for (let i = 0; i < c; i++) {
  // loop through input rows

  const letterMap = {
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  };
  // use the number of occurrences to determine B, E, and G segments
  letters.forEach((letter) => {
    const letterRegex = new RegExp(letter, "g");
    const count = (input[i][0].match(letterRegex) || []).length;
    if (count === 4) letterMap.e = letter;
    if (count === 6) letterMap.b = letter;
    if (count === 9) letterMap.f = letter;
  });

  // organize the 10 sample numbers in an array. first element is "", i'll ignore it for now.
  const signals = input[i][0].split(" ");
  // sort the 10 sample numbers by their character length
  const sortedSignals = signals.sort((a, b) => a.length - b.length);

  // check number 1 to ascertain C segment
  for (let i in sortedSignals[1]) {
    if (!Object.values(letterMap).includes(sortedSignals[1][i])) {
      letterMap.c = sortedSignals[1][i];
    }
  }

  // check number 7 to ascertain A segment
  for (let i in sortedSignals[2]) {
    if (!Object.values(letterMap).includes(sortedSignals[2][i])) {
      letterMap.a = sortedSignals[2][i];
    }
  }

  // check number 4 to ascertain D segment
  for (let i in sortedSignals[3]) {
    if (!Object.values(letterMap).includes(sortedSignals[3][i])) {
      letterMap.d = sortedSignals[3][i];
    }
  }

  // check number 8 to ascertain G segment
  for (let i in sortedSignals[10]) {
    if (!Object.values(letterMap).includes(sortedSignals[10][i])) {
      letterMap.g = sortedSignals[10][i];
    }
  }

  // store the output value for the current display
  let output = "";

  // determine what number each of the four output digits is
  const outValues = input[i][1].split(" ");
  // check each element in the output values
  for (let i = 1; i < 5; i++) {
    const value = outValues[i].split("");
    // replace the current letter with the correct segment
    value.forEach((letter, i) => {
      value[i] = Object.keys(letterMap).find(
        (key) => letterMap[key] === letter
      );
    });
    const sortedValue = value.sort().join("");

    // find the current value in numMap and add that number to the output value (string)
    output += Object.keys(numMap).find((key) => numMap[key] === sortedValue);
  }

  // add the current display output value to the running total
  count += parseInt(output);
}

console.log(count);
