let fs = require('fs');
const { resourceLimits } = require('worker_threads');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

function result(p1, p2) {
    let res = 0;
    if (p1 === 'A') {
        if (p2 === 'X')
            return 1+3;
        if (p2 === 'Y')
            return 2+6;
        if (p2 === 'Z')
            return 3+0;
    }
    if(p1 === 'B') {
        if (p2 === 'X') {
            return 1+0;
        }
        if (p2 === 'Y') {
            return 2+3; 
        }
        if (p2 === 'Z') {
            return 3+6;
        }
    }
    if(p1 === 'C') {
        if (p2 === 'X') {
            return 1+6;
        }
        if (p2 === 'Y') {
            return 2+0; 
        }
        if (p2 === 'Z') {
            return 3+3;
        }
    }
    return -1000000000;
}

let sum = 0;
for(let i = 0; i < arr.length; i++) {
    let p1 = arr[i][0];
    let p2 = arr[i][2];

    sum += result(p1, p2);
}

console.log(sum);