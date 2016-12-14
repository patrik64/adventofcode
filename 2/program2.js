var fs = require('fs');
 
var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

var start = 5;

function move(direction, pos)
{
    if(direction == 'L')
    {
        if(pos != 1 && pos != 2 && pos != 5 && pos != 10 && pos != 13)
            pos = pos - 1;
    }
    else if(direction == 'R')
    {
        if(pos != 1 && pos != 4 && pos != 9 && pos != 12 && pos != 13)
            pos = pos + 1;   
    }
    else if(direction == 'D')
    {
        if(pos == 1) pos = 3;
        else if(pos == 11) pos = 13;
        else if(pos != 5 && pos != 9 && pos != 10 && pos != 12 && pos != 13)
            pos = pos + 4;   
    }
    else 
    {

        if(pos == 13) pos = 11;
        else if(pos == 3) pos = 1;
        else if(pos != 5 && pos != 9 && pos != 2 && pos != 4 && pos != 1)
            pos = pos - 4;   
    } 
    return pos;
}

var pos = 5;
var res = [];
for (i in arr)
{
    var str = arr[i];
    for(x in str)
        pos = move(str[x], pos);
    res.push(pos);
}
console.log(res);
