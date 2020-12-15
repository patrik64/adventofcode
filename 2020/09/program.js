let fs = require('fs');

let input = fs.readFileSync('Day9.in', 'utf8');
let arr = input.split('\n');

function match(arr, n, pos) {
    for(let i = pos-25; i < pos-1; i++) {
        let x = arr[i];
        for(let j = i; j < pos; j++) {
            let y = arr[j];
            // console.log('x --> ', x, 'y--> ', y, 'n --> ', n);
            if((x + y) === n)
                return true;
        }
    }
    return false;
}

let nums = []

for (let i in arr) {
    let line = arr[i];
    line.trim();
    let val = Number(line);
    nums.push(val);
}

let pos = 25;

for(let i = 25; i < nums.length; i++ ) {
    if(!match(nums, nums[i], i)) {
        console.log(nums[i]);
        process.exit();
    }
}

