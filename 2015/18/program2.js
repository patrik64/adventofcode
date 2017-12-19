var fs = require('fs');

var input = fs.readFileSync('Day18.in', 'utf8');
var arr = input.split('\n');

var dim = 100;

function parse(str)
{
    str = str.trim();
    var a = [];
    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        if(ch == '#')
            a.push(1);
        else
            a.push(0);
    }
    return a;
}

function calcCoor(y, x, m)
{
    if((y == 0) && (x == 0))
        return 1;
    if((y == 0) && (x == (dim - 1)))
        return 1;
    if((y == (dim-1)) && (x == 0))
        return 1;
    if((y == (dim -1)) && (x == (dim-1)))
        return 1;

    var ret = 0;
    var state = m[y][x];

    var c1 = 0; //x-1, y-1
    if(((x-1) >= 0) && ((y-1) >= 0))
        c1 = m[y-1][x-1];

    var c2 = 0; //x y-1
    if((y-1) >= 0)
        c2 = m[y-1][x];
    
    var c3 = 0; //x+1 y-1
    if(((x+1) < dim) && (y-1) >= 0)
        c3 = m[y-1][x+1];

    var c4 = 0; //x-1 y
    if((x-1) >= 0)
        c4 = m[y][x-1];

    var c5 = 0; //x+1 y
    if((x+1) < dim)
        c5 = m[y][x+1];

    var c6 = 0; //x-1, y+1
    if(((x-1) >= 0) && ((y+1) < dim))
        c6 = m[y+1][x-1];

    var c7 = 0; //x y+1
    if((y+1) < dim)
        c7 = m[y+1][x];
    
    var c8 = 0; //x+1 y+1
    if(((x+1) < dim) && (y+1) < dim)
        c8 = m[y+1][x+1];

    var sum = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
    if(state == 1)
    {
        if(sum == 2 || sum == 3)
            return 1;
    }
    if(state == 0 && sum == 3)
        return 1;
    return 0;
}

function rotation(m)
{
    var ret = [];
    for(var i = 0; i < dim; i++)
    {
        var row = [];
        for(var j = 0; j < dim; j++ )
        {
            var el = m[i][j];
            var n = calcCoor(i, j, m);
            row.push(n);
        }
        ret.push(row);
    }
    return ret;
}

function calcLights(m)
{
    var ret = 0;
    for(var i = 0; i < dim; i++)
        for(var j = 0; j < dim; j++)
            ret += m[i][j];
    return ret;
}

function fixCorners(m)
{
    m[0][0] = 1;
    m[0][dim-1] = 1;
    m[dim-1][0] = 1;
    m[dim-1][dim-1] = 1;
}

var mtx = [];
for (var i in arr)
{
    var line = arr[i];
    var row = parse(line);
    mtx.push(row);
}

fixCorners(mtx);

for(var i = 0; i < 100; i++)
    mtx = rotation(mtx);
console.log(calcLights(mtx));
