let fs = require('fs');
const { setMaxListeners } = require('process');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var dir = '';
    var ret = [];

    while(idx < str.length)
    {
        var ch = str[idx];
        if( ch == ',')
        {
            dir = dir.trim();
            ret.push(dir);
            dir = '';
        }
        else
        {
            dir += ch;
        }
        idx++;
    }
    ret.push(dir.trim());
    return ret;
}

function initMatrix(m, dim) {
    for(let i = 0; i < dim; i++ ){
        m.push([])
        for(let j = 0; j < dim; j++) {
            m[i].push(0);
        }
    }
}

function printMatrix(m) {
    for(let i = 0; i < m.length; i++) {
        console.log(JSON.stringify(m[i]));
    }
}

function setL(m, x, y, val) {
    for(let i = x-1; i >= (x-val); i--)
    {
        let pt = [i, y];
        m.push(pt);
    }
}

function setR(m, x, y, val) {
    for(let i = x+1; i <= (x+val); i++ )
    {
        let pt = [i, y];
        m.push(pt);
    }
}

function setU(m, x, y, val) {
    for(let i = y+1; i <= (y+val); i++ )
    {
        let pt = [x, i];
        m.push(pt);
    }
}

function setD(m, x, y, val) {
    for(let i = y-1; i >= (y-val); i--)
    {
        let pt = [x, i];
        m.push(pt);
    }
}

function getDuplicateArrayElements(arr){
    var sorted_arr = arr.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}

function findCrossings(m) {
    let res = [];
    let testSet = new Set()
    for(let i = 0; i < m.length; i++) {
        let el = m[i];
        let strEl = JSON.stringify(el);
        if(testSet.has(strEl)){
            res.push(el);
        }
        else {
            testSet.add(strEl)
        }
    }
    return res;
}

function cleanMatrix(m) {
    let res = [];

    let testSet = new Set()
    for(let i = 0; i < m.length; i++) {
        let el = m[i];
        let strEl = JSON.stringify(el);
        if(!testSet.has(strEl)){
            testSet.add(strEl)
            res.push(el);
        }
    }
    return res;
}

function calcSteps(m, pt) {
    let res = 0;
    for(let i = 0; i < m.length; i++) {
        res += 1;
        if(m[i][0] === pt[0] && m[i][1] === pt[1])
            return res;
    }
    return res;
}
let matrix1 = [];

let wire1 = parse(arr[0]);
// console.log(wire1);
let wire2 = parse(arr[1]);
// console.log(wire2);

let currX = 0;
let currY = 0;

for(let x in wire1) {
    let op = wire1[x];
    let len = op.length;
    let dir = op[0];
    let val = Number(op.substring(1, len));
    if(dir === 'L') {
        setL(matrix1, currX, currY, val);
        currX -= val;
    }
    else if(dir === 'R') {
        setR(matrix1, currX, currY, val);
        currX += val;
    }
    else if(dir === 'U') {
        setU(matrix1, currX, currY, val);
        currY += val
    }
    else if(dir == 'D') {
        setD(matrix1, currX, currY, val);
        currY -= val;
    }
}

matrix1 = cleanMatrix(matrix1);

currX = 0;
currY = 0;

let matrix2 = [];

for(let x in wire2) {
    let op = wire2[x];
    let len = op.length;
    let dir = op[0];
    let val = Number(op.substring(1, len));
    if(dir === 'L') {
        setL(matrix2, currX, currY, val);
        currX -= val;
    }
    else if(dir === 'R') {
        setR(matrix2, currX, currY, val);
        currX += val;
    }
    else if(dir === 'U') {
        setU(matrix2, currX, currY, val);
        currY += val
    }
    else if(dir == 'D') {
        setD(matrix2, currX, currY, val);
        currY -= val;
    }
}
matrix2 = cleanMatrix(matrix2);

let matrix = [...matrix1, ...matrix2];

let results = findCrossings(matrix);

console.log(results.length)

let distance = 10000;

let minSteps = 10000000000000;

let all= [];

for(let r = 0; r < results.length; r++) {
    let pt = results[r];
    console.log(pt);
    let steps1 = calcSteps(matrix1, pt);
    let steps2 = calcSteps(matrix2, pt);
    let steps = steps1 + steps2;
    all.push(steps)
    if(steps < minSteps) minSteps = steps;
    console.log('steps -->', steps1+steps2);
    let d = Math.abs(pt[0]) + Math.abs(pt[1]);
    if(d < distance)
        distance = d
}

// console.log('distance -->', distance)
console.log('min steps -->', minSteps);

all.sort(function(a, b) {
    return a - b;
  });

console.log(all)