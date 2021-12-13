let fs = require('fs');
let input = fs.readFileSync('Day13.in', 'utf8');
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

function calc(m) {
    let sum = 0;
    for(let i = 0; i < m.length; i++) {
        let row = m[i];
        for(let j = 0; j < row.length; j++) {
            let val = row[j];
            if(val === '#') {
                sum += 1;
            }
        }
    }
    return sum;
}

function fold(m, ins) {
    let res = null; 
    if(ins.direction === 'y') {
        let newDimX = m[0].length;
        let newDimY = Math.floor(m.length/2);

        let dimY = m.length;

        let newPaper = new Array(newDimY);

        for (let i = 0; i < newPaper.length; i++) {
            newPaper[i] = new Array(newDimX).fill('.');
        }

        for(let i = 0; i < newDimY-1; i++) {
            let firstRow = m[i];
            let secondRow = m[dimY-i-1];
            let newRow = [];
            for(let j = 0; j < firstRow.length; j++) {
                let firstDot = firstRow[j];
                let secondDot = secondRow[j];
                if(firstDot === '#' || secondDot === '#') {
                    newRow.push('#')
                } else {
                    newRow.push('.');
                }
            }
            newPaper[i] = newRow;
        }
        res = newPaper;

    } else  {
        let newDimX = Math.floor(m[0].length / 2);
        let newDimY = m.length;

        let dimX = m[0].length;

        let newPaper = new Array(newDimY);

        for (let i = 0; i < newPaper.length; i++) {
            newPaper[i] = new Array(newDimX).fill('.');
        }

        for(let i = 0; i < newDimY; i++) {
            let row = m[i];
            let newRow = [];
            for(let j = 0; j < newDimX; j++) {

                let firstDot = row[j];
                let secondDot = row[dimX - j - 1];
                if(firstDot === '#' || secondDot === '#') {
                    newRow.push('#')
                } else {
                    newRow.push('.');
                }
            }
            
            newPaper[i] = newRow;
        }
        res = newPaper;
    }
    return res;
}

let dimY = 0;
let dimX = 0;

let coords = [];
let foldInstructions = [];

for(let i in arr) {
    let line = arr[i];
    if(!isNaN(line[0])) {
        let nums = arr[i].split(',');
        let x = Number(nums[0]);
        let y = Number(nums[1]);

        if(x > dimX) dimX = x;
        if(y > dimY) dimY = y;
        
        let coordinate = { 'x': x, 'y': y};
        coords.push(coordinate);    
    }
    if(line[0] === 'f') {
        let ins = arr[i].split(' ');
        ins = ins[2].split('=');
        let direction = ins[0];
        let pos = Number(ins[1]);
        foldInstructions.push({ 'direction': direction, 'pos' : pos});
    }

}

dimX = dimX+1;
dimY = dimY+1;

let matrix = new Array(dimY);

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(dimX).fill('.');
}

for(let c in coords) {
    let coordinate = coords[c];
    matrix[coordinate.y][coordinate.x] = '#';
}

matrix = fold(matrix, foldInstructions[0]);
let sum = calc(matrix);
console.log(sum);

