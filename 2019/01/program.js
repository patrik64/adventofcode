let fs = require('fs');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

let sum = 0;
for(let i = 0; i < arr.length; i++)
{
    let line = arr[i];
    //divide by 3
    let res = Number(line) /3;
    res = Math.floor(res);
    res -= 2;

    sum += res;
}

console.log(sum);