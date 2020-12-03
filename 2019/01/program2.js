let fs = require('fs');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

function calcFuel(n) {
    let res = n/3;
    res = Math.floor(res);
    res -= 2;
    return res;
}

let sum = 0;
for(let i = 0; i < arr.length; i++)
{
    let cum = 0;
    let res = Number(arr[i]);
    while(res > 0) {
        res = calcFuel(res)
        if (res > 0) {
            cum += res
        }
    }
    console.log('cum -->', cum)

    sum += cum;
}

console.log(sum);