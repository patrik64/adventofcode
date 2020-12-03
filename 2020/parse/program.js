var fs = require('fs');

var input = fs.readFileSync('Day11.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var dir = '';
    var ret = [];

    while(idx < str.length)
    {
        var ch = str[idx];
        if( ch == ',')
        {
            dir = dir.trim();
            ret.push(dir);
            dir = '';
        }
        else
        {
            dir += ch;
        }
        idx++;
    }
    ret.push(dir);
    return ret;
}

function move(dir, dirs)
{
    if(dir == 's')
        dirs["sn"] += 1;
    else if(dir == 'n')
        dirs["sn"] -= 1;
    else if(dir == "sw")
        dirs["swne"] += 1;
    else if(dir == "ne")
        dirs["swne"] -= 1;
    else if(dir == "se")
        dirs["senw"] += 1;
    else if(dir == "nw")
        dirs["senw"] -=1;
    else
        console.log("error!");
}

var dirs = {"sn":0, "swne" : 0, "senw":0 };
var line = arr[0];
var mvs = parse(line);

for(var x in mvs)
    move(mvs[x], dirs);

var res = Math.abs(dirs["sn"]);
res += Math.max(Math.abs(dirs["swne"]), Math.abs(dirs["senw"]));
console.log(res);
