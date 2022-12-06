let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function result(p1, p2) {
    let res = 0;
    if (p1 === 'A') {
        if (p2 === 'Z') {
            //win -> paper Y
            return 6+2;
        }
        if (p2 === 'Y') {
            //draw -> rock X
            return 3+1;
        }
        if (p2 === 'X') {
            //loose -> scissors Z
            return 0+3;
        }
    }
    if(p1 === 'B') {
        if (p2 === 'Z') {
            //win -> scissors Z
            return 6+3;
        }
        if (p2 === 'Y') {
            //draw -> paper Y
            return 3+2; 
        }
        if (p2 === 'X') {
            //loose -> rock X
            return 0+1;
        }
    }
    if(p1 === 'C') {
        if (p2 === 'Z') {
            //win -> rock X
            return 6+1;
        }
        if (p2 === 'Y') {
            //draw -> scissors Z
            return 3+3; 
        }
        if (p2 === 'X') {
            //loose -> paper Y
            return 0+2;
        }
    }
    return -1000000000;
}

let sum = 0;
for(let i = 0; i < arr.length; i++) {
    let p1 = arr[i][0];
    let p2 = arr[i][2];


    let turn = result(p1, p2);
    sum += turn;
}

console.log(sum);