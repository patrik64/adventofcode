let fs = require('fs');
let input = fs.readFileSync('Day9.in', 'utf8');
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

function collectLowPoints(m) {
    let ret = [];
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            if(isLowPoint(m, val, i, j))
                ret.push(val);
        }
    }
    return ret;
}

function isLowPoint(m, val, y, x) {
    let limitX = m[0].length;
    let limitY = m.length;
    
    //up
    if (y-1 >= 0 && y-1 < limitY) {
        if(m[y-1][x] <= val) return false;
    }
    //left
    if(x-1 >= 0 && x-1 < limitX) {
        if(m[y][x-1] <= val)
            return false;
    }
    //right
    if (x+1 >= 0 && x+1 < limitX) {
        if(m[y][x+1] <= val)
            return false;
    }
    //down
    if (y+1 >= 0 && y+1 < limitY) {
        if(m[y+1][x] <= val)
            return false;
    }
    return true;
}

let dimY = arr.length;
let dimX = arr[0].length;

let matrix = new Array(dimY);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimX).fill('.');
}

for(let i in arr) {
    let nums = arr[i].split('').map(x => Number(x));
    matrix[i] = nums;
}

let lowPoints = [];
lowPoints = collectLowPoints(matrix);
lowPoints = lowPoints.map(x => x+1);
const reducer = (prev, curr) => prev + curr;
console.log(lowPoints.reduce(reducer));