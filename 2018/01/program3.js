var fs = require('fs');

var input = fs.readFileSync('Day1.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
   let ret = parseInt(str);
   return ret;
}

arr.concat(arr);
let lst = [];
for(var i in arr)
{
    let n = parse(arr[i]);
    lst.push(n);
}

let nLen = lst.length;
let cntr = 0;
let lstSums = [0];
let sum = 0;
while (true)
{
    let el = lst[cntr];
    sum = sum + el;

    if(lstSums.includes(sum))
    {
        console.log(sum);
        process.exit(0);
    }
    lstSums.push(sum);

    cntr = cntr + 1;

    if(cntr >= nLen)
        cntr = 0;
}
console.log("not found");