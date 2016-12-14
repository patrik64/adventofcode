var fs = require('fs');
 
var input = fs.readFileSync('Day4.in', 'utf8');
var arr = input.split('\n');

function reverseString(str) 
{
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

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

function checkChecksum(dist, checksum)
{
    for(var s in checksum)
    {
        var ch = checksum[s];
        var val = dist[ch];

        for(var prop in dist)
        {
            if((prop != ch) && (dist[prop] > val))
            {
                return false;
            }
            else if((prop != ch) && (dist[prop] == val))
            {
                if(prop < ch)
                    return false;
            }
        }
        dist[ch] = -1;
    }
    return true;
}

function parse(str)
{
    var inChecksum = false;
    var inNumber = false;
    var strChecksum = '';
    var strId = '';
    var strCode = '';

    for(var i = str.length-1; i >= 0; i--)
    {
        var ch = str[i];
        if(ch == ']' && !inChecksum)
        {
            inChecksum = true;
        }
        else if(inChecksum && ch == '[')
        {
            inChecksum = false;
            inNumber = true;
        }
        else if(inChecksum)
        {
            strChecksum += ch;
        }
        else if(inNumber && ch != '-')
        {
            strId += ch;
        }
        else if(inNumber && ch == '-')
        {
            inNumber = false;
        }
        else if(ch != '-')
        {
            strCode += ch;
        }
    }
    strChecksum = reverseString(strChecksum);
    strId = reverseString(strId);
    strCode = reverseString(strCode);
    var ret = { "checksum" : strChecksum, "id" : strId, "code" : strCode };
    return ret;
}

var sum = 0;
for (i in arr)
{
    var obj = parse(arr[i]);
    var dist = createDistribution(obj["code"]);
    if(checkChecksum(dist, obj["checksum"]))
        sum += Number(obj["id"]);    
}
console.log(sum);