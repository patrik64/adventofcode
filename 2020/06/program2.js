let fs = require('fs');

let input = fs.readFileSync('Day6.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let key = '';
    let ret = {};

    while(idx < str.length) {
        if(str[idx] === '\r' || str[idx] === '\n') break;
        key = str[idx];
        if(ret[key])
            ret[key] += 1;
        else
            ret[key] = 1
        idx++;
    }
    return ret;
 }

function getGroupCount(g) {
    let res = 0
    let gs = g['groupsize'];
    for(let x in g) {
        if(x !== 'groupsize' && gs === g[x])
        res += 1;
    }
    return res;
}

function groupMerge(g1, g2) {
    for(let x in g2) {
        if(g1[x])
            g1[x] += g2[x];
        else
            g1[x] = g2[x];
    }
    return g1;
}

let sum = 0;
let group = {}
let gs = 0;
for (let i in arr) {
    let line = arr[i];
    if(line.length > 1) {
        gs += 1
        let obj = parse(line);
        group = groupMerge(group, obj);
        group['groupsize'] = gs;
    } else {
        gs = 0;
        sum += getGroupCount(group);
        group = {};
    }
}

console.log(sum);
