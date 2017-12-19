var fs = require('fs');

var input = fs.readFileSync('Day14.in', 'utf8');
var arr = input.split('\n');

function parse(str)
{
    var idx = 0;
    var x = '';
    var flyd = '';
    var flyt = '';
    var rest = '';

    while(str[idx] != ' ')
    {
        x += str[idx];
        idx++;
    }
    x = x.trim();

    idx += 9;

    while(str[idx] != ' ')
    {
        flyd += str[idx];
        idx++;
    }
    flyd = flyd.trim();
    flyd = parseInt(flyd, 10);

    idx += 10;
    while(str[idx] != ' ')
    {
        flyt += str[idx];
        idx++;
    }
    flyt = flyt.trim();
    flyt = parseInt(flyt, 10);

    idx += 33;
    while(str[idx] != ' ')
    {
        rest += str[idx];
        idx++;
    }
    rest = rest.trim();
    rest = parseInt(rest, 10);
    
    var ret = { 
                "x" : x, 
                "flyd" : flyd, 
                "flyt" : flyt, 
                "rest" : rest, 
                "currentRest" : 0, 
                "currentFly" : 0, 
                "status" : "fly",
                "distance" : 0,
                "points" : 0
            };
    return ret;
}

var dict = {}
var raindeer = [];
for (var i in arr)
{
    var line = arr[i];
    var obj = parse(line);
    raindeer.push(obj);
}

var seconds = 2503;

var currentLead = 0;
var leadIdx = [];
for(var i = 0; i < seconds; i++)
{
    for(var j = 0; j < raindeer.length; j++)
    {
        var r = raindeer[j];

        if(r.status == "fly")
        {
            r.currentFly++;
            r.distance = r.distance + r.flyd;
            if(r.currentFly == r.flyt)
            {
                r.status = "rest";
                r.currentFly = 0;
            }
        }
        else
        {
            r.currentRest++;
            if(r.currentRest == r.rest)
            {
                r.status = "fly";
                r.currentRest = 0;
            }
        }
        if(currentLead < r.distance)
            currentLead = r.distance;
    }
    for(var k = 0; k < raindeer.length; k++)
    {
        if(raindeer[k].distance == currentLead)
            leadIdx.push(k);
    }
    for(var x in leadIdx)
    {
        var idx = leadIdx[x];
        raindeer[idx].points++;
    }
    leadIdx = [];
}

var mxPoints = 0;
for(var x in raindeer)
{
    var p = raindeer[x].points;
    if(mxPoints < p)
        mxPoints = p;
}

console.log(mxPoints);