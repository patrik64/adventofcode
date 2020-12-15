let fs = require('fs');
let input = fs.readFileSync('Day11.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = [];
    let idx = 0;

    str = str.trim();

    while(idx < str.length)
    {
        let ch = str[idx];
        ret.push(ch);
        idx++;
    }

    return ret;
}

function printMtx(m) {
    for(var i in m) {
        var str = m[i].join('');
        console.log(str);
    }
}

function flipSeat(mtx, y, x) {
    if(y >= 0 && y < mtx.length && x >= 0 && x < mtx[y].length) {
        let el = mtx[y][x];
        if(el === 'L')
            mtx[y][x] = '#'
        if(el === '#')
            mtx[y][x] = 'L'
    }
}

function isSeatEmpty(mtx, y, x) {
    if(y >= 0 && y < mtx.length && x >= 0 && x < mtx[y].length) {
        let el = mtx[y][x]
        if (el === '#')
            return false;
    }
    return true;
}

function isSeatOccupied(mtx, y, x) {
    if(y >= 0 && y < mtx.length && x >= 0 && x < mtx[y].length) {
        let el = mtx[y][x]
        if (el === '#')
            return true;
    }
    return false;
}

function isEmpty(mtx, y, x) {
    //upper left
    let pX = x - 1;
    let pY = y - 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //upper
    pX = x;
    pY = y - 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //upper right
    pX = x + 1;
    pY = y - 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //left
    pX = x - 1;
    pY = y;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //right
    pX = x + 1;
    pY = y;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //lower left
    pX = x - 1;
    pY = y + 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //lower
    pX = x;
    pY = y + 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    //lower right
    pX = x + 1;
    pY = y + 1;
    if(!isSeatEmpty(mtx, pY, pX)) return false;
    return true;
}

function isOccupied(mtx, y, x) {
    let res = 0;
    //upper left
    let pX = x - 1;
    let pY = y - 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //upper
    pX = x;
    pY = y - 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //upper right
    pX = x + 1;
    pY = y - 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //left
    pX = x - 1;
    pY = y;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //right
    pX = x + 1;
    pY = y;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //lower left
    pX = x - 1;
    pY = y + 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //lower
    pX = x;
    pY = y + 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    //lower right
    pX = x + 1;
    pY = y + 1;
    if(isSeatOccupied(mtx, pY, pX)) res++;
    if(res >= 4)
        return true;
    return false;
}

function turn(mtx, cleanMtx) {
    for(let i = 0; i < cleanMtx.length; i++) {
        for(let j = 0; j < cleanMtx[i].length; j++) {
            if(mtx[i][j] !== '.') {
                if(mtx[i][j] === 'L' && isEmpty(cleanMtx, i, j)) {
                    flipSeat(mtx, i, j);
                }
                if(mtx[i][j] === '#' && isOccupied(cleanMtx, i, j)) {
                    flipSeat(mtx, i, j);
                }
            }
        }
    }
}

function sameMatrix(m1, m2) {
    for(let i = 0; i < m1.length; i++) {
        for(let j = 0; j < m1[i].length; j++) {
            if(m1[i][j] !== m2[i][j])
                return false;
        }
    }
    return true;
}

function countOccupiedSeats(mtx) {
    let count = 0;
    for(let i = 0; i < mtx.length; i++) {
        for(let j = 0; j < mtx[i].length; j++) {
            if(mtx[i][j] === '#')
                count++;
        }
    }
    return count;
}


let matrix = [];
for (let i in arr) {
   let line = arr[i];
   let row = parse(line);
   matrix.push(row);
}

let cleanMtx = JSON.parse(JSON.stringify(matrix));
turn(matrix, cleanMtx)

let turns = 0;
while(!sameMatrix(matrix, cleanMtx)){
    turns++;
    cleanMtx = JSON.parse(JSON.stringify(matrix));
    turn(matrix, cleanMtx)
}

let count = countOccupiedSeats(matrix);

console.log(count)
