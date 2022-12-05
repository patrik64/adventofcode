const { count } = require('console');
let fs = require('fs');
const { resourceLimits } = require('worker_threads');
let input = fs.readFileSync('Day5.in', 'utf8');
let arr = input.split('\n');

function createArrayFromLine(line, m) {
    let ret = [];
    
    //console.log(line[1]);
    //console.log(line[5]);
    //console.log(line[9]);

    
    if(line[1] !== ' ') {
        m[0].push(line[1]);
    }
    if(line[5] !== ' ') {
        m[1].push(line[5]);
    }
    if(line[9] !== ' ') {
        m[2].push(line[9]);
    }
    if(line[13] !== ' ') {
        m[3].push(line[13]);
    }
    if(line[17] !== ' ') {
        m[4].push(line[17]);
    }
    if(line[21] !== ' ') {
        m[5].push(line[21]);
    }
    if(line[25] !== ' ') {
        m[6].push(line[25]);
    }
    if(line[29] !== ' ') {
        m[7].push(line[29]);
    }
    if(line[33] !== ' ') {
        m[8].push(line[33]);
    }
    return m;
}

function parse(str) {
    let ret = { "count": 0, "from": 0, "to": 0};

    let arr = str.split(' ')

    let count = parseInt(arr[1], 0);
    let from = parseInt(arr[3], 0);
    let to = parseInt(arr[5], 0);

    ret.count = count;
    ret.from = from;
    ret.to = to;

    return ret;
}

function move(m, inst) {
    for(let i = 0; i < inst.count; i++) {
        let el = m[inst.from-1].shift();
        m[inst.to-1].unshift(el);
    }
    return m;
}

let m = [];
for(let i = 0; i < 9; i++) {
    m.push([]);
}

//create the arrays

for(let i = 0; i < 8; i++) {
    m = createArrayFromLine(arr[i], m);
}


for(let i = 10; i < arr.length; i++) {
    let inst = parse(arr[i]);
    m = move(m, inst);
}

let ret = '';
for(let i = 0; i < m.length; i++) {
    ret += m[i][0];
}

console.log(ret);
