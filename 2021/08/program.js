let fs = require('fs');
let input = fs.readFileSync('Day8.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
for(let x in arr) {
    let outputs = arr[x].split(' ');
    for(let i = 0; i < 4; i++) {
        let output = outputs[11+i];
        if(output.length === 2) sum++;
        if(output.length === 3) sum++;
        if(output.length === 4) sum++;
        if(output.length === 7) sum++;

    }
}

console.log(sum);