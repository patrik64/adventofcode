var fs = require('fs');

var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var y = '';
    var z = '';

    while(str[idx] != 'x')
    {
        x += str[idx];
        idx++;
    }

    idx++;
    while(str[idx] != 'x')
    {
        y += str[idx];
        idx++;
    }
    idx++;

    while(idx < str.length)
    {
        z += str[idx];
        idx++;
    }

    x = x.trim();
    x = parseInt(x, 10);
    y = y.trim();
    y = parseInt(y, 10);
    z = z.trim();
    z = parseInt(z, 10);

    return { "x": x, "y": y, "z": z};
}

function getFullArea(box)
{
    return (2*box.x*box.y + 2*box.y*box.z + 2*box.z*box.x);
}

function getMinArea(box)
{
    var mdim = 'x';
    var min1 = box.x;
    if(box.y < min1)
    {
        min1 =  box.y;
        mdim = 'y';
    }
    if(box.z < min1)
    {
        min1 = box.z;
        mdim = 'z';
    }

    var min2;
    if(mdim == 'x')
        min2 = Math.min(box.y, box.z);
    else if(mdim == 'y')
        min2 = Math.min(box.x, box.z);
    else if(mdim == 'z')
        min2 = Math.min(box.x, box.y);
    
    return min1*min2;
}

var boxes = [];
var sum = 0;

for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   boxes.push(obj);
}

for(var i in boxes)
{
    var box = boxes[i];
    sum += getFullArea(box) + getMinArea(box);
}

console.log(sum);
