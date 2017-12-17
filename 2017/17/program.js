var input = 359;

var arr = [0];
var currentPos = 0;

for (var i = 0; i < 2017; i++)
{
    for(var j = 0; j < input; j++)
    {
        currentPos++;
        if(currentPos >= arr.length)
            currentPos = 0;
    }
    currentPos++;
    arr.splice(currentPos, 0, i+1);
}
console.log(arr[currentPos+1]);