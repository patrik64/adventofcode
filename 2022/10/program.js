let fs = require('fs');
let input = fs.readFileSync('Day10.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = { 'op': 'noop', val: 0 };

    let arr = str.split(' ');
    if(arr[0] === 'noop') {
        return ret;
    }

    ret.op = 'addx';
    ret.val = parseInt(arr[1], 10);

    return ret;
}

function signalS(cycle, inst) {
    let ret = 0;

    let cidx = 0;
    let sum = 1;
    for(let i = 0; i < inst.length; i++) {
        let p = inst[i];
        if(p.op === 'noop') {
            cidx += 1;
            if(cidx == cycle) return sum * cycle;
        } else {
            cidx +=1;
            if(cidx == cycle) return sum * cycle;
            cidx +=1;
            if(cidx == cycle) return sum * cycle;
            sum += p.val;
        }
    }
    return -1;
}


let inst = [];
for(let i = 0; i < arr.length; i++) {
    let test = parse(arr[i]);
    inst.push(test);
}

let res20 = signalS(20, inst);
let res60 = signalS(60, inst);
let res100 = signalS(100, inst);
let res140 = signalS(140, inst);
let res180 = signalS(180, inst);
let res220 = signalS(220, inst);

let sum = res20 + res60 + res100 + res140 + res180 + res220;

console.log(sum);
