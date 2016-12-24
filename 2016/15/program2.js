var fs = require('fs');
 
var input = fs.readFileSync('Day15.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var ps = '';
    var p = '';
    
    pos =12;
    while(str[pos] != ' ')
    {
        ps += str[pos];
        pos++;
    }

    pos = str.length-2;
    p = str[pos];

    var ret = { "ps" : Number(ps), "p" : Number(p) };
    return ret;
}

function isUnlocked(arr, i)
{
    for(var x in all)
    {
        i++;
        var obj = all[x];
        var p = obj["p"];
        var ps = obj["ps"];
        if(((p+i) % ps) != 0)
            return false;
    }
    return true;
}

var all = [];
for (var i in arr)
{
    var obj = parse(arr[i]);
    all.push(obj);
}

all.push({ "ps" : 11, "p" : 0 });
var i = 0;
while(!isUnlocked(all, i)) i++;
console.log(i);