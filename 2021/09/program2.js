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
            if(isLowPoint(m, val, i, j)) {
                ret.push(getBasin(m, i, j));
            }
                
        }
    }
    return ret;
}

function isLowPoint(m, val, y, x) {
    let limitX = m[0].length;
    let limitY = m.length;
    //up
    if(((y-1) >= 0) && ((y-1) < limitY)) {
        if(m[y-1][x] <= val) return false;
    }
    //left
    if(((x-1) >= 0) && ((x-1) < limitX)) {
        if(m[y][x-1] <= val)
            return false;
    }
    //right
    if(((x+1) >= 0) && ((x+1) < limitX)) {
        if(m[y][x+1] <= val)
            return false;
    }
    //down
    if(((y+1) >= 0) && ((y+1) < limitY)) {
        if(m[y+1][x] <= val)
            return false;
    }
    return true;
}

function concatUnique(arr1, arr2) {
    let ret = [...arr1, ...arr2];
    ret = ret.filter((el, index, self) => index === self.findIndex((c) => (c.x === el.x && c.y === el.y)));
    return ret;
}

function getBasin(m, y, x) {
    let ret = [];
    let limitX = m[0].length;
    let limitY = m.length;
    let val = m[y][x];

    //up
    if(((y-1) >= 0) && ((y-1) < limitY)) {
        let next = m[y-1][x];
        if(next !==9 && next > val) {
            ret.push({'x' : x, 'y' : y - 1});
            let nextBasin = getBasin(m, y-1, x);
            ret = concatUnique(ret, nextBasin);
        }
    }
    //left
    if(((x-1) >= 0) && ((x-1) < limitX)) {
        let next = m[y][x-1];
        if(next !==9 && next > val) {
            ret.push({'x' : x - 1, 'y' : y});
            let nextBasin = getBasin(m, y, x-1);
            ret = concatUnique(ret, nextBasin);
        }
    }
    //right
    if(((x+1) >= 0) && ((x+1) < limitX)) {
        let next = m[y][x+1];
        if(next !==9 && next > val) {
            ret.push({'x' : x + 1, 'y' : y});
            let nextBasin = getBasin(m, y, x + 1);
            ret = concatUnique(ret, nextBasin);
        }
    }
    //down
    if(((y+1) >= 0) && ((y+1) < limitY)) {
        let next = m[y+1][x];
        if(next !==9 && next > val) {
            ret.push({'x' : x, 'y' : y + 1});
            let nextBasin = getBasin(m, y + 1, x);
            ret = concatUnique(ret, nextBasin);
        }
    }
    return ret;
}

let dimX = arr.length;
let dimY = arr[0].length;

let matrix = new Array(dimX);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimY).fill('.');
}


for(let i = 0; i < arr.length; i++) {
    let nums = arr[i].split('').map(x => Number(x));
    matrix[i] = nums
}

let lowPoints = [];
lowPoints = collectLowPoints(matrix);

let basins = [];
for(let x in lowPoints) {
    let n = lowPoints[x].length + 1;
    basins.push(n);
}

basins.sort(function(a, b){return b - a});

let result = basins[0] * basins[1] * basins[2];
console.log(result);
