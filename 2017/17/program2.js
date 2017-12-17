var input = 359;

var arr = [0];
var currentPos = 0;
var pos1 = 0;
var len = 1;
var res = 0;

for (var i = 0; i < 50000000; i++)
{
    for(var j = 0; j < input; j++)
    {
        currentPos++;
        if(currentPos >= len)
            currentPos = 0;
    }
    currentPos++;
    len++;
    if(currentPos == 1)
        res = i+1;
}
console.log(res);