let fs = require('fs');

let input = fs.readFileSync('Day10.in', 'utf8');
let arr = input.split('\n');

let nums = []

for (let i in arr) {
    let line = arr[i];
    line.trim();
    let val = Number(line);
    nums.push(val);
}

nums.sort(function(a, b) {return a - b;});

// gather occurences of sequences bigger than 2

occ = {}

let seqLength = 0;
let val = 0;
let bAddFirst = false;
for(let i = 0; i < nums.length; i++) {
    let el = nums[i];
    if(el === 1 && i === 0) {
        bAddFirst = true;
    }
    if(el === (val+1)) {
        seqLength +=1
        val = el;
    } else {
        val = el;
        if(seqLength > 2) {
            if(occ[seqLength])
                occ[seqLength] += 1;
            else {
                if(bAddFirst) {
                    occ[seqLength+1] = 1;
                }
                else {
                    occ[seqLength] = 1;
                }
            }
        }
        bAddFirst = false;
        seqLength = 1;
    }

    if(i === (nums.length - 1) && seqLength > 2) {
        if(occ[seqLength])
            occ[seqLength] += 1;
        else
            occ[seqLength] = 1;
    }
}

let threes = 0;
let fours = 0;
let fives = 0;

if(occ['3']) threes = occ['3'];
if(occ['4']) fours = occ['4'];
if(occ['5']) fives = occ['5'];

let res = 1;
for(let i = 0; i < threes; i++) {
    res = res * 2;
}

for(let i = 0; i < fours; i++) {
    res = res * 4;
}

for(let i = 0; i < fives; i++) {
    res = res * 7;
}
console.log(res)
