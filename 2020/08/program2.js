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

function processInstruction(inst, pos, acc) {
    if (pos < 0) {
        console.log('pos < 0');
        process.exit();
    }
    if (pos >= inst.length) {
        console.log(acc);
        return true;
    }

    let el = inst[pos];
    if(el.visited) {
        return false;
    }
    el.visited = true;
    prev = pos;
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

for(let i = 0; i < inst.length; i++) {
    let acc = 0;
    let pos = 0;
    let el = inst[i];
    if(el.op === 'jmp') {
        let instCopy = JSON.parse(JSON.stringify(inst));
        let elCopy = instCopy[i];
        elCopy.op = 'nop';
        if (processInstruction(instCopy, pos, acc))
            process.exit();
    }
}