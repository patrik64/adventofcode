let fs = require('fs');
let input = fs.readFileSync('Day2.in', 'utf8');
let arr = input.split('\n');

let x = 0;
let y = 0;
let aim = 0;
for(let i = 0; i < arr.length; i++) {
    let inst = arr[i].split(' ');
    if(inst[0] === 'down') {
        aim += Number(inst[1]);
    }
    else if(inst[0] === 'up') {
        aim -= Number(inst[1]);
    }
    else {
        x += Number(inst[1]);
        y += aim * Number(inst[1]);
    }
}

console.log(x*y);