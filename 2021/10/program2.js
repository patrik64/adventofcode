let fs = require('fs');
let input = fs.readFileSync('Day10.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    let stack = [];
    for(let x in str) {
        let ch = str[x];
        if(ch !== ')' && ch !== ']' && ch !== '>' && ch !== '}') {
            stack.push(ch);
        } else {
            if(stack.length  < 1) return ch;
            if(stack[stack.length-1] ==='(' && ch !== ')') return stack;
            if(stack[stack.length-1] ==='[' && ch !== ']') return stack;
            if(stack[stack.length-1] ==='{' && ch !== '}') return stack;
            if(stack[stack.length-1] ==='<' && ch !== '>') return stack;

            stack.pop();
        }
    }
    return { 'res' : true, 'stack': stack };
}

function autocomplete(arr) {
    let ret = [];
    for(let x in arr) {
        if(arr[x] == '(') ret.unshift(')');
        if(arr[x] == '[') ret.unshift(']');
        if(arr[x] == '{') ret.unshift('}');
        if(arr[x] == '<') ret.unshift('>');
    }
    return ret;
}

function valueOf(ch) {
    if(ch === ')') return 1;
    if(ch === ']') return 2;
    if(ch === '}') return 3;
    return 4;
}

function calculateScore(arr) {
    let res = 0;
    for(let x in arr) {
        let ch = arr[x];
        res = res*5;
        res += valueOf(ch);
    }
    return res;
}

let scores = [];
for(let i in arr) {
    let line = arr[i];
    let r = parse(line);
    if(r.res) {
        let ac = autocomplete(r.stack);
        scores.push(calculateScore(ac));
    }
}

scores.sort(function(a, b){return a - b});
let middle = Math.floor(scores.length / 2);
console.log(scores[middle]);