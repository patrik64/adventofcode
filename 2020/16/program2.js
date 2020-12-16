const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
let fs = require('fs');
let input = fs.readFileSync('Day16.in', 'utf8');
let arr = input.split('\n');

function parseRanges(str) {
    let idx = 0;
    let name = '';
    let r1Start = '';
    let r1End = '';
    let r2Start = '';
    let r2End = '';
    
    
    while(str[idx] !== ':') {
        name += str[idx]; 
        idx++; 
    }
    name = name.trim();
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

    let ret = { 'name': name,
                'r1Start' : r1Start, 
                'r1End': r1End,
                'r2Start': r2Start, 
                'r2End' : r2End };
    return ret;
}

function parseTicket(str) {
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
let ticket = [];
let nearby = [];

let i = 0;
let line = arr[i];
while (line.length > 4) {
    let obj = parseRanges(line);
    ranges.push(obj);
    i++;
    line = arr[i];
}

i+=2;
line = arr[i];

ticket = parseTicket(line);

i+=3;

while (i < arr.length) {
    line = arr[i];
    let near = parseTicket(line);
    nearby.push(near);
    i++;
}

// console.log(ticket);
// console.log(nearby);

let res = [];
let validtickets = [];

for(let i = 0; i < nearby.length; i++) {
    let valid = true;
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
            valid = false;
            res.push(el);
        }
    }
    if(valid)
        validtickets.push(nearby[i]);
}

// console.log(validtickets.length);
// console.log(nearby.length);
// console.log(ranges)
let pos = [];
let len = validtickets[0].length;
for(let i = 0; i < len; i++) {
   for(let k = 0; k < ranges.length; k++) {
        let pass = true;
        let range = ranges[k];
        for(let j = 0; j < validtickets.length; j++) {
            let el = validtickets[j][i];
            // console.log('checking --> ', el, 'for range -->', range.name)
            if(!((el >= range.r1Start && el <= range.r1End) || (el >= range.r2Start && el <= range.r2End))) 
                pass = false;
        }
        if(pass) {
            if(!isInArray(range.name, pos))
                pos.push(range.name);
        }
    }
}

let mult = 1;
let count = 0;
for(let i = 0; i < pos.length; i++) {
    let name = pos[i].substring(0,9);
    if(name === 'departure') {
        // console.log('i -->', i, 'ticket -->', ticket[i])
        mult *= ticket[i];
        count++;
    }
}

// console.log(pos)
console.log(mult)

