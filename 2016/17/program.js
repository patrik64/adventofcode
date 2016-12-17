var md5 = require('./md5');
var input = "mmsxrhfx";

function isDoor(ch)
{
    if( ch == 'b' || 
        ch == 'c' || 
        ch == 'd' || 
        ch == 'e' || 
        ch == 'f')
            return true;
    return false;
}

function getDir(d)
{
    var ret = [];
    var h = md5.md5(d);
    h = h.substring(0,4);
    var ch1 = h[0];
    var ch2 = h[1];
    var ch3 = h[2];
    var ch4 = h[3];
    
    if(isDoor(ch1))
        ret.push('U'); 
    if(isDoor(ch2))
        ret.push('D');
    if(isDoor(ch3))
        ret.push('L'); 
    if(isDoor(ch4))
        ret.push('R');
    
    return ret;
}


function move(cur, dirs, xx, yy)
{
    var res = [];

    for(var i in dirs)
    {
        var d = dirs[i];
        var xtest = xx;
        var ytest = yy;

        if(d == 'U') 
            ytest = ytest - 1;
        else if(d == 'D') 
            ytest = ytest + 1;
        else if(d == 'L') 
            xtest = xtest - 1;
        else if(d == 'R') 
            xtest = xtest + 1;

        if(xtest >= 0 && ytest >= 0 && xtest < 4 && ytest < 4)
        {
            var x = xtest;
            var y = ytest;
            var c = cur + d;
            
            if(x == 3 && y == 3)
            {
                console.log(c.substring(input.length));
                process.exit();
            }
            res.push({ "current" : c, "x" : x, "y" : y});   
        }
    }
    return res;
}

var dirs = getDir(input);
var x = 0;
var y = 0;

var res = move(input, dirs, x, y);

while(res.length > 0)
{
    var p = res.shift();
    var x1 = p["x"];
    var y1 = p["y"];
    var ci = p["current"];
    var dd = getDir(ci);
    res = res.concat(move(ci, dd, x1, y1));
}