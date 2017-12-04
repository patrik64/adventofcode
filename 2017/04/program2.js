var fs = require('fs');

var input = fs.readFileSync('Day4.in', 'utf8');
var arr = input.split('\n');

function isAnagram(a, b)
{
    var test = "";
    for(var x in a)
    {
        var ch = a[x];
        b = b.replace(ch, "");
    }
    if(b.length > 0)
        return false;
    return true;
}

function isValidPass(arrW)
{
    for(var i = 0; i < arrW.length-1; i++)
    {
        for(var j = 1; j < arrW.length; j++)
        {
            var a = arrW[i];
            var b = arrW[j];
            if(i != j && a.length == b.length && isAnagram(a,b))
                return false;
        }
    }
    return true;
}

var sum = 0;
for(var i = 0; i < arr.length; i++)
{
    var line = arr[i];
    var arrW = line.split(' ').map(function(item) {
        return item;
    });

    if(isValidPass(arrW))
        sum++;
}
console.log(sum);