var fs = require('fs');
 
var input = fs.readFileSync('Day20.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var nr1 = '';
    var nr2 = '';
    var pos = 0;

    while(str[pos] != '-')
    {
        nr1 += str[pos];
        pos++;
    }

    pos++;
    while(pos < str.length)
    {
        nr2 += str[pos];
        pos++;
    }

    var ret = { "nr1" : Number(nr1), "nr2" : Number(nr2) };
    return ret;
}


var ip = 0;

var minArr = [];
var maxArr = [];

for (var i in arr)
{
    var obj = parse(arr[i]);
    minArr.push(obj["nr1"]);
    maxArr.push(obj["nr2"]);
}

function sortNumber(a,b) 
{
    return a - b;
}

minArr = minArr.sort(sortNumber);
maxArr = maxArr.sort(sortNumber);

var mx = maxArr[maxArr.length-1];
var mn = minArr[0];

var ip = mn;
var res = [];

while(ip < mx)
{
    for(var i = 0; i < minArr.length; i++)
    {
        var m1 = minArr[i];
        var m2 = maxArr[i];

        if(ip >= m1 && ip <= m2)
            ip = m2+1;
    }

    if(ip < mx)
        res.push(ip);
    ip++;
}

console.log(res[0]);
console.log(res.length);