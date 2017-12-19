var fs = require('fs');

var input = fs.readFileSync('Day2.in', 'utf8');
var arr = input.split('\n');

function req1(str)
{
    for(var i = 0; i < str.length-2; i++)
    {
        var pair1 = str[i] + str[i+1];

        for(var j = i+2; j < str.length; j++)
        {
            var pair2 = str[j] + str[j+1];
            if(pair1 == pair2)
            {
                return true;
            }
        }
    }
    return false;
}

function req2(str)
{
    for(var i = 0; i < str.length-2; i++)
    {
        var ch1 = str[i];
        var ch3 = str[i+2];
        if(ch1 == ch3)
            return true;
    }
    return false;
}

function isNiceString(str)
{
    if(!req1(str))
        return false;
    if(!req2(str))
        return false;
    return true;
}

var sum = 0;

for (var i in arr)
{
    var line = arr[i];
    if(isNiceString(line))
        sum++;
}
console.log(sum);
