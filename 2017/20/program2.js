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

for(var k = 0; k < 1000; k++)
{
    var collisionPositions = [];
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
    }

    for(var i = 0; i < particles.length-1; i++)
    {
        for(var j = i+1; j < particles.length; j++)
        {
            var part1 = particles[i];
            var part2 = particles[j];

            if((part1.px == part2.px) && (part1.py == part2.py) && (part1.pz== part2.pz))
            {
                collisionPositions.push({ "px": part1.px, "py": part1.py, "pz": part1.pz });
            }
        }
    }

    if(collisionPositions.length > 0)
    {
        var newParticles = [];
        for(var i = 0; i < particles.length; i++)
        {
            var match = false;
            for(var j = 0; j < collisionPositions.length; j++)
            {
                var cpx = collisionPositions[j].px;
                var cpy = collisionPositions[j].py;
                var cpz = collisionPositions[j].pz;
                
                if(particles[i].px == cpx && particles[i].py == cpy && particles[i].pz == cpz)
                    match = true;
            }
            if(!match)
                newParticles.push(particles[i]);
        }
        particles = newParticles;
    }
}

console.log(particles.length);