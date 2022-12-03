let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
let maxsum = -1;
for(let i = 0; i < arr.length; i++) {
    if(arr[i].length === 0) {
        if(sum > maxsum)
            maxsum = sum;
            sum = 0;
    }
    sum += Number(arr[i]);
}

if(sum > maxsum)
    maxsum = sum;
           

console.log(maxsum);