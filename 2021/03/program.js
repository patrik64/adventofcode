let fs = require('fs');
let input = fs.readFileSync('Day3.in', 'utf8');
let arr = input.split('\n');

function most(bitarr) {
    let ones = 0;
    let zeros = 0;
    for(let b in bitarr ) {
        if (bitarr[b] === 0) {
            zeros ++;
        } else {
            ones++;
        }
    }
    if (ones > zeros) return true;
    return false;
}

let gammaBits = [];
let epsilonBits = [];

let b1 = [];
let b2 = [];
let b3 = [];
let b4 = [];
let b5 = [];
let b6 = [];
let b7 = [];
let b8 = [];
let b9 = [];
let b10 = [];
let b11 = [];
let b12 = [];


for(let i = 0; i < arr.length; i++) {
    let line = arr[i];

    b1.push(Number(line[0]));
    b2.push(Number(line[1]));
    b3.push(Number(line[2]));
    b4.push(Number(line[3]));
    b5.push(Number(line[4]));
    b6.push(Number(line[5]));
    b7.push(Number(line[6]));
    b8.push(Number(line[7]));
    b9.push(Number(line[8]));
    b10.push(Number(line[9]));
    b11.push(Number(line[10]));
    b12.push(Number(line[11]));
    
}

if (most(b1)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b2)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b3)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b4)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b5)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b6)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b7)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b8)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b9)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b10)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b11)) { gammaBits.push(1)} else { gammaBits.push(0)};
if (most(b12)) { gammaBits.push(1)} else { gammaBits.push(0)};

var pow = 11;
let gamma = 0;

for(let i in gammaBits) {
    gamma += gammaBits[i]*(Math.pow(2,pow));
    pow--;
}

if (most(b1)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b2)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b3)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b4)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b5)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b6)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b7)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b8)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b9)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b10)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b11)) { epsilonBits.push(0)} else { epsilonBits.push(1)};
if (most(b12)) { epsilonBits.push(0)} else { epsilonBits.push(1)};

pow = 11;
let epsilon = 0;

for(let i in epsilonBits) {
    epsilon += epsilonBits[i]*(Math.pow(2,pow));
    pow--;
}

console.log(gamma*epsilon);