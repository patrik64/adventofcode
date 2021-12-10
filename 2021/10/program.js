let fs = require('fs');
let input = fs.readFileSync('Day10.in', 'utf8');
let arr = input.split('\n');

function parse(str) {
    // console.log('str -->', str);
    let stack = [];
    for(let x in str) {
        let ch = str[x];
        //console.log('ch -->', ch);
        if(ch !== ')' && ch !== ']' && ch !== '>' && ch !== '}') {
            stack.push(ch);
        } else {
            // console.log('stack -->', stack);
            // console.log('ch -->', ch);
            if(stack.length  < 1) return ch;
            if(stack[stack.length-1] ==='(' && ch !== ')') return ch;
            if(stack[stack.length-1] ==='[' && ch !== ']') return ch;
            if(stack[stack.length-1] ==='{' && ch !== '}') return ch;
            if(stack[stack.length-1] ==='<' && ch !== '>') return ch;

            let popped = stack.pop();
            // console.log('popped -->', popped);
        }
    }
    return '';
}

let result = {
    ')': 0,
    ']': 0,
    '>': 0,
    '}': 0
}

for(let i in arr) {
    let line = arr[i];
    let r = parse(line);
    // console.log('r -->', r);
    if (r.length) result[r]++;
}

let sum = result[')']*3 + result[']']*57+result['}']*1197+result['>']*25137;
console.log(sum);