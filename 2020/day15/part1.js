const input = [14, 8, 16, 0, 1, 17]; //My puzzle input

function playGame(arr) {
  // object for tracking last time numbers were said
  let tracker = {};
  for (let i = 0; i < arr.length - 1; i++) {
    tracker[arr[i]] = i;
  }

  for (let i = arr.length - 1; i < 2020; i++) {
    if (tracker[arr[i]] != undefined) {
      arr.push(i - tracker[arr[i]]);
      tracker[arr[i]] = i;
    } else {
      arr.push(0);
      tracker[arr[i]] = i;
    }
  }

  return arr[2019];
}

console.log("ANSWER: ", playGame(input));
