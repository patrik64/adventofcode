var fs = require('fs');
 
var input = fs.readFileSync('Day19.in', 'utf8');
var arr = input.split('\n');

function isLetter(str) 
{
    return str.length === 1 && str.match(/[a-z]/i);
}

var mtx = [];
for (var i in arr)
{
    var line = arr[i];
    mtx.push(line);
}

var startX = 0;
var res = "";

for(var i = 0; i < mtx[0].length; i++)
{
    if(mtx[0][i] == '|')
        startX = i;
}

function move(dir, y, x, m)
{
    var found = false;

    var ch;
    if(dir == "ns")
        y++;
    else if(dir == "sn")
        y--;
    else if(dir == "lr")
        x++;
    else
        x--;

    ch = m[y][x];

    if(isLetter(ch))
    {
        res += ch;
        if(ch == 'U')
            found = true;
    }

    if(ch == '+')
    {
        if(dir == "ns" || dir == "sn")
        {
            if(((x-1) >= 0) && (m[y][x-1] == '-'))
                dir = "rl";
            else
                dir = "lr";
        }
        else
        {
            if(((y-1) >= 0) && m[y-1][x] == '|')
                dir = "sn";
            else
                dir = "ns";
        }
    }

    var ret = { "dir" : dir, "y" : y, "x" : x, "found" : found };
    return ret;
}

var steps = 2;
var mv = move("ns", 0, startX, mtx);
while(!mv.found)
{
    steps++;
    mv = move(mv.dir, mv.y, mv.x, mtx);
}

console.log(steps);