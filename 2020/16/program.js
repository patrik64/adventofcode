const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
let fs = require('fs');
let input = fs.readFileSync('Day16.in', 'utf8');
let arr = input.split('\n');

function parseRanges(str) {
    let idx = 0;
    let r1Start = '';
    let r1End = '';
    let r2Start = '';
    let r2End = '';
    
    
    while(str[idx] !== ':') { idx++; }
    idx++;

    while(str[idx] !== '-') {
        r1Start += str[idx]; 
        idx++; 
    }

    idx++;

    while(str[idx] !== ' ') {
        r1End += str[idx]; 
        idx++; 
    }

    idx += 4;

    while(str[idx] !== '-') {
        r2Start += str[idx]; 
        idx++; 
    }

    idx++;

    while(idx < str.length) {
        r2End += str[idx]; 
        idx++; 
    }

    r1Start = r1Start.trim();
    r1Start = Number(r1Start);
    r1End = r1End.trim();
    r1End = Number(r1End);
    r2Start = r2Start.trim();
    r2Start = Number(r2Start);
    r2End = r2End.trim();
    r2End = Number(r2End);

    let ret = { 'r1Start' : r1Start, 
                'r1End': r1End,
                'r2Start': r2Start, 
                'r2End' : r2End };
    return ret;
}

function parseNearby(str) {
    ret = [];
    let idx = 0;
    let n = '';
    let r1End = '';
    let r2Start = '';
    let r2End = '';
    
    
    while(idx < str.length) {
        let ch = str[idx];
        if(ch === ',') {
            n = n.trim();
            ret.push(Number(n));
            n = '';
        } else {
            n += ch;
        }
        idx++; 
    }
    n = n.trim();
    ret.push(Number(n));
    return ret;
}


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

let ranges = [];
let nearby = [];

let i = 0;
let line = arr[i];
while (line.length > 4) {
    let obj = parseRanges(line);
    ranges.push(obj);
    i++;
    line = arr[i];
}

i+=5;

while (i < arr.length) {
    line = arr[i];
    let near = parseNearby(line);
    nearby.push(near);
    i++;
}

// console.log(ranges);
// console.log(nearby);

let res = [];

for(let i = 0; i < nearby.length; i++) {
    for(let j = 0; j < nearby[i].length; j++) {
        let el = nearby[i][j];
        let pass = false;
        for(let k = 0; k < ranges.length; k++) {
            let range = ranges[k];
            if(el >= range.r1Start && el <= range.r1End)
                pass = true;
            if(el >= range.r2Start && el <= range.r2End)
                pass = true;
        }
        if(!pass) {
            res.push(el);
        }
    }
}

console.log(res.reduce((a, b) => a + b, 0))