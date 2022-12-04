const input = [7, 12, 1, 0, 16, 2]; //My puzzle input

function playGame(arr) {
  let tracker = new Map();
  for (let i = 0; i < arr.length - 1; i++) {
    tracker.set(arr[i], i);
  }

  let a = arr[arr.length - 1];
  let b;

  for (let i = arr.length - 1; i < 30000000; i++) {
    b = a;
    let c = tracker.get(a);
    a = c != undefined ? i - c : 0;
    tracker.set(b, i);
  }

  return b;
}

console.log("ANSWER: ", playGame(input));
