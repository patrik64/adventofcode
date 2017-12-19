var fs = require('fs');

var input = fs.readFileSync('Day6.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x1 = '';
    var x2 = '';
    var y1 = '';
    var y2 = '';
    var op = 'toggle';

    var test = str.substring(0, 7);

    if(test == "turn on")
    {
        op = "turn on";
        idx += 8;
    }
    else if(test == "turn of")
    {
        op = "turn off";
        idx += 9;
    }
    else
    {
        op = "toggle";
        idx += 6;
    }

    while(str[idx] != ',')
    {
        x1 += str[idx];
        idx++;
    }
    idx++;

    while(str[idx] != ' ')
    {
        y1 += str[idx];
        idx++;
    }
    idx += 9;

    while(str[idx] != ',')
    {
        x2 += str[idx];
        idx++;
    }
    idx++;

    while(idx < str.length)
    {
        y2 += str[idx];
        idx++;
    }

    x1 = x1.trim();
    x2 = x2.trim();
    y1 = y1.trim();
    y2 = y2.trim();
    x1 = parseInt(x1, 10);
    x2 = parseInt(x2, 10);
    y1 = parseInt(y1, 10);
    y2 = parseInt(y2, 10);

    var ret = { "x1": x1, "y1": y1, "x2": x2, "y2" : y2, "op" : op };
    return ret;
}

function calcLit(mtx)
{
    var sum = 0;
    for(var i = 0; i < 1000; i++)
    {
        for(var j = 0; j < 1000; j++)
        {
            if(mtx[j][i] == 1)
                sum++;
        }
    }
    return sum;
}

var instr = [];
for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   instr.push(obj);
}

var mtx = [];

for(var i = 0; i < 1000; i++)
{
    var row = [];
    for (var j = 0; j < 1000; j++)
    {
        row.push(0);
    }
    mtx.push(row);
}

for(var i = 0; i < instr.length; i++)
{
    var ins = instr[i];
    for(var j = ins.x1; j <= ins.x2; j++)
    {
        for(var k = ins.y1; k <= ins.y2; k++)
        {
            if(ins.op == "turn on")
            {
                mtx[k][j] = 1;
            }
            else if(ins.op == "turn off")
            {
                mtx[k][j] = 0;
            }
            else
            {
                if(mtx[k][j] == 0)
                    mtx[k][j] = 1;
                else
                    mtx[k][j] = 0;
            }
        }
    }
}

console.log(calcLit(mtx));