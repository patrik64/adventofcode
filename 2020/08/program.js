var fs = require('fs');

var input = fs.readFileSync('Day8.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    let idx = 0;
    let op = '';
    let val = '';

    op = str.substring(0,3);

    idx = 4;

    while(idx < str.length) {
        val += str[idx];
        idx++;
    }

    val.trim();
    val = Number(val);

    let ret = {'op' : op, 'val': val, 'visited': false};
    return ret;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function processInstruction(inst, pos, acc) {
    if (pos < 0) {
        process.exit();
    }
    if (pos >= inst.length) {
        process.exit();
    }

    let el = inst[pos];
    if(el.visited) {
        console.log(acc);
        process.exit();
    }
    el.visited = true;
    if(el.op === 'nop') {
        pos++;
        processInstruction(inst, pos, acc);
    }
    else if (el.op === 'acc') {
        acc += el.val;
        pos++;
        processInstruction(inst, pos, acc);
    }
    else if (el.op === 'jmp') {
        pos += el.val;
        processInstruction(inst, pos, acc);
    }
}

var inst = []

for (let i in arr) {
    let line = arr[i];
    let obj = parse(line);
    inst.push(obj);
}

let acc = 0;
let pos = 0;

processInstruction(inst, pos, acc);
