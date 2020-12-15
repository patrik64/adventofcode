let fs = require('fs');
let input = fs.readFileSync('Day13.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = [];
    let idx = 0;

    str = str.trim();
    let n = '';

    while(idx < str.length) {
        let ch = str[idx];
        if(ch === ',') {
            if(n !== 'x')
                ret.push(Number(n));
            n = '';
        } else
            n += ch;
        idx++;
    }
    if(n !== 'x')
        ret.push(Number(n));
    return ret;
}

function processTime(time, timeFound, ids) {
    for(let i = 0; i < ids.length; i++) {
        let id = ids[i];
        if(timeFound % id === 0) {
            let res = (timeFound - time) * id;
            console.log(res);
            process.exit();
        }
    }
    return true;
}

let time = arr[0];

let ids = parse(arr[1]);

let timeFound = time;
while(processTime(time, timeFound, ids)) {
    timeFound++;
}
