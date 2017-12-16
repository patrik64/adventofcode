var fs = require('fs');

var input = fs.readFileSync('Day16.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var op = '';
    var x = '';
    var y = '';
    var ret = [];

    while(idx < str.length)
    {
        op = str[idx];

        idx++;
        if(op == 's')
        {
            while(idx < str.length && str[idx] != ',')
            {
                x += str[idx];
                idx++;
            }
            idx++;
        }
        else
        {
            while(idx < str.length && str[idx] != '/')
            {
                x += str[idx];
                idx++;
            }
            idx++;
            while(idx < str.length && str[idx] != ',')
            {
                y += str[idx];
                idx++;
            }
            idx++;
        }
        x = x.trim();
        y = y.trim();
        var obj = { "op" : op,  "x" : x, "y" : y };

        x = '';
        y = '';
        ret.push(obj);
    }

    return ret;
}

var line = arr[0];
var dancing = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

var mvs = parse(line);

function spin(arr, x)
{
    for(var k = 0; k < x; k++)
    {
        var temp = [];
        temp.push(arr[arr.length-1]);
        for(var i = 0; i < arr.length-1; i++)
            temp.push(arr[i]);
        arr = temp;
    }
    return arr;
}

function exchange(arr, x, y)
{
    var temp = arr[y];
    arr[y] = arr[x];
    arr[x] = temp;
    return arr;
}

function partner(arr, x, y)
{
    var xpos = -1;
    var ypos = -1;
    for(var i = 0; i < arr.length; i++)
    {
        if(arr[i] == x)
            xpos = i;
        if(arr[i] == y)
            ypos = i;
    }
    var temp = arr[ypos];
    arr[ypos] = arr[xpos];
    arr[xpos] = temp;
    return arr;
}

for(var i = 0; i < mvs.length; i++)
{
    var obj = mvs[i];
    if(obj.op == 's')
    {
        var sNr = parseInt(obj.x, 10);
        dancing = spin(dancing, sNr);
    }
    else if(obj.op == 'x')
    {
        var x = parseInt(obj.x, 10);
        var y = parseInt(obj.y, 10);
        dancing = exchange(dancing, x, y);    
    }
    else if(obj.op == 'p')
    {
        var x = obj.x;
        var y = obj.y;
        dancing = partner(dancing, x, y);    
    }
}

var res = '';
for(var d in dancing)
    res += dancing[d];

console.log(res);