let fs = require('fs');
let input = fs.readFileSync('Day18.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let idx = 0;
    let res = [];
    while(idx < str.length) {
        let ch = str[idx];
        if(ch !== ' ')
            res.push(ch);
        idx++;
    }
    return res;
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function evalEx(expr, op) {
    let idx = 0;
    let processed = [];
    while(idx < expr.length) {
        let ch1 = expr[idx];
        let ch2 = expr[idx+1];
        let ch3 = expr[idx+2];
        if(ch2 === op){
            let res = Number(ch1) + Number(ch3);
            if(op === '*')
                res = Number(ch1) * Number(ch3);
            processed.push(res);
            idx += 3;
        } else {
            processed.push(ch1);
            idx++;
        }
    }
    return processed;
}

function evalSub(expr) {
    let start = -1;
    let end = -1;
    for(let i = 0; i < expr.length; i++) {
        let ch = expr[i];
        if(ch === '(')
            start = i+1;
        if(ch === ')') {
            end = i;
            break;
        }
    }

    let e = expr.slice(start, end);
    let res = eval(e);
    let temp = [...expr.slice(0,start-1), res, ...expr.slice(end+1)];
    return temp;
}

function eval(expr) {
    while(isInArray('(', expr)) {
        expr = evalSub(expr);
    }
    expr = evalEx(expr, '+');
    while(isInArray('+', expr)) {
        expr = evalEx(expr, '+');
    }
    while(isInArray('*', expr)) {
        expr = evalEx(expr, '*');
    }
    if(expr.length !== 1)
        console.log('error!!!');

    return expr[0];
}

let sum = 0;
for (let i in arr) {
    let line = arr[i];
    let expr = parse(line);
    sum += eval(expr);
}

console.log(sum);