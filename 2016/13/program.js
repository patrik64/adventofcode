var xx = 40;
var yy = 41;
var resx = 31;
var resy = 39;
var favorite = 1350;

function inPath1(x, y, path)
{
    for(var p in path)
    {
        if(path[p]["x"] == x && path[p]["y"] == y)
            return true;
    }
    return false;
}

function printScreen(scr, path)
{
    for(var r in scr)
    {
        var row = scr[r];
        var line = '';
        for(var c in row)
        {
            if(inPath1(c, r, path))
                line += '0';
            else
                line += row[c];
        }
        console.log(line);
    }
}

function makeScreen(x, y)
{
    var ret = [];

    for(var i = 0; i < y; i++)
    {
        var row = [];
        for(var j = 0; j < x; j++)
        {
            row.push('.');
        }
        ret.push(row);
    }
    return ret;
}

function isEven(n) 
{
   return n % 2 == 0;
}

function dec2bin(dec)
{
    return (dec >>> 0).toString(2);
}

//x*x + 3*x + 2*x*y + y + y*y
function isOpenSpace(x, y, favorite)
{
    var res = x*x + 3*x + 2*x*y + y + y*y;
    res = res + favorite;
    var bin = dec2bin(res);
    var n = 0;
    for(var i in bin)
    {
        if(bin[i] == '1')
            n++;
    }
    if(isEven(n))
        return true;
    return false;
}

function createMaze(scr, favorite)
{
    var ret = [];
    for(var i = 0; i < scr.length; i++)
    {
        var row = scr[i];
        var retRow = [];
        for(var j = 0; j < row.length; j++)
        {
            var os = isOpenSpace(j,i, favorite);
            if(j == 1 && i == 1)
                retRow.push('O');
            else if(j == resx && i == resy)
                retRow.push('O');
            else
            {
                if(!os)
                    retRow.push('#');
                else
                    retRow.push('.'); 
            }
        }
        ret.push(retRow);
    }
    return ret;
}

function inPath(path, obj)
{
    for(var i in path)
        if(obj["x"] == path[i]["x"] && obj["y"] == path[i]["y"])
            return true;
    return false;
}

function cutPath(path)
{
    var obj = path[path.length-1];
    var ret = [];
    for(var i in path)
    {
        ret.push(path[i]);   
        if(obj["x"] == path[i]["x"] && obj["y"] == path[i]["y"])
        {
            return ret;
        }    
    }
    return ret;
}

function inDirection(ch, dir)
{
    for(var d in dir)
    {
        if(ch === dir[d])
            return true;
    }
    return false;
}

function disallowedMoves(path)
{
    var obj = path[path.length-1];
    var dis = obj["dir"];

    var x = obj["x"];
    var y = obj["y"];

    var xplus1 = x + 1;
    var yplus1 = y + 1;
    var xminus1 = x -1;
    var yminus1 = y - 1;
    
    
    if(!inDirection("D", dis))
    {
         if(!(yplus1 < yy && isOpenSpace(x, yplus1, favorite)))
            dis += "D";
    }
    if(!inDirection("L", dis))
    {
        if(!(xminus1 >= 0 && isOpenSpace(xminus1, y, favorite)))
            dis += "L";
    }   
    if(!inDirection("U", dis))
    {
        if(!(yminus1 >= 0 && isOpenSpace(x, yminus1, favorite)))
            dis += "U";
    }
    if(!inDirection("R", dis))
    {
        if(!(xplus1 < xx && isOpenSpace(xplus1, y, favorite)))
            dis += "R";
    }

    path[path.length-1]["dir"] = dis;
    return path;
}

function moveLeft(path)
{
    var obj = path[path.length-1];
    var x = obj["x"];
    var y = obj["y"];
    var dir = obj["dir"];
    dir += "L";
    path[path.length-1]["dir"] = dir;

    path.push({ "x" : x-1, "y" : y, "dir" : 'R'});
    return path;
}

function moveRight(path)
{
    var obj = path[path.length-1];
    var x = obj["x"];
    var y = obj["y"];
    var dir = obj["dir"];
    dir += "R";
    path[path.length-1]["dir"] = dir;

    path.push({ "x" : x+1, "y" : y, "dir" : 'L'});
    return path;
}

function moveUp(path)
{
    var obj = path[path.length-1];
    var x = obj["x"];
    var y = obj["y"];
    var dir = obj["dir"];
    dir += "U";
    path[path.length-1]["dir"] = dir;

    path.push({ "x" : x, "y" : y-1, "dir" : 'D'});
    return path;
}

function moveDown(path)
{
    var obj = path[path.length-1];
    var x = obj["x"];
    var y = obj["y"];
    var dir = obj["dir"];
    dir += "D";
    path[path.length-1]["dir"] = dir;

    path.push({ "x" : x, "y" : y+1, "dir" : 'U'});
    return path;
}

function cleanPath(path)
{
    var ret = [];
    for(var p in path)
    {
        if(path[p]["dir"].length < 4)
            ret.push(path[p]);
    }
    return ret;
}

function traverse(path)
{
    var obj = path[path.length-1];
    var x = obj["x"];
    var y = obj["y"];

    if(x == resx && y == resy)
    {
        for(var p in path)
            console.log(path[p]);
        console.log(path.length-1);
        return;
    }
    
    path = disallowedMoves(path);
    var dir = path[path.length-1]["dir"];
    
    var i = 1000;
    while(i > 0)
    {
        if(!inDirection('D', dir))
        {
            path = moveDown(path);
        }    
        else if(!inDirection('R', dir))
        {
            path = moveRight(path);
        }
        else if(!inDirection('L', dir))
        {
            path = moveLeft(path);
        }
        else if(!inDirection('U', dir))
        {
            path = moveUp(path);
        }
        else
        {
            var k = path.length-1;
            while(k > 0)
            {
                if(path[k]["dir"].length >= 4)
                {
                    path.pop();
                    k--;
                }
                else
                    k = 0;
            }

        }
        
        path = cutPath(path);
        path = disallowedMoves(path);
        dir = path[path.length-1]["dir"];

        var p = path[path.length-1];
        if(p["x"] == resx && p["y"] == resy)
            return path;

        i--;
    }
    return path;
}

var scr = makeScreen(xx, yy);
scr = createMaze(scr, favorite);

var path = [{"x" : 1, "y" : 1, dir : ""}];
path = traverse(path);
printScreen(scr, path);
console.log(path.length-1);


