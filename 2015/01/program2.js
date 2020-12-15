let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let line = arr[0];
let floor = 0;
for (let x = 0; x < line.length; x++) {
    let ch = line[x];
    if(ch == ')')
        floor--;
    else
        floor++;
    if(floor == -1) {
        console.log(x+1);
        process.exit(0);
    }
}

console.log(floor);
