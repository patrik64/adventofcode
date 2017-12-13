var fs = require('fs');

var input = fs.readFileSync('Day13.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var layer = '';
    var range = '';
    var s = '';

    while(idx < str.length)
    {
        var ch = str[idx];

        if( ch == ':')
        {
            s = s.trim();
            layer = parseInt(s, 10);
            s = '';
        }
        else
        {
            s += ch;
        }

        idx++;
    }
    s.trim();
    range = parseInt(s, 10);
    var ret = { "layer" : layer, "range" : range };
    return ret;
}

function check(pos, grid, caught)
{
    var obj = grid[pos];
    if(obj.range > 0 && obj.currentPos == 0)
        caught.push(pos);
    return caught;
}

function move(grid)
{
    for(var key in grid)
    {
        var obj = grid[key];
        if(obj.range > 1)
        {
            if(obj.direction == "up")
            {
                if(obj.currentPos == (obj.range-1))
                {
                    obj.currentPos--;
                    obj.direction = "down";
                }
                else
                    obj.currentPos++;
            }
            else
            {
                if(obj.currentPos == 0)
                {
                    obj.currentPos++;
                    obj.direction = "up";
                }
                else
                    obj.currentPos--;
            }
        }
    }
}

var last = 0;
var parsed = {};

var severity = 0;

for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   parsed[obj.layer] = obj.range;
   last = obj.layer;
}

var grid = {};
for(var i = 0; i <= last; i++)
{
    grid[i] = {};
    var n = 0;
    if(i.toString() in parsed)
        n = parsed[i];

    grid[i] = { "range" : n, "currentPos" : 0, "direction" : "up" };
}

var pos = 0;
var caught = [];

for(var i = 0; i <= last; i++)
{
    caught = check(i, grid, caught);
    move(grid);
}

for(var x in caught)
{
    var k = caught[x];
    var obj = grid[k];
    severity += k * obj.range;
}

console.log(severity);