let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let line = arr[0];

let floor = 0;
for (let x in line) {
    let ch = line[x];
    if(ch == ')')
        floor--;
    else
        floor++;
}

console.log(floor);
