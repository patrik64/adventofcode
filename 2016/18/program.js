var fs = require('fs');
 
var input = fs.readFileSync('Day18.in', 'utf8');
var arr = input.split('\n');

function createNewTrapLine(line)
{
    var ret = "";
    for(var i = 0; i < line.length; i++)
    {
        var chLeft = '.';
        var chCenter = line[i];
        var chRight = '.';
        if(i > 0)
            chLeft = line[i-1];
        if(i < line.length-1)
            chRight = line[i+1];

        var chNew = '.';

        if( chLeft == '^' && chCenter == '^' && chRight != '^' )
            chNew = '^';
        else if( chLeft != '^' && chCenter == '^' && chRight == '^')
            chNew = '^';
        else if( chLeft == '^' && chCenter != '^' && chRight != '^')
            chNew ='^';
        else if( chLeft != '^' && chCenter != '^' && chRight == '^')
            chNew = '^';

        ret += chNew;
    }
    return ret;
}

function countSafeTiles(arr)
{
    var res = 0;
    for(var i in arr)
    {
        var line = arr[i];
        for(var j in line)
        {
            if(line[j] == '.')
                res++;
        }
    }
    return res;
}

var line = arr[0];
var i = 1;
while(i < 40)
{
    line = createNewTrapLine(line);
    arr.push(line);
    i++;
}

var safeTiles = countSafeTiles(arr);
console.log(safeTiles);
