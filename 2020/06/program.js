let fs = require('fs');

let input = fs.readFileSync('Day6.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    var idx = 0;
    var key = '';
    var ret = {};

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
    return g.length;
}

let sum = 0;
let group = {}
for (let i in arr) {
    let line = arr[i];
    if(line.length > 1) {
        let obj = parse(line);
        group = {...group, ...obj};
    } else {
        sum += Object.keys(group).length
        group = {};
    }
}

console.log(sum);