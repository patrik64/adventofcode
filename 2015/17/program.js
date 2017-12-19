function arrSum(arr)
{
    var ret = 0;
    for(var i = 0; i < arr.length; i++)
        ret += arr[i];
    return ret;
}

var box = 150;

var conts = [33, 14, 18, 20, 45, 35, 16, 35, 1, 13, 18, 13, 50, 44, 48, 6, 24, 41, 30, 42];
var combi = [];
var temp= [];
var cLen = Math.pow(2, conts.length);

for (var i = 0; i < cLen ; i++)
{
    temp= [];
    for (var j = 0; j < conts.length; j++)
    {
        if ((i & Math.pow(2,j)))
            temp.push(conts[j]);
    }
    if (temp.length > 0) 
        combi.push(temp);
}

var sum = 0;
for(var i = 0; i < combi.length; i++)
    if(arrSum(combi[i]) == box)
        sum++;

console.log(sum);