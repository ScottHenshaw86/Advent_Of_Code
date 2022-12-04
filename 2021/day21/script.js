// Advent Of Code 2021 - Day 21: Part 1

// Sample
// const player1 = {
//   pos: 4,
//   score: 0,
// };

// const player2 = {
//   pos: 8,
//   score: 0,
// };

// My Input
const player1 = {
  pos: 10,
  score: 0,
};

const player2 = {
  pos: 4,
  score: 0,
};

let die = 0;
let rolls = 0;

const roll = () => {
  die++;
  rolls++;
  if (die > 100) die = 1;
  return die;
};

const playGame = (player) => {
  const roll1 = roll();
  const roll2 = roll();
  const roll3 = roll();
  const rollSum = roll1 + roll2 + roll3;

  const moves = rollSum % 10;

  if (player.pos + moves > 10) {
    player.pos = player.pos - (10 - moves);
  } else {
    player.pos = player.pos + moves;
  }

  player.score += player.pos;
};

while (player1.score < 1000 && player2.score < 1000) {
  playGame(player1);
  if (player1.score > 999) {
    console.log(`LOSER - Player2 - Score: ${player2.score}`);
    console.log(`ROLLS: ${rolls}`);
    console.log(player2.score * rolls);
  } else {
    playGame(player2);
  }

  if (player2.score > 999) {
    console.log(`LOSER - Player1 - Score: ${player1.score}`);
    console.log(`ROLLS: ${rolls}`);
    console.log(player1.score * rolls);
  }
}
