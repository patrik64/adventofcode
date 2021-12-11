let fs = require('fs');
let input = fs.readFileSync('Day11.in', 'utf8');
let arr = input.split('\n');

function printMatrix(m) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        let s = '';
        for(let j = 0; j < row.length; j++) {
            // s += row[j].x + ' ' + row[j].flashed + ' ';
            s += row[j].x;
        }
        console.log(s);
    }
}

function plus1(m){
    let ret = [];
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        let outrow = [];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            val.x += 1;
            outrow.push(val);
        }
        ret.push(outrow);
    }
    return ret;
}

function incAdjacent(m, y, x) {
    let limitX = m[0].length;
    let limitY = m.length;

    m[y][x].flashed = true;
    //console.log('limitX -->', limitX);
    //console.log('limitY -->', limitY);
   
    //up-left
    if (y-1 >= 0 && y-1 < limitY && x-1 >= 0 && x-1 < limitX ) {
        
        let o = m[y-1][x-1];
        let val = o.x + 1;
        m[y-1][x-1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y-1, x-1);
        }
    }
    //up
    if (y-1 >= 0 && y-1 < limitY) {

        let o = m[y-1][x];
        let val = o.x + 1;
        m[y-1][x].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y-1, x);
        }
    }
    //up-right
    if (y-1 >= 0 && y-1 < limitY && x+1 >= 0 && x+1 < limitX ) {
        
        let o = m[y-1][x+1];
        let val = o.x + 1;
        m[y-1][x+1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y-1, x+1);
        }
    }
    //left
    if(x-1 >= 0 && x-1 < limitX) {
        
        let o = m[y][x-1];
        let val = o.x + 1;
        m[y][x-1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y, x-1);
        }
    }
    //right
    if (x+1 >= 0 && x+1 < limitX) {
        
        let o = m[y][x+1];
        let val = o.x + 1;
        m[y][x+1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y, x+1);
        }
    }
    //down-left
    if (y+1 >= 0 && y+1 < limitY && x-1 >= 0 && x-1 < limitX ) {
        
        let o = m[y+1][x-1];
        let val = o.x + 1;
        m[y+1][x-1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y+1, x-1);
        }
    }
    //down
    if (y+1 >= 0 && y+1 < limitY) {
        
        let o = m[y+1][x];
        let val = o.x + 1;
        m[y+1][x].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y+1, x);
        }
    }
    //down-right
    if (y+1 >= 0 && y+1 < limitY && x+1 >= 0 && x+1 < limitX ) {
        
        let o = m[y+1][x+1];
        let val = o.x + 1;
        m[y+1][x+1].x = val;    

        if(!o.flashed && val > 9) {
            incAdjacent(m, y+1, x+1);
        }
    }
}

function flash(m){
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            if(val.x > 9 && !val.flashed) {
                incAdjacent(m, i, j);
                row[j].flashed = true;
            }
        }
    }
    return m;
}

function cleanup(m){
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            if(val.x > 9) {
                m[i][j].x = 0;
                m[i][j].flashed = false;

            }
        }
    }
    return m;
}

function check(m) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            if(val.x !== 0) {
                return false;
            }
        }
    }
    return true;
}

function step(m) {
    m = plus1(m);
    m = flash(m);
    m = cleanup(m);
    return m;
}

let dimY = arr.length;
let dimX = arr[0].length;

let matrix = new Array(dimY);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimX).fill('.');
}

for(let i in arr) {
    let nums = arr[i].split('').map(x => ({ 'x': Number(x), 'flashed': false}));
    matrix[i] = nums;
}

for(let i = 0; i < 10000; i++) {
    matrix = step(matrix);
    if(check(matrix)) {
        console.log(i+1);
        break;
    }
}




