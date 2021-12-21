//input
let player1Pos = 10;
let player2Pos = 1;


function move(player1Points, player2Points, dice, turn, player1Pos, player2Pos){
  let sum = 0;
  sum = dice + 1;
  sum += dice + 2;
  sum += dice  + 3;
  
  dice += 3;
  let points = sum % 10;
  if(points > 10) {
    points = points % 10;
  }

  if(turn%2 === 1) { 
    player1Pos += points;
    if(player1Pos > 10) {
      player1Pos = player1Pos % 10;  
    }
    player1Points += player1Pos;
  } else {
    player2Pos += points;
    if(player2Pos > 10) {
      player2Pos = player2Pos % 10;  
    }
    player2Points += player2Pos;
  }
  return [player1Points, player2Points, dice, player1Pos, player2Pos];
}

let player1Points = 0;
let player2Points = 0;

dice = 0;

for(let turn = 1; turn < 1000; turn++) {
  [player1Points, player2Points, dice, player1Pos, player2Pos] = move(player1Points, player2Points, dice, turn, player1Pos, player2Pos);
  if(player1Points >= 1000) {
    console.log(player2Points*turn*3);
    break;
  }  
  if(player2Points >= 1000) {
    console.log(player1Points*turn*3);
    break;
  }  
}