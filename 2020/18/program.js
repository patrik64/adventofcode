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

function eval(expr, idx) {
    let res = 0;
    let currentOp = '';
    for(let i = idx; i < expr.length; i++) {
        let ch = expr[i];
        if(ch === '(') {
            let evalres = 0;
            let next = i + 1;
            [evalres, i] = eval(expr, next);
            if(currentOp === '+')
                res += evalres;
            else if(currentOp === '*')
                res *= evalres;
            else
                res = evalres;
            currentOp = '';

        }
        else if(ch === ')') {
            let next = i++;
            return [res, next];
        }
        else if(ch === '+') {
            if(currentOp !== '')
                console.log('error +');
            currentOp = '+';
        }
        else if(ch === '*') {
            if(currentOp !== '')
                console.log('error *');
            currentOp = '*';
        }
        else {
            if(currentOp === '+')
                res += Number(ch);
            else if(currentOp === '*')
                res *= Number(ch);
            else
                res = Number(ch);
            currentOp = '';
        }
    }
    return [res, -1];
}
let sum = 0;
for (let i in arr) {
    let line = arr[i];
    let expr = parse(line);
    let res = 0;
    let temp = -1;
    [res, temp] = eval(expr, 0);
    sum += res;
}

console.log(sum);