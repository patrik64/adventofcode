var fs = require('fs');

var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    let ret = {};
    for(let i = 0; i < str.length; i++){
        let ch = str[i];
        if(ch in ret)
            ret[ch] += 1;
        else
            ret[ch] = 1;
    }
   return ret;
}

let twos = 0;
let threes = 0;
for(var i in arr)
{
    let btwos = false;
    let bthrees = false;
    let obj = parse(arr[i]);
    for(let o in obj){
        if(obj[o] == 2)
            btwos = true;
        if(obj[o] == 3)
            bthrees += true;
    }
    if(btwos)
        twos += 1;
    if(bthrees)
        threes += 1;
}
let res = twos*threes;
console.log(res);