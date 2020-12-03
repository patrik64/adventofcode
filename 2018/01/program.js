var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
   let ret = parseInt(str);
   console.log(ret);
   return ret;
}

let sum = 0;
for(var i in arr)
{
    let n = parse(arr[i]);
    sum = sum + n;
}

console.log(sum);