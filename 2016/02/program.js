var fs = require('fs');
 
var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

function move(direction, pos)
{
    if(direction == 'L')
    {
        if(pos != 1 && pos != 4 && pos != 7)
            pos = pos - 1;
    }
    else if(direction == 'R')
    {
        if(pos != 3 && pos != 6 && pos != 9)
            pos = pos + 1;   
    }
    else if(direction == 'D')
    {
        if(pos != 7 && pos != 8 && pos != 9)
            pos = pos + 3;   
    }
    else 
    {
        if(pos != 1 && pos != 2 && pos != 3)
            pos = pos - 3;   
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
console.log(res.join(''));
