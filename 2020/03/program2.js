let fs = require('fs');

let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let ret = []
    while(idx < str.length) {
        if(str[idx] === '.')
            ret.push(0)
        else if(str[idx] === '#')
            ret.push(1)
        idx++;
    }
    return ret;
}


let currPos = 0;
let trees = 0;

let matrix = [];
for (let i in arr) {
    let line = arr[i];
    let obj = parse(line);
    let cp = []
    for(let i = 0; i < 200; i++)
        cp = [...cp, ...obj]
    matrix.push(cp);    
}

let t1 = 0;
for (let i = 0; i < matrix.length-1; i++) {
    currPos += 1;
    if(matrix[i+1][currPos] === 1) {
        t1 += 1;
    }
}
currPos = 0;

let t2 = 0;
for (let i = 0; i < matrix.length-1; i++) {
    currPos += 3;
    if(matrix[i+1][currPos] === 1) {
        t2 += 1;
    }
}

currPos = 0;

let t3 = 0;
for (let i = 0; i < matrix.length-1; i++) {
    currPos += 5;
    if(matrix[i+1][currPos] === 1) {
        t3 += 1;
    }
}

currPos = 0;

let t4 = 0;
for (let i = 0; i < matrix.length-1; i++) {
    currPos += 7;
    if(matrix[i+1][currPos] === 1) {
        t4 += 1;
    }
}

currPos = 0;

let t5 = 0;
for (let i = 0; i < matrix.length-2; i+=2) {
    currPos += 1;
    if(matrix[i+2][currPos] === 1) {
        t5 += 1;
    }
}

trees = t1*t2*t3*t4*t5;
console.log(trees);
