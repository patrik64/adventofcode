var fs = require('fs');

var input = fs.readFileSync('Day20.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var px = '';
    var py = '';
    var pz = '';
    var vx = '';
    var vy = '';
    var vz = '';
    var ax = '';
    var ay = '';
    var az = '';

    idx=3;
    while(str[idx] != ',')
    {
        px += str[idx];
        idx++;
    }
    px = px.trim();
    px = parseInt(px, 10);
    idx++;

    while(str[idx] != ',')
    {
        py += str[idx];
        idx++;
    }
    py = py.trim();
    py = parseInt(py, 10);
    idx++;

    while(str[idx] != '>')
    {
        pz += str[idx];
        idx++;
    }
    pz = pz.trim();
    pz = parseInt(pz, 10);
    idx+=6;

    while(str[idx] != ',')
    {
        vx += str[idx];
        idx++;
    }
    vx = vx.trim();
    vx = parseInt(vx, 10);
    idx++;

    while(str[idx] != ',')
    {
        vy += str[idx];
        idx++;
    }
    vy = vy.trim();
    vy = parseInt(vy, 10);
    idx++;

    while(str[idx] != '>')
    {
        vz += str[idx];
        idx++;
    }
    vz = vz.trim();
    vz = parseInt(vz, 10);
    idx+=6;

    while(str[idx] != ',')
    {
        ax += str[idx];
        idx++;
    }
    ax = ax.trim();
    ax = parseInt(ax, 10);
    idx++;

    while(str[idx] != ',')
    {
        ay += str[idx];
        idx++;
    }
    ay = ay.trim();
    ay = parseInt(ay, 10);
    idx++;

    while(str[idx] != '>')
    {
        az += str[idx];
        idx++;
    }
    az = az.trim();
    az = parseInt(az, 10);
    
    var ret = { "px" : px, "py" : py, "pz" : pz,
                "vx" : vx, "vy" : vy, "vz" : vz,
                "ax" : ax, "ay" : ay, "az" : az,
                "distance" : 0 };

    return ret;
}

function distance(px, py, pz)
{
    var ret = Math.abs(px) + Math.abs(py) + Math.abs(pz);
    return ret;
}

var particles = [];
for (var i in arr)
{
   var line = arr[i];
   var obj = parse(line);
   particles.push(obj);
}

var mins = {}
for(var k = 0; k < 1000; k++)
{
    mins = {};
    var minDist = 10000000000000;
    for(var i = 0; i < particles.length; i++)
    {
        var part = particles[i];
        var px = part.px;
        var py = part.py;
        var pz = part.pz;
        var vx = part.vx;
        var vy = part.vy;
        var vz = part.vz;
        var ax = part.ax;
        var ay = part.ay;
        var az = part.az;

        part.vx += part.ax;
        part.vy += part.ay;
        part.vz += part.az;

        part.px += part.vx;
        part.py += part.vy;
        part.pz += part.vz;

        part.distance = distance(part.px, part.py, part.pz);

        if(minDist > part.distance)
        {
            minDist = part.distance;
            mins[minDist] = i;
        }
    }
}

var mn = 10000000;
var mi = -1;
for(var key in mins)
{
    var dist = parseInt(key, 10);
    if(mn > dist)
    {
        mn = dist;
        mi = mins[key];
    }
}

console.log(mi);