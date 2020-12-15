let fs = require('fs');
let input = fs.readFileSync('Day10.in', 'utf8');
let arr = input.split('\n');

let nums = []

for (let i in arr) {
    let line = arr[i];
    line.trim();
    let val = Number(line);
    nums.push(val);
}

nums.sort(function(a, b) {return a - b;});

let ones = 0;
let threes = 1;
let p = 0;
for(let i = 0; i < nums.length; i++) {
    let n = nums[i];
    if((n - p) === 1) {
        ones +=1;
    }
    else if((n-p) === 3) {
        threes += 1;
    }
    p = n;
}

console.log(ones*threes)
