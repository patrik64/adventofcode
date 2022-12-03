let fs = require('fs');
let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
let sums = [];
for(let i = 0; i < arr.length; i++) {
    if(arr[i].length === 0) {
        sums.push(sum);
        sum = 0;
    }
    sum += Number(arr[i]);
}

if(sum > 0) {
    sums.push(sum);
}

sums.sort(function(a, b) {
    return b - a;
  });

console.log(sums[0] + sums[1] + sums[2]);