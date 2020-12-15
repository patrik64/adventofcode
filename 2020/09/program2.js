let fs = require('fs');

let input = fs.readFileSync('Day9.in', 'utf8');
let arr = input.split('\n');

function findSum(arr, n) {
    let x = -1;
    let y = -1;
    let min = -1;
    let max = -1;
    for(let i = 0; i < arr.length-1; i++) {
        let x = arr[i];
        let sum = x;
        let min = x;
        let max = x;
        for(let j = i+1; j < arr.length; j++) {
            let y = arr[j];
            sum += y;
            if(min > y) min = y;
            if(max < y) max = y;
            if(sum === n)
                return [min, max];
        }
    }
    return [];
}

let nums = []

for (let i in arr) {
    let line = arr[i];
    line.trim();
    let val = Number(line);
    nums.push(val);
}

let invalid = 26796446;
let res = findSum(nums, invalid);
console.log(res[0] + res[1]);
