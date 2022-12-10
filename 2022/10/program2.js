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

function getPixel(pos, spritePos) {
    pos = pos % 40;
    if(pos == spritePos || pos == spritePos+1 || pos == spritePos+2) {
        return '#';
    }
    return ' ';
}

function calc(inst, spritePos) {
    let ret = [];

    let cidx = 0;
    for(let i = 0; i < inst.length; i++) {
        let p = inst[i];
        if(p.op === 'noop') {
            ret[cidx] = getPixel(cidx, spritePos);    
            cidx += 1;
        } else {
            ret[cidx] = getPixel(cidx, spritePos);    
            cidx += 1;
            ret[cidx] = getPixel(cidx, spritePos);    
            cidx += 1;
            spritePos += p.val;
        }
    }
    return ret;
}


let inst = [];
for(let i = 0; i < arr.length; i++) {
    let test = parse(arr[i]);
    inst.push(test);
}

let spritePos = 0;
let res = calc(inst, spritePos);

let line = '';
let j = 0;
for(let i = 0; i < res.length; i++) {
    line += res[i];
    j += 1;
    if(j > 39) {
        console.log(line);
        line = '';
        j = 0;
    }
}