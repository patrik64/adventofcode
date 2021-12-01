let fs = require('fs');

let input = fs.readFileSync('Day1.in', 'utf8');
let arr = input.split('\n');

function parse(str)
{
   let ret = parseInt(str);
   return ret;
}

let sum = 0;
for(let i in arr)
{
    let n = parse(arr[i]);
    sum = sum + n;
}

console.log(sum);
