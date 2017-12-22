var fs = require('fs');

var input = fs.readFileSync('Day22.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var ret = [];
    var idx = 0;

    str = str.trim();
    
    while(idx < str.length)
    {
        var ch = str[idx];
        ret.push(ch);
        idx++;
    }

    return ret;
}

function printMtx(m)
{
    for(var i in m)
    {
        var str = m[i].join('');
        console.log(str);
    }
}

function createMtx(dim)
{
    var ret = [];
    for(var i = 0; i < dim; i++)
    {
        var row = [];
        for(var k = 0; k < dim; k++)
            row.push('.');
        ret.push(row);
    }
    return ret;
}

function glueMtx(m1, m2)
{
    var dim1 = m1.length;
    var dim2 = m2.length;
    var diff = dim2 - dim1;
    var start = diff/2;
    var k = 0;
    for(var i = start; i < dim1+start; i++)
    {
        var l = 0;
        for(var j = start; j < dim1+start; j++)
        {
            m2[j][i] = m1[l][k];
            l++;
        }
        k++;
    }
}

function turnRight(dir)
{
    if(dir == 'U')
        return 'R';
    else if(dir == 'R')
        return 'D';
    else if(dir == 'D')
        return 'L';
    else 
        return 'U';
}

function turnLeft(dir)
{
    if(dir == 'U')
        return 'L';
    else if(dir == 'L')
        return 'D';
    else if(dir == 'D')
        return 'R';
    else 
        return 'U';
}

function move(mtx, dir, pX, pY)
{
    var retX = pX;
    var retY = pY;
    var dim = mtx.length;
    if(dir == 'U')
    {
        pY--;
        if(pY < 0)
        {
            console.log("move Up error!");
            process.exit();
        }
        return { "pX":pX, "pY":pY };
    }
    else if(dir == 'D')
    {
        pY++;
        if(pY >= dim)
        {
            console.log("move Down error!");
            process.exit();
        }
        return { "pX":pX, "pY":pY };
    }
    else if(dir == 'L')
    {
        pX--;
        if(pX < 0)
        {
            console.log("move Up error!");
            process.exit();
        }
        return { "pX":pX, "pY":pY };
    }
    else if(dir == 'R')
    {
        pX++;
        if(pX >= dim)
        {
            console.log("move Up error!");
            process.exit();
        }
        return { "pX":pX, "pY":pY };
    }
    
    console.log("move error!");
    process.exit();
    return -1;
}

function burst(mtx, dir, pX, pY, infections)
{
    var currentVal = mtx[pY][pX];

    if(currentVal == '#')
    {
        dir = turnRight(dir);
        mtx[pY][pX] = 'F';
        var obj = move(mtx, dir, pX, pY);
        pX = obj.pX;
        pY = obj.pY;
    }
    else if(currentVal == 'F')
    {
        dir = turnRight(dir);
        dir = turnRight(dir);
        mtx[pY][pX] = '.';
        var obj = move(mtx, dir, pX, pY);
        pX = obj.pX;
        pY = obj.pY;
    }
    else if(currentVal == 'W')
    {
        infections++;
        mtx[pY][pX] = '#';
        var obj = move(mtx, dir, pX, pY);
        pX = obj.pX;
        pY = obj.pY;
    }
    else
    {
        dir = turnLeft(dir);
        mtx[pY][pX] = 'W';
        var obj = move(mtx, dir, pX, pY);
        pX = obj.pX;
        pY = obj.pY;
    }
    var ret = { "dir": dir, "pX": pX, "pY": pY, "infections": infections };
    return ret;
}

var mI = [];
for (var i in arr)
{
   var line = arr[i];
   var row = parse(line);
   mI.push(row);
}

var mtx = createMtx(999);
glueMtx(mI, mtx);

var cX = Math.floor(mtx.length / 2);
var cY = Math.floor(mtx.length / 2);
var currentDir = 'U';
var pX = cX;
var pY = cY;

var bO;
var infections = 0;

for(var i = 0; i < 10000000; i++)
{
    bO = burst(mtx, currentDir, pX, pY, infections);
    currentDir = bO.dir;
    pX = bO.pX;
    pY = bO.pY;
    infections = bO.infections;
}

console.log(infections);