let fs = require('fs');

let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function printMatrix(m) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        let s = '';
        for(let j = 0; j < row.length; j++) {
            s += row[j];
        }
        console.log(s);
    }
}

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

function calc(m) {
    let ret = 0;
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            if (row[j] === '*') {
                ret++;
            }
        }
    }
    return ret;
}

let matrix = new Array(1000);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(1000).fill('.');
}

for(let i in arr)
{
    let obj = parse(arr[i]);
    mark(matrix, obj);
}

let res = calc(matrix);
console.log(res);