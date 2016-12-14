var fs = require('fs');
 
var input = fs.readFileSync('Day6.in', 'utf8');
var arr = input.split('\n');

function createDistribution(str)
{
    var obj = {
        "a": 0,
        "b": 0,
        "c": 0,
        "d": 0,
        "e": 0,
        "f": 0,
        "g": 0,
        "h": 0,
        "i": 0,
        "j": 0,
        "k": 0,
        "l": 0,   
        "m": 0,
        "n": 0,
        "o": 0,
        "p": 0,
        "q": 0,
        "r": 0,
        "s": 0,
        "t": 0,
        "u": 0,
        "v": 0,
        "w": 0,
        "x": 0,
        "y": 0,
        "z": 0
    };

    for(var i = 0; i < str.length; i++)
    {
        var ch = str[i];
        obj[ch]++;
    }

    return obj;
}

function findMostCommon(obj)
{
    var max = -1;
    var ch = '';
    for(var x in obj)
    {
        if(obj[x] > max)
        {
            max = obj[x];
            ch = x;
        }
    }

    return ch;
}

var cols = ['', '', '', '', '', '', '', ''];
for (i in arr)
{
    var line = arr[i];
    for(var k = 0; k < 8; k++)
    {
        cols[k] += line[k];
    }    
}

var colsDist = [];
for(var x in cols)
{
    var dist = createDistribution(cols[x]);
    colsDist.push(dist);

}

var res = '';
for(var y in colsDist)
{
    var ch = findMostCommon(colsDist[y]);
    res += ch;
}

console.log(res);
