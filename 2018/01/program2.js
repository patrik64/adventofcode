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

let res = false;

let llst = lst;
for(let i = 0; i < 143; i++)
    llst = llst.concat(lst);

let lstSums = [0];
let sum = 0;
for(var i in llst)
{
    sum = sum + llst[i];
    if(lstSums.includes(sum))
    {
        console.log(sum);
        process.exit(0);
    }
    lstSums.push(sum);
}
console.log("not found");