let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
let prev = -1;
let arr3 = [];
for(let i = 0; i < arr.length-2; i++) {
    let one = Number(arr[i]);
    let two = Number(arr[i+1]);
    let three = Number(arr[i+2])
    let l = one+two+three;
    arr3.push(l);
}

for(let i = 0; i < arr3.length; i++) {
    let current = Number(arr3[i]);
    if(current > prev && prev > 0) {
        sum++;
    }    
    prev = current;
}

console.log(sum);