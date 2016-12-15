var fs = require('fs');
 
var input = fs.readFileSync('Day14.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var disknr = '';
    var positions = '';
    var position = '';
    var param1 = '';
    var param2 = '';
    var param3 = '';
    var pos = 6;

    disknr = Number(str[pos]);
    pos =12;
    while(str[pos] != ' ')
    {
        positions += str[pos];
        pos++;
    }

    pos = str.length-2;
    position = str[pos];

    var ret = { "disknr" : disknr, "ps" : Number(positions), "p" : Number(position) };
    return ret;
}

function answerPuzzle(arr, i)
{
    for(var x in all)
    {
        i++;
        var obj = all[x];
        var p = obj["p"];
        var ps = obj["ps"];
        var check = (p+i) % ps;
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
var i = 0;
var ret = answerPuzzle(all, i);
while(!ret)
{
    ret = answerPuzzle(all, i);
    i++;
}
console.log(i-1);

//problem 2
all.push({ "disknr" : 7, "ps" : 11, "p" : 0 });

var i = 0;
var ret = answerPuzzle(all, i);
while(!ret)
{
    ret = answerPuzzle(all, i);
    i++;
}
console.log(i-1);