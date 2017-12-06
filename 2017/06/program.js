var fs = require('fs');

var input = fs.readFileSync('Day6.in', 'utf8');
var arr = input.split('\n');

function getMax(ar)
{
    var sa = ar.slice(0);
    sa.sort(function(a, b){return a-b});
    return sa[sa.length-1];
}

function getRotation(ar)
{
    var ret = ar.slice(0);
    var mxIdx = 0;
    var mx = getMax(ar);
    for(var i = 0; i < ar.length; i++)
    {
        if(ar[i] == mx)
        {
            mxIdx = i;
            ret[mxIdx] = 0;
            break;
        }
    }
    
    var rIdx = mxIdx + 1;
    while(mx > 0)
    {
        if(rIdx >= ar.length)
            rIdx = 0;
        ret[rIdx] += 1;
        rIdx++;
        mx--;
    }
    return ret;
}

function inRotation(ar, coll)
{
    for(var j = 0; j < coll.length; j++)
    {
        var test = coll[j];
        var bFound = true;
        for(var i = 0; i < ar.length; i++)
        {
            if(test[i] != ar[i])
                bFound = false;
        }
        if(bFound) 
            return true;
    }
    return false;
}

var sum = 0;
var line = arr[0];
var arrN = line.split('\t').map(function(item) {
    return Number(item);
});

var rotations = [];
rotations.push(arrN);
var rot = getRotation(arrN);
rotations.push(rot);
for(;;)
{
    rot = getRotation(rot);

    if(inRotation(rot, rotations))
        break;
    else
        rotations.push(rot);
}

console.log(rotations.length);