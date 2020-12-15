let fs = require('fs');
let input = fs.readFileSync('Day12.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let ret = 0;
    let idx = 0;
    let x = '';

    while(idx < str.length) {
        let ch = str[idx];
        if(ch == '-') {
            idx++;
            ch += str[idx];
        }
        while(!isNaN(parseInt(ch, 10))) {
            x += ch;
            idx++;
            ch = str[idx];
        }
        if(x.length > 0) {
            ret += parseInt(x, 10);
            x = '';
        }
        idx++;
    }
    return ret;
}

function processDict(dict) {
    let ret = 0;
    for(let x in dict)
    {
        let o = dict[x];
        if (typeof o === 'string' || o instanceof String)
        {
            if(o === "red")
                return 0;
        }
    }

    for(let x in dict) {
        let o = dict[x];
        if(Array.isArray(o))
            ret += processArray(o);
        else if(typeof o === "object")
            ret += processDict(o);
        else
            if(Number.isInteger(o))
                ret += o;
    }
    return ret;
}

function processArray(ar) {
    let ret = 0;
    for(let i = 0; i < ar.length; i++) {
        let o = ar[i];
        if(Array.isArray(o))
            ret += processArray(o);
        else if(typeof o === "object")
            ret += processDict(o);
        else
            if(Number.isInteger(o))
                ret += o;
    }
    return ret;
}

let str = arr[0];
let obj = JSON.parse(str);
let sum = 0;
if(Array.isArray(obj))
    sum += processArray(obj);
else if(typeof obj === "object")
    sum += processDict(obj);


console.log(sum);
