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

function moveDelay(grid, delay)
{
    for(var key in grid)
    {
        var obj = grid[key];
        if(obj.range > 1)
        {
            var mvs = (obj.range * 2) - 2;
            var mod = delay % mvs;
            if(mod >= obj.range)
            {
                mod = mvs - mod;
                obj.direction = "down";
            }
            else
            {   
                obj.direction = "up";
            }
            obj.currentPos = mod;
        }
    }
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

var delay = 1;

for(;;)
{
    var grid = {};
    for(var i = 0; i <= last; i++)
    {
        grid[i] = {};
        var n = 0;
        if(i.toString() in parsed)
            n = parsed[i];

        grid[i] = { "range" : n, "currentPos" : 0, "direction" : "up" };
    }

    moveDelay(grid, delay);

    var cancel = false;
    for(var i = 0; i <= last; i++)
    {
        move(grid); 
        if(grid[i].range > 0 && grid[i].currentPos == 0)
        {
            cancel = true;
            break;
        } 
    }

    if(cancel == 0)
        break;

    delay += 2;
}

console.log(delay+1);

