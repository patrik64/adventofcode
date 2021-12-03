let fs = require('fs');
let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function most(bitarr) {
    let ones = 0;
    let zeros = 0;
    for(let b in bitarr ) {
        if (Number(bitarr[b]) === 0) {
            zeros ++;
        } else {
            ones++;
        }
    }
    if (ones >= zeros) return true
    return false;
}

function mostPos(arr, pos) {
    let ones = 0;
    let zeros = 0;
    for(let b in arr ) {
        if (Number(arr[b][pos]) === 0) {
            zeros ++;
        } else {
            ones++;
        }
    }
    if (ones >= zeros) return true
    return false;
}

function filterBitArray(arr, bOnes, pos) {
    let ret = [];
    for(let x in arr) {
        let el = arr[x];
        if(bOnes && el[pos] === '1') {
            ret.push(el);
        } else if (!bOnes && el[pos] === '0') {
            ret.push(el);
        }   
    }
    return ret;
}

let gammaBits = [];
let epislonBits = [];

let b1 = [];

for(let i = 0; i < arr.length; i++) {
    let line = arr[i];

    b1.push(Number(line[0]));
}

let runArrGamma = [...arr];

if (most(b1)) { runArrGamma = filterBitArray(runArrGamma, true, 0) } else { runArrGamma = filterBitArray(runArrGamma, false, 0) };

var single = runArrGamma.length <= 1;
pos = 1;
while(!single) {
    let bOnes = mostPos(runArrGamma, pos);
    runArrGamma = filterBitArray(runArrGamma, bOnes, pos)
    pos++;
    single = runArrGamma.length <= 1;
}

var pow = 11;
let gamma = 0;

let gammaArr = runArrGamma[0];

for(let i in gammaArr) {
    gamma += gammaArr[i]*(Math.pow(2,pow));
    pow--;
}

let runArrEpsilon = [...arr];

if (most(b1)) { runArrEpsilon = filterBitArray(runArrEpsilon, false, 0) } else { runArrEpsilon = filterBitArray(runArrEpsilon, true, 0) };

var single = runArrEpsilon.length <= 1;
pos = 1;
while(!single) {
    let bOnes = mostPos(runArrEpsilon, pos);
    runArrEpsilon = filterBitArray(runArrEpsilon, !bOnes, pos)
    pos++;
    single = runArrEpsilon.length <= 1;
}

var pow = 11;
let epsilon = 0;

let epsilonArr = runArrEpsilon[0];

for(let i in epsilonArr) {
    epsilon += epsilonArr[i]*(Math.pow(2,pow));
    pow--;
}

console.log(gamma*epsilon);

