let fs = require('fs');

let input = fs.readFileSync('Day4.in', 'utf8');
let arr = input.split('\n');

function printMatrix(m) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        let s = '';
        for(let j = 0; j < row.length; j++) {
            s += row[j].n;
            s += ':';
            s += row[j].mark;
            s += ' ';
        }
        console.log(s);
    }
}

function getRow(m, rowNum) {
    return m[rowNum];
}

function getCol(m, colNum) {
    let ret = [];
    ret.push(m[0][colNum]);
    ret.push(m[1][colNum]);
    ret.push(m[2][colNum]);
    ret.push(m[3][colNum]);
    ret.push(m[4][colNum]);
    return ret;
}

function parseDraw(str) {
    let draw = str.split(',');
    return draw;

}

function parseCard(arr, m, line) {
    
    m[0] = parseRow(arr, line);
    m[1] = parseRow(arr, line+1);
    m[2] = parseRow(arr, line+2);
    m[3] = parseRow(arr, line+3);
    m[4] = parseRow(arr, line+4);
    
    return m;
}

function parseRow(arr, line) {
    let ret = [];
    let row = arr[line].split(' ');
    for(let x in row) {
        let n = row[x];
        if(n !== '') {
            let o = { 'n': Number(n), 'mark': false }
            ret.push(o);
        }
    }
    return ret;
}

function markDraw(cards, drawNum) {
    for(let c in cards) {
        let card = cards[c];
        markCard(card, drawNum);
    }
}

function markCard(m, drawNum) {
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            if(row[j].n === drawNum) {
                m[i][j].mark = true;
            }
        }
    }
}

function check(cards) {
    for(let c in cards) {
        let card = cards[c];
        if(checkCard(card)) return c;
    }
    return -1;
}

function checkCard(m) {
    if(checkArr(getRow(m, 0))) return true;
    if(checkArr(getRow(m, 1))) return true;
    if(checkArr(getRow(m, 2))) return true;
    if(checkArr(getRow(m, 3))) return true;
    if(checkArr(getRow(m, 4))) return true;

    if(checkArr(getCol(m, 0))) return true;
    if(checkArr(getCol(m, 1))) return true;
    if(checkArr(getCol(m, 2))) return true;
    if(checkArr(getCol(m, 3))) return true;
    if(checkArr(getCol(m, 4))) return true;
}

function checkArr(a) {
    for(let x in a) {
        if(a[x].mark === false) return false;
    }
    return true;
}

function calc(m) {
    let sum = 0;
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            if(row[j].mark === false) {
                sum += row[j].n;
            }
        }
    }
    return sum;
}

function filterCard(cards, idx) {
    let ret = [];
    for(let i in cards) {
        if(i !== idx) {
            ret.push(cards[i])
        }
    }
    return ret;
}

let draw = parseDraw(arr[0]);

let fileLen = arr.length;
let linePos = 2;

let cards = [];

while(linePos <= fileLen) {
    let matrix = new Array(5);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(5).fill('.');
    }

    matrix = parseCard(arr, matrix, linePos);
    cards.push(matrix);
    linePos +=6;
}

let win = false;
let lastDraw = 0;
let lastCard = null;
for(let i = 0; i < draw.length; i++) {
    let drawNum = Number(draw[i]);
    markDraw(cards, drawNum);
    lastDraw = drawNum;
    win = check(cards);
    while(win >= 0) {
        cards = filterCard(cards,win);
        win = check(cards);
    }
    if(cards.length === 1) lastCard = cards[0];
    if(cards.length === 0) break;
}

let sumUnmarked = calc(lastCard);
console.log(lastDraw*sumUnmarked);