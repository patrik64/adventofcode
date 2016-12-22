var fs = require('fs');
 
var input = fs.readFileSync('Day22.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var xpos = str.indexOf('x');
    var ypos = str.indexOf('y');

    var x = str[xpos+1];
    if(str[xpos+2] != '-')
        x += str[xpos+2];

    var y = str[ypos+1];
    if(str[ypos+2] != ' ')
        y += str[ypos+2];

    var pos = ypos+3;
    while(str[pos] == ' ')
        pos++;

    var size = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        size += str[pos];
    }
    size = size.substring(0, size.length-1);
    pos++;

    while(str[pos] == ' ')
        pos++;

    var used = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        used += str[pos];
    }
    used = used.substring(0, used.length-1);
    pos++;

    while(str[pos] == ' ')
        pos++;

    var avail = str[pos];
    while(str[pos] != 'T')
    {
        pos++;
        avail += str[pos];
    }
    avail = avail.substring(0, avail.length-1);

    var ret = { "x" : Number(x), "y" : Number(y), "size" : Number(size), "used" : Number(used), "avail" : Number(avail) };
    return ret;
}

var all = [];
for (var i = 2; i < arr.length; i++)
{
    var obj = parse(arr[i]);
    all.push(obj);    
}

var pairs = [];
for(var i = 0; i < all.length-1; i++)
{
    var o1 = all[i];
    for(var j = i+1; j < all.length; j++)
    {
        var o2 = all[j];
        if(o1.used > 0 && o1.used <= o2.avail)
            pairs.push({"x1" : o1.x, "x2" : o2.x, "y1" : o1.y, "y2" : o2.y });
        if(o2.used > 0 && o2.used <= o1.avail)
            pairs.push({"x1" : o2.x, "x2" : o1.x, "y1" : o2.y, "y2" : o1.y });
    }
}

console.log(pairs.length)