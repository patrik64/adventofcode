let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
let prev = -1;
for(let i = 0; i < arr.length; i++) {
    let current = Number(arr[i]);
    if(current > prev && prev > 0) {
        sum++;
    }    
    prev = current;
}

console.log(sum);