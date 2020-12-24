let player1 = [41,26,29,11,50,38,42,20,13,9,40,43,10,24,35,30,23,15,31,48,27,44,16,12,14];
let player2 = [18,6,32,37,25,21,33,28,7,8,45,46,49,5,19,2,39,4,17,3,22,1,34,36,47];

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function checkHistory(hist, p1, p2) {
    for(let h in hist) {
        if(arraysEqual(hist[h]['player1'], p1) && arraysEqual(hist[h]['player2'], p2))
            return true;
    }
    return false;
}

function game(player1, player2) {
    let roundnr = 1;
    let hist = {};

    while(player1.length > 0 && player2.length > 0) {
        if(checkHistory(hist, player1, player2)) {
            return { 'winner' : 'player1', 'deck' : player1 };
        }

        let hp1 = [...player1];
        let hp2 = [...player2];
        hist[roundnr] = { 'player1' : hp1, 'player2' : hp2 };

        let card1 = player1[0];
        let card2 = player2[0];

        player1.shift();
        player2.shift();

        if(card1 <= player1.length && card2 <= player2.length) {
            let p1 = [];
            let p2 = [];
            for(let i = 0; i < card1; i++) {
                p1.push(player1[i]);
            }
            for(let j = 0; j < card2; j++) {
                p2.push(player2[j]);
            }

            let result = game(p1, p2);
            if(result['winner'] === 'player1') {
                player1.push(card1, card2);
            } else {
                player2.push(card2, card1);
            }
        } else {
            if(card1 > card2) {
                player1.push(card1, card2);
            } else {
                player2.push(card2, card1);
            }
        }
        roundnr++;
    }

    if(player1.length > 0) {
        return { 'winner' : 'player1', 'deck' : player1 };
    }
    return { 'winner' : 'player2', 'deck' : player2 };
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

let gameResult = game(player1, player2);


let res = calcScore(gameResult['deck']);

console.log(res);