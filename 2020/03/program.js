let fs = require('fs');

let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    var idx = 0;
    var ret = []
    while(idx < str.length) {
        if(str[idx] === '.')
            ret.push(0)
        else if(str[idx] === '#')
            ret.push(1)
        idx++;
    }
    return ret;
}

let matrix = [];
for (var i in arr) {
    var line = arr[i];
    var obj = parse(line);
    let cp = []
    for(let i = 0; i < 200; i++)
        cp = [...cp, ...obj]
    matrix.push(cp);
}

let currPos = 0;
let trees = 0;

for (let i = 0; i < matrix.length-1; i++) {
    currPos += 3;
    if(matrix[i+1][currPos] === 1) {
        trees += 1;
    }
}

console.log(trees);