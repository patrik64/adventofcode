let fs = require('fs');
let input = fs.readFileSync('Day5.in', 'utf8');
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

function getRow(m, rowNum) {
    return m[rowNum];
}

function getCol(m, colNum) {
    let ret = [];
    for(let i = 0; i < m.length; i++) {
        ret.push(m[i][colNum]);    
    }
    return ret;
}

function markLine(m, x1, y1, x2, y2) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            if(m[i][j] === '.') {
                m[i][j] = '1';
            } else {
                m[i][j] = '2';
            }
        }
    }
}

function markRow(m, x1, y1, x2, y2) {
    let row = matrix[y1];
    if(x1 < x2) {
        for(let i = x1; i <= x2; i++) {
            if(row[i] === '.') {
                row[i] = '1';
            } else {
                row[i] = '2';
            }
        }
    } else {
        for(let i = x1; i >= x2; i--) {
            if(row[i] === '.') {
                row[i] = '1';
            } else {
                row[i] = '2';
            }
        }
    }
}

function markCol(m, x1, y1, x2, y2) {
    if(y1 < y2) {
    for(let i = y1; i <= y2; i++) {
            if(m[i][x1] === '.') {
                m[i][x1] = '1';
            } else {
                m[i][x1] = '2';
            }
        }
    } else {
        for(let i = y1; i >= y2; i--) {
            if(m[i][x1] === '.') {
                m[i][x1] = '1';
            } else {
                m[i][x1] = '2';
            }
        }
    }
}

function markDiagonal(m, x1, y1, x2, y2) {
    if(x1 < x2) {
        let x = x1;
        let y = y1;
        while(x <= x2) {
            if(m[y][x] === '.') {
                m[y][x] = '1';
            } else {
                m[y][x] = '2';
            }
            x++;
            if(y1 < y2) {
                y++;
            } else {
                y--;
            }
        }
    } else {
        let x = x1;
        let y = y1;
        while(x >= x2) {
            if(m[y][x] === '.') {
                m[y][x] = '1';
            } else {
                m[y][x] = '2';
            }
            x--;
            if(y1 < y2) {
                y++;
            } else {
                y--;
            }
        }
    }
}

function calc(m) {
    let sum = 0;
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            if(m[i][j] === '2') {
                sum++;
            }
        }
    }
    return sum;
}

let matrix = new Array(1000);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(1000).fill('.');
}

for(let i = 0; i < arr.length; i++) {
    let inst = arr[i].split('->');
    let c1 = inst[0].trim().split(',');
    let x1 = Number(c1[0]);
    let y1 = Number(c1[1]);

    let c2 = inst[1].trim().split(',');
    let x2 = Number(c2[0]);
    let y2 = Number(c2[1]);
    
    if(y1 === y2) {
        markRow(matrix, x1, y1, x2, y2);
    } else if (x1 === x2) {
        markCol(matrix, x1, y1, x2, y2);
    } else {
        markDiagonal(matrix, x1, y1, x2, y2);
    }
}
let sum = calc(matrix);
console.log(sum)
