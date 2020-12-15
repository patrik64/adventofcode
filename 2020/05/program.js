let fs = require('fs');
let input = fs.readFileSync('Day5.in', 'utf8');
let arr = input.split('\n');

function step(inst, lower, upper) {
    let ret = []

    let half = (upper - lower + 1) / 2;
    if(inst === 'F' || inst === 'L') {
        upper = upper - half;
    } else {
        lower = lower + half;
    }
    ret.push(lower);
    ret.push(upper);
    return ret;
}

function findRow(input) {
    let lower = 0;
    let upper = 127;

    for(let i = 0; i < 7; i++) {
        [lower, upper] = step(input[i], lower, upper);
    }

    if(upper !== lower) console.log('error!!!');
    return upper;
}

function findCol(input) {
    let lower = 0;
    let upper = 7;
    for(let i = 7; i < 10; i++) {
        [lower, upper] = step(input[i], lower, upper);
    }

    if(upper !== lower) console.log('error!!!');
    return upper;
}

let res = 0;
for (let i in arr) {
    let line = arr[i];

    let row = findRow(line);
    let col = findCol(line);
    let seatID = row * 8 + col;
    if (seatID > res) res = seatID
}

console.log(res);
