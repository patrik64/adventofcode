//input
player1 = { pos: 10, points: 0 };
player2 = { pos: 1, points: 0 };

function toKey(player1, player2, b) {
  return JSON.stringify(player1) + '#' + JSON.stringify(player2) + '#' + JSON.stringify(b);
}

function play(player1, player2, turnOdd, score){

  let res = toKey(player1, player2, turnOdd);
  if(res in score) {
    return score[res];
  }

  let player1Won = 0;
  let player2Won = 0;

  for(let i = 1; i <= 3; i++) {
    for(let j = 1; j <= 3; j++) {
      for(let k = 1; k <= 3; k++) {
        let sum = i+j+k;
        let nextPos = -1;
        let nextPoints = -1;
        if(turnOdd) {
          nextPos = player1.pos;
          nextPos += sum;
          nextPos -= 1;
          nextPos = nextPos % 10;
          nextPos += 1;
          
          nextPoints = player1.points + nextPos;

          if(nextPoints >= 21) {
            player1Won += 1;
          } else {
            let p1 = { pos: nextPos, points: nextPoints };
            let res = play(p1, player2, !turnOdd, score);
            player1Won += res[0];
            player2Won += res[1];
          }
        } else {
          nextPos = player2.pos;
          nextPos += sum;
          nextPos -= 1;
          nextPos = nextPos % 10;
          nextPos += 1;

          nextPoints = player2.points + nextPos;

          if(nextPoints >= 21) {
            player2Won += 1;
          } else {
            let p2 = { pos: nextPos, points: nextPoints };
            let res = play(player1, p2, !turnOdd, score);
            player1Won += res[0];
            player2Won += res[1];
          }
        }
      }
    }
  }
  let key = toKey(player1, player2, turnOdd);
  score[key] = [player1Won, player2Won];
  return [player1Won, player2Won];
}

let turnOdd = true;
let score = {};

let ret = play(player1, player2, turnOdd, score);

console.log(Math.max(ret[0], ret[1]));