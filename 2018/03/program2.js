let fs = require('fs');

let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function parse(str)
{
    let args = str.split(' ');
    let coord = args[2].split(',');

    // let ret = parseInt(str);
    let xOffset = Number(coord[0]);
    let yOffset = coord[1].slice(0,-1);
    yOffset = Number(yOffset);
   
    let xy = args[3].split('x');
    let x = Number(xy[0]);
    let y = Number(xy[1]);

    return {
            'id': args[0].substring(1),
            'xOffset': xOffset,
            'yOffset': yOffset,
            'x': x,
            'y': y
    };
}

function mark(m, o) {
    for(let i = 0; i < o.y; i++) {
        for(let j = 0; j < o.x; j++) {
            if(m[i+o.yOffset][j+o.xOffset] === 'x'  || m[i+o.yOffset][j+o.xOffset] === '*') {
                m[i+o.yOffset][j+o.xOffset] = '*';
            } else {
                m[i+o.yOffset][j+o.xOffset] = 'x';
            }
        }
    }
}

function check(m, o) {
    for(let i = 0; i < o.y; i++) {
        for(let j = 0; j < o.x; j++) {
            if(m[i+o.yOffset][j+o.xOffset] === '*') {
                return false;
            }
        }
    }
    return true;
}

let dim = 1000;
let matrix = new Array(dim);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dim).fill('.');
}

let claims = []
for(let i in arr) {
    let claim = parse(arr[i]);
    claims.push(claim);
}

for(let c in claims) {
    mark(matrix, claims[c]);
}

for(let c in claims) {
    if(check(matrix, claims[c])) {
        console.log(claims[c].id);
    }
}