let player1 = [41,26,29,11,50,38,42,20,13,9,40,43,10,24,35,30,23,15,31,48,27,44,16,12,14];
let player2 = [18,6,32,37,25,21,33,28,7,8,45,46,49,5,19,2,39,4,17,3,22,1,34,36,47];

function round(player1, player2) {
    let card1 = player1[0];
    let card2 = player2[0];

    player1.shift();
    player2.shift();
    if(card1 > card2) {
        player1.push(card1, card2);
    } else {
        player2.push(card2, card1);
    }
}

function calcScore(player) {
    let res = 0;
    let counter = 1;
    for(let i = player.length-1; i >= 0; i--) {
        let card = player[i];
        res += card * counter;
        counter++;
    }
    return res;
}

while(player1.length > 0 && player2.length > 0) {
    round(player1, player2);
}

let res = 0;
if(player1.length > 0)
    res = calcScore(player1);
else
    res = calcScore(player2);

console.log(res)